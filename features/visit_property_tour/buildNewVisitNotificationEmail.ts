import type { PayVisitFeeVisit, PayVisitFeeVisitor } from "@/features/payment/types"
import type { NewVisitNotificationEmailInput } from "@/lib/api/types"

const MONTHS_FR = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
] as const

function formatEmailDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)

  if (!year || !month || !day) {
    return iso
  }

  return `${day} ${MONTHS_FR[month - 1]} ${year}`
}

function formatEmailTime(value: string) {
  const [hours, minutes] = value.split(":")

  if (!hours || !minutes) {
    return value
  }

  return `${hours} h ${minutes}`
}

export function toNewVisitNotificationEmailInput({
  visitor,
  visit,
}: {
  visitor?: PayVisitFeeVisitor | null
  visit: PayVisitFeeVisit
}): NewVisitNotificationEmailInput | null {
  const to = visitor?.email?.trim()

  if (!to) {
    return null
  }

  const userName =
    visitor.firstname?.trim() || visitor.name?.trim().split(/\s+/)[0] || "Client"

  return {
    to,
    userName,
    date: formatEmailDate(visit.dateVisit),
    timeVisit: formatEmailTime(visit.hourVisit),
    subject: "Votre visite ImmoAsk",
  }
}
