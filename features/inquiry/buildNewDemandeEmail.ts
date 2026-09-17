import type { AccountSession } from "@/features/account/types"
import type { PropertyInquiryFormInput } from "@/features/inquiry/types"
import type { NewDemandeEmailInput } from "@/lib/api/types"

function toUserName(session?: AccountSession | null) {
  const name = session?.user?.name?.trim()

  if (name) {
    return name.split(/\s+/)[0] || name
  }

  const email = session?.user?.email?.trim()

  if (email) {
    return email.split("@")[0] || "Client"
  }

  return "Client"
}

function toRequestDescription(inquiry: PropertyInquiryFormInput) {
  const category = inquiry.project_name.trim() || inquiry.category_inquiry.trim()
  const description = inquiry.description.trim()

  if (category && description) {
    return `${category} — ${description}`
  }

  return description || category
}

export function toNewDemandeEmailInput({
  inquiry,
  session,
}: {
  inquiry: PropertyInquiryFormInput
  session?: AccountSession | null
}): NewDemandeEmailInput | null {
  const to = session?.user?.email?.trim()

  if (!to) {
    return null
  }

  const requestDescription = toRequestDescription(inquiry)

  if (!requestDescription) {
    return null
  }

  return {
    to,
    userName: toUserName(session),
    requestDescription,
    subject: "Votre demande immobilière ImmoAsk",
  }
}
