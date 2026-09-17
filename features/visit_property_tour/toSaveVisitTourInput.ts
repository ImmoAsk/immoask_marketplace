import type { AccountSession } from "@/features/account/types"
import type { PayVisitFeeVisitor } from "@/features/payment/types"
import type {
  VisitPropertyTourProperty,
  VisitPropertyTourValues,
} from "@/features/visit_property_tour/types"
import type { SaveVisitTourInput } from "@/lib/api/types"

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

export function toSaveVisitTourInput({
  visit,
  visitor,
  property,
  session,
}: {
  visit: VisitPropertyTourValues
  visitor?: PayVisitFeeVisitor | null
  property: VisitPropertyTourProperty
  session?: AccountSession | null
}): SaveVisitTourInput | null {
  const date_visite = visit.dateVisit.trim()
  const heure_visite = visit.hourVisit.trim()
  const propriete_id = toOptionalId(visit.propertyId)
  const proprietaire_id = toOptionalId(property.proprietaireId)

  if (
    !date_visite ||
    !heure_visite ||
    propriete_id == null ||
    proprietaire_id == null
  ) {
    return null
  }

  const user_id = toOptionalId(session?.user.id)
  const email_visitor = toOptionalText(visitor?.email)
  const telephone_visitor = toOptionalText(visitor?.phone)
  const fullname_visitor = toOptionalText(visitor?.name)

  return {
    date_visite,
    heure_visite,
    propriete_id,
    proprietaire_id,
    ...(user_id != null ? { user_id } : {}),
    ...(email_visitor ? { email_visitor } : {}),
    ...(telephone_visitor ? { telephone_visitor } : {}),
    ...(fullname_visitor ? { fullname_visitor } : {}),
  }
}
