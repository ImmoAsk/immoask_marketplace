import type {
  Property,
  PropertyDetailBookFurnishedPropertyProps,
} from "@/features/properties/types"
import { toBookFurnishedProperty } from "@/features/book_property/queries/toBookFurnishedProperty"

export function buildPropertyDetailBookFurnishedProperty({
  property,
  propertyHref,
}: {
  property: Property
  propertyHref: string
}): PropertyDetailBookFurnishedPropertyProps | null {
  if (!property.isFurnished) {
    return null
  }

  const occupied = property.status === 2 || property.isAvailable === false
  const bookProperty = toBookFurnishedProperty(property)

  return {
    property: bookProperty,
    propertyHref,
    userRole: bookProperty.roleName ?? null,
    title: "Réserver un séjour meublé",
    note: "Le propriétaire ou l'agent confirmera la disponibilité du bien avant tout règlement des frais de service.",
    submitLabel: "Réserver le séjour",
    disabled: occupied,
  }
}
