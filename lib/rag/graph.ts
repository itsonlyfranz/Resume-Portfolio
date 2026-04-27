import { HumanMessage, SystemMessage, type BaseMessage } from "@langchain/core/messages"
import { ChatGroq } from "@langchain/groq"
import { Annotation, END, START, StateGraph } from "@langchain/langgraph"

import { retrieveRelevantChunks } from "./chunking"
import type { RagGraphState, ScoredContentChunk } from "./types"

const RERANK_LIMIT = 5

const RagAnnotation = Annotation.Root({
  question: Annotation<string>(),
  history: Annotation<string>(),
  candidates: Annotation<ScoredContentChunk[]>(),
  contexts: Annotation<ScoredContentChunk[]>(),
  answerMessages: Annotation<BaseMessage[]>(),
})

function getGroqChatModel({ streaming = false }: { streaming?: boolean } = {}) {
  const apiKey = process.env.GROQ_API_KEY
  const model = process.env.GROQ_CHAT_MODEL

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is required for RAG chat.")
  }

  if (!model) {
    throw new Error("GROQ_CHAT_MODEL is required for RAG chat.")
  }

  return new ChatGroq({
    apiKey,
    model,
    streaming,
    temperature: 0,
  })
}

function messageContentToText(content: unknown): string {
  if (typeof content === "string") return content

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part
        if (part && typeof part === "object" && "text" in part && typeof part.text === "string") {
          return part.text
        }

        return ""
      })
      .join("")
  }

  return ""
}

function formatChunk(chunk: ScoredContentChunk, index: number): string {
  return [
    `[${index + 1}] ${chunk.source.title}`,
    `Type: ${chunk.source.type}`,
    `Path: ${chunk.source.path}`,
    `Similarity: ${chunk.score.toFixed(4)}`,
    chunk.text,
  ].join("\n")
}

function parseRerankedIds(value: string, candidates: ScoredContentChunk[]): string[] {
  const fallbackIds = candidates.slice(0, RERANK_LIMIT).map((candidate) => candidate.id)

  try {
    const parsed = JSON.parse(value) as unknown
    const ids = Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : []

    return ids.length > 0 ? ids : fallbackIds
  } catch {
    return fallbackIds
  }
}

async function retrieveNode(state: typeof RagAnnotation.State) {
  return {
    candidates: await retrieveRelevantChunks(state.question),
  }
}

async function rerankNode(state: typeof RagAnnotation.State) {
  if (state.candidates.length === 0) {
    return { contexts: [] }
  }

  const model = getGroqChatModel()
  const response = await model.invoke([
    new SystemMessage(
      [
        "You rerank retrieved portfolio documentation chunks for a RAG answer.",
        "Return only a JSON array of chunk IDs, ordered from most useful to least useful.",
        `Return at most ${RERANK_LIMIT} IDs.`,
        "Do not include markdown, explanations, or IDs that are not in the candidates.",
      ].join("\n")
    ),
    new HumanMessage(
      [
        `Question: ${state.question}`,
        state.history ? `Conversation history:\n${state.history}` : "",
        "Candidates:",
        ...state.candidates.map((candidate) =>
          [
            `ID: ${candidate.id}`,
            `Source: ${candidate.source.title} (${candidate.source.type})`,
            `Text: ${candidate.text}`,
          ].join("\n")
        ),
      ]
        .filter(Boolean)
        .join("\n\n")
    ),
  ])

  const ids = parseRerankedIds(messageContentToText(response.content), state.candidates)
  const candidateById = new Map(state.candidates.map((candidate) => [candidate.id, candidate]))
  const contexts = ids
    .map((id) => candidateById.get(id))
    .filter((candidate): candidate is ScoredContentChunk => Boolean(candidate))
    .slice(0, RERANK_LIMIT)

  return {
    contexts: contexts.length > 0 ? contexts : state.candidates.slice(0, RERANK_LIMIT),
  }
}

function answerNode(state: typeof RagAnnotation.State) {
  const contextText = state.contexts.map(formatChunk).join("\n\n---\n\n")
  const systemPrompt = [
    "You are Roberto Francisco Pablo's portfolio assistant.",
    "Answer only using the provided portfolio documentation context.",
    "Do not use outside knowledge, assumptions, or unstated details.",
    "If the context does not contain enough information to answer, say: \"I don't have that information in the site content.\"",
    "Keep answers concise, professional, and helpful.",
    "When relevant, mention which project, experience, education, or certification the answer comes from.",
    "",
    "Portfolio documentation context:",
    contextText || "No relevant context was retrieved.",
  ].join("\n")

  const userPrompt = [
    state.history ? `Conversation history:\n${state.history}` : "",
    `Current question: ${state.question}`,
  ]
    .filter(Boolean)
    .join("\n\n")

  return {
    answerMessages: [new SystemMessage(systemPrompt), new HumanMessage(userPrompt)],
  }
}

const ragGraph = new StateGraph(RagAnnotation)
  .addNode("retrieve", retrieveNode)
  .addNode("rerank", rerankNode)
  .addNode("answer", answerNode)
  .addEdge(START, "retrieve")
  .addEdge("retrieve", "rerank")
  .addEdge("rerank", "answer")
  .addEdge("answer", END)
  .compile()

export async function buildGroundedAnswerMessages({
  question,
  history,
}: Pick<RagGraphState, "question" | "history">): Promise<BaseMessage[]> {
  const result = await ragGraph.invoke({
    question,
    history,
    candidates: [],
    contexts: [],
    answerMessages: [],
  })

  return result.answerMessages
}

export async function* streamGroundedAnswer({
  question,
  history,
}: Pick<RagGraphState, "question" | "history">): AsyncGenerator<string> {
  const answerMessages = await buildGroundedAnswerMessages({ question, history })
  const model = getGroqChatModel({ streaming: true })
  const stream = await model.stream(answerMessages)

  for await (const chunk of stream) {
    const text = messageContentToText(chunk.content)
    if (text) {
      yield text
    }
  }
}
