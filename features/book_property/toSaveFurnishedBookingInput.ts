import type { AccountSession } from "@/features/account/types"
import type {
  BookFurnishedPropertyProperty,
  BookFurnishedPropertyValues,
} from "@/features/book_property/types"
import type { PayFurnishedPropertyGuest } from "@/features/payment/types"
import type { SaveFurnishedBookingInput } from "@/lib/api/types"

function toOptionalId(value: string | number | null | undefined) {
  if (value == null || value === "") {
    return undefined
  }

  const id = typeof value === "number" ? value : Number(value)

  return Number.isFinite(id) ? id : undefined
}

function toOptionalText(value: string | null | undefined) {
  const trimmed = value?.trim()

  return trimmed ? trimmed : undefined
}

export function toSaveFurnishedBookingInput({
  booking,
  guest,
  property,
  session,
}: {
  booking: BookFurnishedPropertyValues
  guest?: PayFurnishedPropertyGuest | null
  property: BookFurnishedPropertyProperty
  session?: AccountSession | null
}): SaveFurnishedBookingInput | null {
  const date_arrive = booking.checkIn.trim()
  const date_depart = booking.checkOut.trim()
  const propriete_id = toOptionalId(booking.propertyId)
  const proprietaire_id = toOptionalId(property.proprietaireId)

  if (
    !date_arrive ||
    !date_depart ||
    propriete_id == null ||
    proprietaire_id == null
  ) {
    return null
  }

  const user_id = toOptionalId(session?.user.id)
  const email_reservateur = toOptionalText(guest?.email)
  const phone_reservateur = toOptionalText(guest?.phone)
  const fullname_reservateur = toOptionalText(guest?.name)
  const pickup_place = toOptionalText(booking.pickUpPlace)

  return {
    date_arrive,
    date_depart,
    propriete_id,
    proprietaire_id,
    adulte: booking.travelersNumber,
    ...(user_id != null ? { user_id } : {}),
    ...(pickup_place ? { pickup_place } : {}),
    ...(email_reservateur ? { email_reservateur } : {}),
    ...(phone_reservateur ? { phone_reservateur } : {}),
    ...(fullname_reservateur ? { fullname_reservateur } : {}),
  }
}
