import type { VisitPropertyTourProperty } from "@/features/visit_property_tour/types"
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

function emailString(value: unknown, fallback = "") {
  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed || fallback
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value)
  }

  return fallback
}

function propertyEmailName(property: VisitPropertyTourProperty) {
  const title = emailString(property.title)

  if (title) {
    return title
  }

  const nuo = property.nuo ? `N°${property.nuo}` : ""
  const type = emailString(property.propertyType)
  const area = property.area != null ? `${property.area}m²` : ""

  return [nuo, type, area].filter(Boolean).join(" ") || "Bien immobilier"
}

export function toNewVisitNotificationEmailInput({
  visitor,
  visit,
  property,
}: {
  visitor?: PayVisitFeeVisitor | null
  visit: PayVisitFeeVisit
  property: VisitPropertyTourProperty
}): NewVisitNotificationEmailInput | null {
  const to = visitor?.email?.trim()

  if (!visitor || !to) {
    return null
  }

  const userName =
    visitor.firstname?.trim() || visitor.name?.trim().split(/\s+/)[0] || "Client"
  const propertyName = propertyEmailName(property)

  return {
    to,
    userName,
    date: formatEmailDate(visit.dateVisit),
    timeVisit: formatEmailTime(visit.hourVisit),
    subject: `Votre visite ImmoAsk — ${propertyName}`,
  }
}
