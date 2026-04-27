import { loadContentChunks } from "./content-docs"
import { embedText, embedTexts } from "./openrouter-embeddings"
import type { EmbeddedContentChunk, ScoredContentChunk } from "./types"

const RETRIEVAL_LIMIT = 10

let indexPromise: Promise<EmbeddedContentChunk[]> | undefined

function cosineSimilarity(a: number[], b: number[]): number {
  return a.reduce((sum, value, index) => sum + value * (b[index] ?? 0), 0)
}

async function buildRuntimeIndex(): Promise<EmbeddedContentChunk[]> {
  const chunks = loadContentChunks()
  const embeddings = await embedTexts(chunks.map((chunk) => chunk.text))

  return chunks.map((chunk, index) => ({
    ...chunk,
    embedding: embeddings[index],
  }))
}

export async function getRuntimeIndex(): Promise<EmbeddedContentChunk[]> {
  indexPromise ??= buildRuntimeIndex()
  return indexPromise
}

export async function retrieveRelevantChunks(question: string): Promise<ScoredContentChunk[]> {
  const [index, queryEmbedding] = await Promise.all([getRuntimeIndex(), embedText(question)])

  return index
    .map(({ embedding, ...chunk }) => ({
      ...chunk,
      score: cosineSimilarity(queryEmbedding, embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, RETRIEVAL_LIMIT)
}
