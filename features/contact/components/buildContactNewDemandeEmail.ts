import type { ContactFormInput, ContactObjectOption } from "@/features/contact/types"
import { sendNewDemandeEmail } from "@/lib/api/emails"
import type { NewDemandeEmailInput } from "@/lib/api/types"

import { DEFAULT_CONTACT_OBJECT_OPTIONS } from "./buildContactForm"

export const IMMOASK_CONTACT_EMAIL = "immoaskimmobilier@gmail.com"

function contactObjectLabel(
  contactObject: ContactFormInput["contact_object"],
  objectOptions: ContactObjectOption[] = DEFAULT_CONTACT_OBJECT_OPTIONS,
) {
  return (
    objectOptions.find((option) => option.id === contactObject)?.label ??
    contactObject
  )
}

function toUserName(email: string) {
  const local = email.trim().split("@")[0]

  return local || "Client"
}

function toUserRequestDescription(
  input: ContactFormInput,
  objectOptions?: ContactObjectOption[],
) {
  const objectLabel = contactObjectLabel(input.contact_object, objectOptions)
  const description = input.contact_description.trim()

  return `${objectLabel} — ${description}`
}

function toImmoAskRequestDescription(
  input: ContactFormInput,
  objectOptions?: ContactObjectOption[],
) {
  const objectLabel = contactObjectLabel(input.contact_object, objectOptions)
  const phone = input.user_phoneNumber?.trim()
  const lines = [
    `Nouveau message de contact`,
    `Email: ${input.user_email}`,
    ...(phone ? [`Téléphone: ${phone}`] : []),
    `Objet: ${objectLabel}`,
    `Description: ${input.contact_description.trim()}`,
  ]

  return lines.join(" | ")
}

export function toContactUserDemandeEmailInput(
  input: ContactFormInput,
  objectOptions?: ContactObjectOption[],
): NewDemandeEmailInput {
  return {
    to: input.user_email,
    userName: toUserName(input.user_email),
    requestDescription: toUserRequestDescription(input, objectOptions),
    subject: "Votre demande ImmoAsk",
  }
}

export function toContactImmoAskDemandeEmailInput(
  input: ContactFormInput,
  objectOptions?: ContactObjectOption[],
): NewDemandeEmailInput {
  return {
    to: IMMOASK_CONTACT_EMAIL,
    userName: "ImmoAsk",
    requestDescription: toImmoAskRequestDescription(input, objectOptions),
    subject: `Nouveau contact ImmoAsk — ${contactObjectLabel(input.contact_object, objectOptions)}`,
  }
}

export async function sendContactDemandeEmails(
  input: ContactFormInput,
  objectOptions?: ContactObjectOption[],
) {
  const userEmail = toContactUserDemandeEmailInput(input, objectOptions)
  const immoAskEmail = toContactImmoAskDemandeEmailInput(input, objectOptions)

  const results = await Promise.allSettled([
    sendNewDemandeEmail(userEmail),
    sendNewDemandeEmail(immoAskEmail),
  ])

  const failures = results.filter((result) => result.status === "rejected")

  if (failures.length === results.length) {
    const first = failures[0]
    throw first.status === "rejected"
      ? first.reason instanceof Error
        ? first.reason
        : new Error("L'envoi des emails a échoué.")
      : new Error("L'envoi des emails a échoué.")
  }

  return {
    user: results[0],
    immoAsk: results[1],
  }
}
