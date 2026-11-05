"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactForm = z.infer<typeof contactSchema>

export function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your message! I'll get back to you soon.",
        })
        reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again or contact me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const label = "mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-gray-500"
  const field =
    "w-full rounded-lg border border-gray-300 bg-paper px-3.5 py-2.5 text-[14px] text-ink outline-none transition placeholder:text-gray-400 focus:border-ink aria-[invalid=true]:border-red-500"
  const error = "mt-1.5 block text-[12px] text-red-600 dark:text-red-400"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2" noValidate>
      <div>
        <label htmlFor="contact-name" className={label}>
          Name <span className="text-red-600 dark:text-red-400">*</span>
        </label>
        <input id="contact-name" autoComplete="name" className={field} placeholder="Your name" aria-invalid={!!errors.name} {...register("name")} />
        {errors.name && <small className={error}>{errors.name.message}</small>}
      </div>
      <div>
        <label htmlFor="contact-email" className={label}>
          Email <span className="text-red-600 dark:text-red-400">*</span>
        </label>
        <input id="contact-email" type="email" autoComplete="email" className={field} placeholder="you@example.com" aria-invalid={!!errors.email} {...register("email")} />
        {errors.email && <small className={error}>{errors.email.message}</small>}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-subject" className={label}>
          Subject
        </label>
        <input id="contact-subject" autoComplete="off" className={field} placeholder="What can I help with?" {...register("subject")} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className={label}>
          Message <span className="text-red-600 dark:text-red-400">*</span>
        </label>
        <textarea
          id="contact-message"
          autoComplete="off"
          rows={5}
          className={`${field} resize-y py-3 leading-relaxed`}
          placeholder="Project details, goals, timeline..."
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && <small className={error}>{errors.message.message}</small>}
      </div>
      {submitStatus.type && (
        <p
          role="status"
          className={`sm:col-span-2 rounded-lg border px-3.5 py-2.5 text-[13px] ${
            submitStatus.type === "success"
              ? "border-gray-300 text-ink"
              : "border-red-500/40 text-red-600 dark:text-red-400"
          }`}
        >
          {submitStatus.message}
        </p>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 font-mono text-[12px] uppercase tracking-wider text-paper hover:opacity-80 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send message →"}
        </button>
      </div>
    </form>
  )
}
