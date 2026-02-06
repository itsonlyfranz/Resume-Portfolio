import { defineDocumentType, makeSource } from "contentlayer2/source-files"

export const Experience = defineDocumentType(() => ({
  name: "Experience",
  filePathPattern: `experience/**/*.mdx`,
  contentType: "mdx",
  fields: {
    company: {
      type: "string",
      required: true,
    },
    position: {
      type: "string",
      required: true,
    },
    startDate: {
      type: "string",
      required: true,
    },
    endDate: {
      type: "string",
      required: false,
    },
    description: {
      type: "string",
      required: true,
    },
    technologies: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    order: {
      type: "number",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").pop(),
    },
  },
}))

export const Education = defineDocumentType(() => ({
  name: "Education",
  filePathPattern: `education/**/*.mdx`,
  contentType: "mdx",
  fields: {
    degree: {
      type: "string",
      required: true,
    },
    institution: {
      type: "string",
      required: true,
    },
    startDate: {
      type: "string",
      required: true,
    },
    endDate: {
      type: "string",
      required: false,
    },
    description: {
      type: "string",
      required: true,
    },
    order: {
      type: "number",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").pop(),
    },
  },
}))

export const Certification = defineDocumentType(() => ({
  name: "Certification",
  filePathPattern: `certifications/**/*.mdx`,
  contentType: "mdx",
  fields: {
    name: {
      type: "string",
      required: true,
    },
    issuer: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      required: true,
    },
    credentialId: {
      type: "string",
      required: false,
    },
    link: {
      type: "string",
      required: false,
    },
    order: {
      type: "number",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").pop(),
    },
  },
}))

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    featured: {
      type: "boolean",
      required: false,
      default: false,
    },
    image: {
      type: "string",
      required: false,
    },
    technologies: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    liveUrl: {
      type: "string",
      required: false,
    },
    githubUrl: {
      type: "string",
      required: false,
    },
    highlights: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
    date: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      required: false,
    },
    order: {
      type: "number",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").pop(),
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Experience, Education, Certification, Project],
})
