import type { BaseMessage } from "@langchain/core/messages"

export type ContentSourceType = "Project" | "Experience" | "Education" | "Certification"

export interface ContentSource {
  id: string
  type: ContentSourceType
  title: string
  path: string
  slug: string
}

export interface ContentChunk {
  id: string
  source: ContentSource
  text: string
}

export interface EmbeddedContentChunk extends ContentChunk {
  embedding: number[]
}

export interface ScoredContentChunk extends ContentChunk {
  score: number
}

export interface RagGraphState {
  question: string
  history: string
  candidates: ScoredContentChunk[]
  contexts: ScoredContentChunk[]
  answerMessages: BaseMessage[]
}
