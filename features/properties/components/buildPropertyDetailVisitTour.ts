import type { Property, PropertyDetailVisitTourProps } from "@/features/properties/types"
import { toVisitPropertyTourProperty } from "@/features/visit_property_tour/queries/toVisitPropertyTourProperty"

export function buildPropertyDetailVisitTour({
  property,
  propertyHref,
}: {
  property: Property
  propertyHref: string
}): PropertyDetailVisitTourProps {
  const occupied = property.status === 2 || property.isAvailable === false

  return {
    property: toVisitPropertyTourProperty(property),
    propertyHref,
    title: "Planifier une visite physique accompagnée",
    note: "L'agent immobilier confirmera la disponibilité du bien avec vous avant tout règlement du droit de visite.",
    submitLabel: "Planifier une visite",
    disabled: occupied,
  }
}
