import { allDocuments } from "contentlayer/generated"

import type { ContentChunk, ContentSource, ContentSourceType } from "./types"

type ContentlayerDocument = (typeof allDocuments)[number]

const DOCUMENT_TYPE_LABELS: Record<ContentSourceType, string> = {
  Project: "Project",
  Experience: "Experience",
  Education: "Education",
  Certification: "Certification",
}

function getDocumentTitle(doc: ContentlayerDocument): string {
  switch (doc.type) {
    case "Project":
      return doc.title
    case "Experience":
      return `${doc.position} at ${doc.company}`
    case "Education":
      return `${doc.degree} at ${doc.institution}`
    case "Certification":
      return `${doc.name} by ${doc.issuer}`
  }
}

function getDocumentSummary(doc: ContentlayerDocument): string[] {
  switch (doc.type) {
    case "Project":
      return [
        `Title: ${doc.title}`,
        `Type: ${DOCUMENT_TYPE_LABELS[doc.type]}`,
        `Description: ${doc.description}`,
        `Date: ${doc.date}`,
        doc.category ? `Category: ${doc.category}` : "",
        doc.technologies.length > 0 ? `Technologies: ${doc.technologies.join(", ")}` : "",
        doc.highlights?.length ? `Highlights: ${doc.highlights.join(" ")}` : "",
        doc.githubUrl ? `GitHub: ${doc.githubUrl}` : "",
        doc.liveUrl ? `Live URL: ${doc.liveUrl}` : "",
      ]
    case "Experience":
      return [
        `Title: ${doc.position}`,
        `Type: ${DOCUMENT_TYPE_LABELS[doc.type]}`,
        `Company: ${doc.company}`,
        `Dates: ${doc.startDate} - ${doc.endDate ?? "Present"}`,
        `Description: ${doc.description}`,
        doc.technologies.length > 0 ? `Technologies: ${doc.technologies.join(", ")}` : "",
      ]
    case "Education":
      return [
        `Title: ${doc.degree}`,
        `Type: ${DOCUMENT_TYPE_LABELS[doc.type]}`,
        `Institution: ${doc.institution}`,
        `Dates: ${doc.startDate} - ${doc.endDate ?? "Present"}`,
        `Description: ${doc.description}`,
      ]
    case "Certification":
      return [
        `Title: ${doc.name}`,
        `Type: ${DOCUMENT_TYPE_LABELS[doc.type]}`,
        `Issuer: ${doc.issuer}`,
        `Date: ${doc.date}`,
        doc.credentialId ? `Credential ID: ${doc.credentialId}` : "",
        doc.link ? `Link: ${doc.link}` : "",
      ]
  }
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim()
}

function splitIntoSections(markdown: string): string[] {
  const sections = markdown
    .split(/\n(?=#{1,3}\s)/g)
    .map((section) => normalizeWhitespace(section))
    .filter(Boolean)

  return sections.length > 0 ? sections : [normalizeWhitespace(markdown)]
}

function createSource(doc: ContentlayerDocument): ContentSource {
  return {
    id: doc._id,
    type: doc.type,
    title: getDocumentTitle(doc),
    path: `content/${doc._raw.sourceFilePath}`,
    slug: doc.slug,
  }
}

export function loadContentChunks(): ContentChunk[] {
  return allDocuments.flatMap((doc) => {
    const source = createSource(doc)
    const summary = getDocumentSummary(doc).filter(Boolean).join("\n")
    const sections = splitIntoSections(doc.body.raw)
    const chunks = [summary, ...sections].filter(Boolean)

    return chunks.map((text, index) => ({
      id: `${doc._id}#${index}`,
      source,
      text,
    }))
  })
}
