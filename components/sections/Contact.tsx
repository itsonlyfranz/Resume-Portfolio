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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
      <div className="contact-form-row">
        <label>
          <span className="eyebrow">NAME *</span>
          <input placeholder="Your name" aria-invalid={!!errors.name} {...register("name")} />
          {errors.name && <small>{errors.name.message}</small>}
        </label>
        <label>
          <span className="eyebrow">EMAIL *</span>
          <input type="email" placeholder="you@example.com" aria-invalid={!!errors.email} {...register("email")} />
          {errors.email && <small>{errors.email.message}</small>}
        </label>
      </div>
      <label>
        <span className="eyebrow">SUBJECT</span>
        <input placeholder="What can I help with?" {...register("subject")} />
      </label>
      <label>
        <span className="eyebrow">MESSAGE *</span>
        <textarea
          rows={5}
          placeholder="Project details, goals, timeline..."
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && <small>{errors.message.message}</small>}
      </label>
      {submitStatus.type && (
        <p role="status" className={`contact-status is-${submitStatus.type}`}>
          {submitStatus.message}
        </p>
      )}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "SENDING..." : "SEND MESSAGE →"}
      </button>
    </form>
  )
}
