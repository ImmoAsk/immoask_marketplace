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
    note: "Les versements sont remboursés entièrement en cas de mise en indisponibilité par le propriétaire ou l'agent immobilier.",
    submitLabel: "Réserver le séjour",
    disabled: occupied,
  }
}
