import { createUIMessageStream, createUIMessageStreamResponse, type UIMessage } from "ai"

import { streamGroundedAnswer } from "@/lib/rag/graph"

export const maxDuration = 60

function getMessageText(message: UIMessage): string {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("")
    .trim()
}

function getLatestUserQuestion(messages: UIMessage[]): string {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user")
  return latestUserMessage ? getMessageText(latestUserMessage) : ""
}

function formatConversationHistory(messages: UIMessage[]): string {
  return messages
    .slice(0, -1)
    .slice(-6)
    .map((message) => {
      const text = getMessageText(message)
      return text ? `${message.role}: ${text}` : ""
    })
    .filter(Boolean)
    .join("\n")
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()
  const question = getLatestUserQuestion(messages)
  const history = formatConversationHistory(messages)
  const textId = crypto.randomUUID()

  const stream = createUIMessageStream({
    originalMessages: messages,
    execute: async ({ writer }) => {
      writer.write({ type: "text-start", id: textId })

      if (!question) {
        writer.write({
          type: "text-delta",
          id: textId,
          delta: "I don't have that information in the site content.",
        })
      } else {
        for await (const delta of streamGroundedAnswer({ question, history })) {
          writer.write({ type: "text-delta", id: textId, delta })
        }
      }

      writer.write({ type: "text-end", id: textId })
    },
    onError: (error) => {
      console.error("RAG chat error:", error)
      return "The portfolio chat could not answer right now. Please try again later."
    },
  })

  return createUIMessageStreamResponse({ stream })
}
