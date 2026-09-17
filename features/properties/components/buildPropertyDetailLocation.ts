import type {
  Property,
  PropertyDetailLocationCoordinates,
  PropertyDetailLocationLandmark,
  PropertyDetailLocationProps,
} from "@/features/properties/types"

function uniqueLabelParts(parts: Array<string | undefined>) {
  const seen = new Set<string>()
  const labels: string[] = []

  for (const part of parts) {
    const value = part?.trim()
    if (!value) {
      continue
    }

    const key = value.toLowerCase()
    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    labels.push(value)
  }

  return labels
}

function toCoordinates(property: Property): PropertyDetailLocationCoordinates | undefined {
  if (property.latitude == null || property.longitude == null) {
    return undefined
  }

  return {
    latitude: property.latitude,
    longitude: property.longitude,
  }
}

function toSubtitle(property: Property) {
  const place = uniqueLabelParts([property.districtName, property.cityName]).join(
    " - ",
  )

  if (!place) {
    return "Secteur très calme et hautement sécurisé"
  }

  return `${place}, secteur très calme et hautement sécurisé`
}

function toAccessLabel(property: Property) {
  const haystack = [property.addressLabel, property.description]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  if (/pav[ée]e/.test(haystack)) {
    return "Accès direct voie pavée"
  }

  return "Accès direct voie bitumée"
}

function toLandmark(property: Property): PropertyDetailLocationLandmark {
  const address = property.addressLabel?.trim()
  const place = property.districtName || property.cityName

  return {
    title: "Point repère ImmoAsk",
    description:
      address ||
      (place
        ? `À proximité de ${place} et des axes rapides vers le centre-ville.`
        : "À proximité des axes rapides vers le centre-ville."),
  }
}

export function buildPropertyDetailLocation(
  property: Property,
): PropertyDetailLocationProps | null {
  const coordinates = toCoordinates(property)
  const subtitle = toSubtitle(property)
  const landmark = toLandmark(property)

  if (!coordinates && !property.districtName && !property.cityName && !property.addressLabel) {
    return null
  }

  return {
    title: "Localisation & Environnement du quartier",
    subtitle,
    accessLabel: toAccessLabel(property),
    coordinates,
    zoom: 15,
    landmark,
  }
}
