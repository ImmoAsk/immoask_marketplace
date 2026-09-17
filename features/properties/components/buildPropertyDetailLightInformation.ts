import { getCountry } from "@/lib/routing/countries"
import type {
  Property,
  PropertyDetailLightInformationHighlight,
  PropertyDetailLightInformationProps,
} from "@/features/properties/types"

const DEFAULT_HIGHLIGHTS: PropertyDetailLightInformationHighlight[] = [
  {
    icon: "shield",
    title: "Titre Foncier Vérifié",
    subtitle: "Numéroté & Purge régulière",
  },
  {
    icon: "verified",
    title: "Audit Technique Validé",
    subtitle: "Électricité, plomberie & étanchéité",
  },
  {
    icon: "certified",
    title: "Mandat Exclusif Certifié",
    subtitle: "Enregistré à l'OTR Togo",
  },
]

const TITRE_FONCIER_PAPIERS = new Set([
  "titre foncier",
  "titre foncier personnel",
  "titre foncier global",
])

function isTitreFoncierPapier(value?: string | null) {
  if (!value?.trim()) {
    return false
  }

  return TITRE_FONCIER_PAPIERS.has(normalizeLabelKey(value))
}

function isMeaningfulTitle(title: string) {
  const value = title.trim()
  return value.length > 0 && value !== "-"
}

function normalizeLabelKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

function uniqueLabelParts(parts: Array<string | undefined>) {
  const seen = new Set<string>()
  const labels: string[] = []

  for (const part of parts) {
    const value = part?.trim()
    if (!value) {
      continue
    }

    const key = normalizeLabelKey(value)
    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    labels.push(value)
  }

  return labels
}

function stripLeadingPlaces(
  address: string | undefined,
  places: Array<string | undefined>,
) {
  if (!address) {
    return undefined
  }

  const placeKeys = new Set(
    places
      .map((place) => place?.trim())
      .filter((place): place is string => Boolean(place))
      .map(normalizeLabelKey),
  )

  let remaining = address.trim()

  while (true) {
    const match = remaining.match(/^([^,]+),\s*(.+)$/)
    if (!match) {
      break
    }

    if (!placeKeys.has(normalizeLabelKey(match[1]))) {
      break
    }

    remaining = match[2]
  }

  return remaining
}

const OFFER_PHRASES: Record<string, string> = {
  louer: "à louer",
  location: "à louer",
  vendre: "à vendre",
  vente: "à vendre",
  bail: "en bail",
  investir: "à investir",
}

function toOfferPhrase(offreName?: string) {
  const value = offreName?.trim()
  if (!value) {
    return undefined
  }

  return OFFER_PHRASES[value.toLowerCase()]
}

function toTypeOfferLabel(property: Property) {
  const type = property.propertyType?.trim()
  const phrase = toOfferPhrase(property.offreName)

  if (type && phrase) {
    return `${type} ${phrase}`
  }

  return type || phrase
}

export function buildPropertyHeadline(property: Property) {
  const countryName = getCountry(property.countryCode ?? "")?.name
  const nuoLabel = property.nuo ? `N°${property.nuo}` : undefined

  const labels = uniqueLabelParts([
    nuoLabel,
    toTypeOfferLabel(property),
    property.districtName,
    property.cityName,
    countryName,
  ])

  if (labels.length > 0) {
    return labels.join(", ")
  }

  if (isMeaningfulTitle(property.title)) {
    return property.title
  }

  return "Bien immobilier"
}

export function buildPropertyMapAddress(property: Property) {
  return (
    uniqueLabelParts([
      property.districtName,
      property.cityName,
      stripLeadingPlaces(property.addressLabel, [
        property.districtName,
        property.cityName,
      ]),
    ]).join(", ") || undefined
  )
}

const OFFRE_LABELS: Record<string, string> = {
  louer: "Location",
  location: "Location",
  vendre: "Vente",
  vente: "Vente",
  bail: "Bail",
  investir: "Investissement",
}

function toOffreLabel(offreName?: string) {
  const value = offreName?.trim()
  if (!value) {
    return undefined
  }

  return OFFRE_LABELS[value.toLowerCase()] ?? value
}

function toCategoryLabel(property: Property) {
  const labels = uniqueLabelParts([
    toOffreLabel(property.offreName),
    property.superCategory,
    property.propertyType,
  ])

  return labels.length > 0 ? labels.join(" ").toUpperCase() : undefined
}

function isOccupied(property: Property) {
  return property.status === 2 || property.isAvailable === false
}

function toAvailabilityLabel(property: Property) {
  return isOccupied(property)
    ? "Occupé actuellement"
    : "Disponible immédiatement"
}

export function buildPropertyDetailLightInformation(
  property: Property,
): PropertyDetailLightInformationProps {
  const showTitleDeedHighlights = isTitreFoncierPapier(property.papierPropriete)

  return {
    title: buildPropertyHeadline(property),
    categoryLabel: toCategoryLabel(property),
    reference: property.nuo ? `REF-IMMO-${property.nuo}` : undefined,
    availabilityLabel: toAvailabilityLabel(property),
    availabilityTone: isOccupied(property) ? "occupied" : "available",
    address: buildPropertyMapAddress(property),
    constructionYearLabel:
      property.constructionYear != null
        ? `Construit en ${property.constructionYear}`
        : undefined,
    highlights: showTitleDeedHighlights ? DEFAULT_HIGHLIGHTS : [],
  }
}
