import type {
  Property,
  PropertyDetailInfrastructureIcon,
  PropertyDetailInfrastructureItem,
  PropertyDetailInfrastructureProps,
} from "@/features/properties/types"

const DEFAULT_INFRASTRUCTURE: PropertyDetailInfrastructureItem[] = [
  {
    icon: "schools",
    title: "Écoles & Lycées",
    description: "5 min (Lycée Français / Arc-en-Ciel)",
  },
  {
    icon: "airport",
    title: "Aéroport de Lomé",
    description: "18 min via contournement",
  },
  {
    icon: "supermarket",
    title: "Supermarchés Champion",
    description: "4 min en voiture",
  },
  {
    icon: "clinic",
    title: "Clinique Internationale",
    description: "6 min d'urgence",
  },
]

function toRad(value: number) {
  return (value * Math.PI) / 180
}

function distanceKm(
  from: { latitude: number; longitude: number },
  to: { latitude: number; longitude: number },
) {
  const dLat = toRad(to.latitude - from.latitude)
  const dLng = toRad(to.longitude - from.longitude)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.latitude)) *
      Math.cos(toRad(to.latitude)) *
      Math.sin(dLng / 2) ** 2

  return 2 * 6371 * Math.asin(Math.sqrt(a))
}

function formatProximity(km: number) {
  if (km < 1) {
    const meters = Math.max(50, Math.round((km * 1000) / 50) * 50)
    return `${meters} m`
  }

  const minutes = Math.max(1, Math.round((km / 25) * 60))
  return `${minutes} min en voiture`
}

function toInfrastructureIcon(
  type?: string | null,
  iconName?: string | null,
  name?: string,
): PropertyDetailInfrastructureIcon {
  const haystack = [type, iconName, name].filter(Boolean).join(" ").toLowerCase()

  if (/[ée]cole|lyc[ée]e|universit|scolaire/.test(haystack)) {
    return "schools"
  }

  if (/a[ée]roport|airport/.test(haystack)) {
    return "airport"
  }

  if (/supermarch[ée]|champion|march[ée]|commerce/.test(haystack)) {
    return "supermarket"
  }

  if (/clinique|h[oô]pital|m[ée]dical|sant[ée]/.test(haystack)) {
    return "clinic"
  }

  return "place"
}

export function buildPropertyDetailInfrastructure(
  property: Property,
): PropertyDetailInfrastructureProps | null {
  const nearby = property.infrastructures ?? []

  if (nearby.length === 0) {
    return {
      items: DEFAULT_INFRASTRUCTURE,
    }
  }

  const origin =
    property.latitude != null && property.longitude != null
      ? { latitude: property.latitude, longitude: property.longitude }
      : null

  const items: PropertyDetailInfrastructureItem[] = nearby.map((entry) => {
    const hasDestination =
      entry.latitude != null && entry.longitude != null && origin != null
    const description =
      hasDestination && origin && entry.latitude != null && entry.longitude != null
        ? formatProximity(
            distanceKm(origin, {
              latitude: entry.latitude,
              longitude: entry.longitude,
            }),
          )
        : "À proximité"

    return {
      icon: toInfrastructureIcon(entry.type, entry.iconName, entry.name),
      title: entry.name,
      description,
    }
  })

  return { items }
}
