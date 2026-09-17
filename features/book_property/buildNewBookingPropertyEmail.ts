import type { BookFurnishedPropertyProperty } from "@/features/book_property/types"
import type {
  PayFurnishedPropertyBooking,
  PayFurnishedPropertyGuest,
} from "@/features/payment/types"
import type { NewBookingPropertyEmailInput } from "@/lib/api/types"
import { toAbsoluteUrl } from "@/lib/seo/site"

const DEFAULT_CHECKIN_TIME = "14:00"
const DEFAULT_CHECKOUT_TIME = "12:00"

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

function formatTotalPrice(value: number) {
  const grouped = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")

  return `${grouped} XOF`
}

function confirmationCode(nuo: number, checkIn: string) {
  return `ASK${nuo}-${checkIn.replaceAll("-", "")}`
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

function propertyEmailName(property: BookFurnishedPropertyProperty) {
  const title = emailString(property.title)

  if (title) {
    return title
  }

  const nuo = property.nuo ? `N°${property.nuo}` : ""
  const type = emailString(property.propertyType)
  const area = property.area != null ? `${property.area}m²` : ""

  return [nuo, type, area].filter(Boolean).join(" ") || "Bien immobilier"
}

export function toNewBookingPropertyEmailInput({
  guest,
  booking,
  property,
  propertyHref,
}: {
  guest?: PayFurnishedPropertyGuest | null
  booking: PayFurnishedPropertyBooking
  property: BookFurnishedPropertyProperty
  propertyHref: string
}): NewBookingPropertyEmailInput | null {
  const to = guest?.email?.trim()

  if (!guest || !to) {
    return null
  }

  const firstName =
    emailString(guest.firstname) ||
    emailString(guest.name).split(/\s+/)[0] ||
    "Client"
  const propertyName = propertyEmailName(property)

  return {
    to,
    subject: `Votre réservation ImmoAsk — ${propertyName}`,
    guest_first_name: firstName,
    checkin_date: formatEmailDate(booking.checkIn),
    checkout_date: formatEmailDate(booking.checkOut),
    guest_count: String(booking.travelersNumber),
    property_name: propertyName,
    bathrooms: String(property.bathrooms ?? 0),
    bedrooms: String(property.bedrooms ?? 0),
    total_price: formatTotalPrice(booking.totalAmount),
    max_guests: String(booking.travelersNumber),
    checkin_time: DEFAULT_CHECKIN_TIME,
    checkout_time: DEFAULT_CHECKOUT_TIME,
    property_address:
      emailString(property.location) || propertyName,
    booking_url: toAbsoluteUrl(propertyHref),
    confirmation_code: confirmationCode(property.nuo, booking.checkIn),
    support_url: toAbsoluteUrl("/contact"),
  }
}
