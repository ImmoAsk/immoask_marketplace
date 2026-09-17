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
    note: "Les droits de visite sont remboursés entièrement en cas de changement de disponibilité par le propriétaire ou l'agent immobilier.",
    submitLabel: "Planifier une visite",
    disabled: occupied,
  }
}
