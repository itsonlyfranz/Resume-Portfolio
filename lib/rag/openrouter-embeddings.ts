interface OpenRouterEmbedding {
  embedding: number[]
}

interface OpenRouterEmbeddingResponse {
  data?: OpenRouterEmbedding[]
  error?: {
    message?: string
  }
}

function getOpenRouterConfig() {
  const apiKey = process.env.OPENROUTER_API_KEY
  const model = process.env.OPENROUTER_EMBEDDING_MODEL

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is required for RAG embeddings.")
  }

  if (!model) {
    throw new Error("OPENROUTER_EMBEDDING_MODEL is required for RAG embeddings.")
  }

  return { apiKey, model }
}

export function normalizeVector(vector: number[]): number[] {
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0))
  if (magnitude === 0) return vector

  return vector.map((value) => value / magnitude)
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return []

  const { apiKey, model } = getOpenRouterConfig()
  const response = await fetch("https://openrouter.ai/api/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      "X-Title": "Roberto Portfolio RAG",
    },
    body: JSON.stringify({
      model,
      input: texts,
    }),
  })

  const payload = (await response.json()) as OpenRouterEmbeddingResponse

  if (!response.ok) {
    throw new Error(payload.error?.message ?? "OpenRouter embeddings request failed.")
  }

  const embeddings = payload.data?.map((item) => normalizeVector(item.embedding)) ?? []
  if (embeddings.length !== texts.length) {
    throw new Error("OpenRouter returned an unexpected number of embeddings.")
  }

  return embeddings
}

export async function embedText(text: string): Promise<number[]> {
  const [embedding] = await embedTexts([text])
  return embedding
}
