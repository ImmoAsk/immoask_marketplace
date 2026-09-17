import type {
  CatalogFilteringInquiryChip,
  CatalogFilteringInquiryProps,
  CatalogFilteringInquirySortOption,
} from "@/features/properties/types"
import { slugify } from "@/lib/utils/createPropertyLink"

const CITY_LABELS: Record<string, string> = {
  lome: "Lomé",
}

const DISTRICT_LABELS: Record<string, string> = {
  agoe: "Agoè",
  agodeke: "Agodeke",
  adidogome: "Adidogomé",
}

const CATEGORY_LABELS: Record<string, string> = {
  villa: "Villa & Duplex",
  appartement: "Appartement",
  "appartement-meuble": "Appartement meublé",
  maison: "Maison",
  "terrain-urbain": "Terrain urbain",
  "terrain-rural": "Terrain rural",
  rooftop: "Rooftop",
}

const RESULT_TITLES: Record<string, string> = {
  "locations-immobilieres": "Résultats : Locations résidentielles",
  "ventes-immobilieres": "Résultats : Ventes résidentielles",
  "baux-immobiliers": "Résultats : Baux immobiliers",
  "investissements-immobiliers": "Résultats : Investissements immobiliers",
}

export const DEFAULT_CATALOG_SORT_OPTIONS: CatalogFilteringInquirySortOption[] =
  [
    { value: "recommended", label: "Recommandés" },
    { value: "price-asc", label: "Prix croissant" },
    { value: "price-desc", label: "Prix décroissant" },
    { value: "newest", label: "Plus récents" },
  ]

const countFormatter = new Intl.NumberFormat("fr-FR")

function humanizeSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function labeledSlug(
  value: string | undefined,
  labels: Record<string, string>,
) {
  const slug = slugify(value ?? "")
  if (!slug) {
    return undefined
  }

  return labels[slug] ?? humanizeSlug(slug)
}

function toCatalogHref(
  country: string,
  transaction: string | undefined,
  segments: Array<string | undefined>,
) {
  const parts = [slugify(country), slugify(transaction ?? ""), ...segments]
    .map((part) => slugify(part ?? ""))
    .filter(Boolean)

  return `/${parts.join("/")}`
}

function toCountLabel(resultCount: number) {
  const plural = resultCount > 1

  return `(${countFormatter.format(resultCount)} trouvé${plural ? "s" : ""})`
}

export function buildCatalogFilteringInquiry({
  country,
  transaction,
  segments,
  resultCount,
}: {
  country: string
  transaction?: string
  segments: string[]
  resultCount: number
}): CatalogFilteringInquiryProps {
  const [category, city, district] = segments
  const categorySlug = slugify(category ?? "")
  const citySlug = slugify(city ?? "")
  const districtSlug = slugify(district ?? "")
  const transactionSlug = slugify(transaction ?? "")
  const clearAllHref = toCatalogHref(country, transactionSlug, [])
  const chips: CatalogFilteringInquiryChip[] = []

  if (districtSlug) {
    chips.push({
      id: "district",
      label: labeledSlug(districtSlug, DISTRICT_LABELS) ?? districtSlug,
      href: toCatalogHref(country, transactionSlug, [categorySlug, citySlug]),
    })
  }

  if (citySlug) {
    chips.push({
      id: "city",
      label: labeledSlug(citySlug, CITY_LABELS) ?? citySlug,
      href: toCatalogHref(country, transactionSlug, [categorySlug]),
    })
  }

  if (categorySlug) {
    chips.push({
      id: "category",
      label: labeledSlug(categorySlug, CATEGORY_LABELS) ?? categorySlug,
      href: clearAllHref,
    })
  }

  return {
    title:
      RESULT_TITLES[transactionSlug] ??
      "Résultats : Catalogue immobilier",
    resultCount,
    countLabel: toCountLabel(resultCount),
    chips,
    clearAllHref: chips.length > 0 ? clearAllHref : undefined,
    sortOptions: DEFAULT_CATALOG_SORT_OPTIONS,
    sortValue: "recommended",
    view: "grid",
  }
}
