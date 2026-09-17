import type {
  Property,
  PropertyAgent,
  PropertyDetailRealEstateAgencyProps,
} from "@/features/properties/types"

const CITY_LABELS: Record<string, string> = {
  lome: "Lomé",
}

function toListingLabel(property: Property) {
  const offre = property.offreName?.toLowerCase() ?? ""

  if (offre === "vendre" || offre === "vente") {
    return "Mis en vente par un agent immobilier"
  }

  if (offre === "bail") {
    return "Mis en bail par un agent immobilier"
  }

  if (offre === "investir") {
    return "Proposé par un agent immobilier"
  }

  return "Mis en location par un agent immobilier"
}

function toProfessionalTitle(agent: PropertyAgent) {
  if (agent.roleName && /agent/i.test(agent.roleName)) {
    return "Expert Foncier Agréé"
  }

  return agent.organisationName || "Expert Foncier Agréé"
}

function toCityLabel(city?: string) {
  const value = city?.trim()
  if (!value) {
    return undefined
  }

  return CITY_LABELS[value.toLowerCase()] ?? value
}

export function buildPropertyDetailRealEstateAgency(
  property: Property,
): PropertyDetailRealEstateAgencyProps | null {
  const agent = property.agent
  if (!agent?.name) {
    return null
  }

  return {
    label: toListingLabel(property),
    name: agent.name,
    title: toProfessionalTitle(agent),
    location: toCityLabel(property.cityName),
    avatarSrc: agent.avatarUrl,
    verified: true,
    rating: 5,
    reviewCount: 48,
    mandatesCount: 52,
  }
}
