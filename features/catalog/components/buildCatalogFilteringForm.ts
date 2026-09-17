import type { LocationRecord } from "@/lib/api/types"
import { getCountry } from "@/lib/routing/countries"
import { slugify } from "@/lib/utils/createPropertyLink"

import type {
  CatalogFilteringFormOffer,
  CatalogFilteringFormOption,
  CatalogFilteringFormProps,
  CatalogFilteringFormValues,
  Property,
} from "../types"

const OFFER_TABS = [
  { id: "all" as const, label: "Tous les biens" },
  { id: "rent" as const, label: "À Louer" },
  { id: "sale" as const, label: "À Vendre" },
  { id: "furnished" as const, label: "Séjour Meublé" },
]

const AMENITIES = [
  { id: "pool", label: "Piscine" },
  { id: "parking", label: "Garage / Parking" },
  { id: "ac", label: "Climatisé" },
  { id: "title", label: "Titre foncier garanti" },
]

const DEFAULT_PROPERTY_TYPE_OPTIONS: CatalogFilteringFormOption[] = [
  { value: "villa", label: "Villa" },
  { value: "appartement", label: "Appartement" },
  { value: "maison", label: "Maison" },
  { value: "chambre", label: "Chambre" },
  { value: "appartement-meuble", label: "Appartement meublé" },
  { value: "studio", label: "Studio" },
  { value: "terrain", label: "Terrain" },
  { value: "bureau", label: "Bureau" },
]

function formatAmount(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value)
}

function toOffer(transaction: string): CatalogFilteringFormOffer {
  if (transaction === "ventes-immobilieres") {
    return "sale"
  }

  if (transaction === "locations-immobilieres") {
    return "rent"
  }

  return "all"
}

function toTransaction(
  offer: CatalogFilteringFormOffer,
  currentTransaction: string,
) {
  if (offer === "sale") {
    return "ventes-immobilieres"
  }

  if (offer === "rent" || offer === "furnished") {
    return "locations-immobilieres"
  }

  return currentTransaction
}

function uniqueOptions(options: CatalogFilteringFormOption[]) {
  const seen = new Set<string>()
  const unique: CatalogFilteringFormOption[] = []

  for (const option of options) {
    if (!option.value || seen.has(option.value)) {
      continue
    }

    seen.add(option.value)
    unique.push(option)
  }

  return unique
}

export function toCatalogFilteringFormHref(
  country: string,
  currentTransaction: string,
  values: CatalogFilteringFormValues,
) {
  const transaction =
    toTransaction(values.offer, currentTransaction) ||
    "locations-immobilieres"
  const parts = [slugify(country), transaction]

  if (values.propertyType) {
    parts.push(slugify(values.propertyType))

    if (values.location) {
      for (const segment of values.location.split("/")) {
        const slug = slugify(segment)
        if (slug) {
          parts.push(slug)
        }
      }
    }
  }

  return `/${parts.join("/")}`
}

function toCityLocationOption(
  city: LocationRecord,
): CatalogFilteringFormOption | null {
  const value = slugify(city.denomination ?? city.code ?? "")

  if (!value) {
    return null
  }

  return {
    value,
    label: city.denomination?.trim() || value,
  }
}

export function buildCatalogFilteringForm({
  country,
  transaction,
  segments,
  properties,
  cities = [],
  resultCount,
}: {
  country: string
  transaction: string
  segments: string[]
  properties: Property[]
  cities?: LocationRecord[]
  resultCount?: number
}): CatalogFilteringFormProps {
  const [category, city, district] = segments
  const countryName = getCountry(country)?.name

  const propertyTypeOptions: CatalogFilteringFormOption[] = [
    { value: "", label: "Toutes typologies (Villas, Apparts...)" },
    ...uniqueOptions([
      ...properties.map((property) => ({
        value: property.categorySlug,
        label: property.propertyType || property.categorySlug,
      })),
      ...DEFAULT_PROPERTY_TYPE_OPTIONS,
    ]),
  ]

  const locationOptions: CatalogFilteringFormOption[] = [
    {
      value: "",
      label: countryName
        ? `Tout le ${countryName}`
        : "Toutes localisations",
    },
    ...uniqueOptions([
      ...cities.flatMap((record) => {
        const option = toCityLocationOption(record)
        return option ? [option] : []
      }),
      ...properties.flatMap((property) => {
        if (!property.citySlug) {
          return []
        }

        const value = property.districtSlug
          ? `${property.citySlug}/${property.districtSlug}`
          : property.citySlug

        return [
          {
            value,
            label: property.location || value,
          },
        ]
      }),
    ]),
  ]

  const budgetOptions: CatalogFilteringFormOption[] = [
    { value: "", label: "Tous les budgets" },
    { value: "150000", label: `Jusqu'à ${formatAmount(150000)} XOF/mois` },
    { value: "300000", label: `Jusqu'à ${formatAmount(300000)} XOF/mois` },
    { value: "600000", label: `Jusqu'à ${formatAmount(600000)} XOF/mois` },
    { value: "1000000", label: `Jusqu'à ${formatAmount(1000000)} XOF/mois` },
  ]

  const locationValue = [city, district].filter(Boolean).join("/")

  if (
    category &&
    !propertyTypeOptions.some((option) => option.value === category)
  ) {
    propertyTypeOptions.push({ value: category, label: category })
  }

  if (
    locationValue &&
    !locationOptions.some((option) => option.value === locationValue)
  ) {
    locationOptions.push({ value: locationValue, label: locationValue })
  }

  return {
    country,
    transaction,
    offerTabs: OFFER_TABS,
    propertyTypeOptions,
    locationOptions,
    budgetOptions,
    amenities: AMENITIES,
    resultCount,
    trustBadgeLabel: countryName
      ? `100% audités par nos inspecteurs agréés ${countryName}`
      : "100% audités par nos inspecteurs agréés",
    defaultValues: {
      offer: toOffer(transaction),
      propertyType: category ?? "",
      location: locationValue,
    },
  }
}
