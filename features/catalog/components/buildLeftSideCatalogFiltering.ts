import type {
  LeftSideCatalogFilteringCityOption,
  LeftSideCatalogFilteringDemand,
  LeftSideCatalogFilteringDistrictOption,
  LeftSideCatalogFilteringOption,
  LeftSideCatalogFilteringProps,
  LeftSideCatalogFilteringValues,
} from "@/features/properties/types"
import type { LocationRecord } from "@/lib/api/types"
import { slugify } from "@/lib/utils/createPropertyLink"

import type { CatalogFilterQuery, Property } from "../types"

const CITY_LABELS: Record<string, string> = {
  lome: "Lomé",
}

const DEMAND_OPTIONS = [
  { id: "rent" as const, label: "Louer" },
  { id: "sale" as const, label: "Acheter" },
  { id: "lease" as const, label: "Bailler" },
]

const DEMAND_TO_TRANSACTION: Record<LeftSideCatalogFilteringDemand, string> = {
  rent: "locations-immobilieres",
  sale: "ventes-immobilieres",
  lease: "baux-immobiliers",
}

function humanizeSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function labeledSlug(value: string) {
  const slug = slugify(value)
  if (!slug) {
    return ""
  }

  return CITY_LABELS[slug] ?? humanizeSlug(slug)
}

function uniqueOptions(options: LeftSideCatalogFilteringOption[]) {
  const seen = new Set<string>()
  const unique: LeftSideCatalogFilteringOption[] = []

  for (const option of options) {
    if (!option.value || seen.has(option.value)) {
      continue
    }

    seen.add(option.value)
    unique.push(option)
  }

  return unique
}

function uniqueCityOptions(options: LeftSideCatalogFilteringCityOption[]) {
  const seen = new Set<string>()
  const unique: LeftSideCatalogFilteringCityOption[] = []

  for (const option of options) {
    if (!option.value || seen.has(option.value)) {
      continue
    }

    seen.add(option.value)
    unique.push(option)
  }

  return unique
}

export function toLocationSlug(location: LocationRecord) {
  return slugify(location.denomination ?? location.code ?? "")
}

export function toCityOptions(
  cities: LocationRecord[],
): LeftSideCatalogFilteringCityOption[] {
  return uniqueCityOptions(
    cities.flatMap((city) => {
      const value = toLocationSlug(city)
      const label = city.denomination?.trim() || ""
      if (!value) {
        return []
      }

      return [
        {
          id: city.id,
          value,
          label: CITY_LABELS[value] ?? label ?? labeledSlug(value),
        },
      ]
    }),
  )
}

export function toDistrictOptions(
  districts: LocationRecord[],
  city: string,
): LeftSideCatalogFilteringDistrictOption[] {
  return uniqueDistricts(
    districts.flatMap((district) => {
      const value = toLocationSlug(district)
      const label = district.denomination?.trim() || ""
      if (!value || !city) {
        return []
      }

      return [
        {
          id: district.id,
          value,
          label: label || labeledSlug(value),
          city,
        },
      ]
    }),
  )
}

function uniqueDistricts(options: LeftSideCatalogFilteringDistrictOption[]) {
  const seen = new Set<string>()
  const unique: LeftSideCatalogFilteringDistrictOption[] = []

  for (const option of options) {
    const key = `${option.city}/${option.value}`
    if (!option.value || !option.city || seen.has(key)) {
      continue
    }

    seen.add(key)
    unique.push(option)
  }

  return unique
}

export const CATALOG_FILTER_PARAM_KEYS = {
  bedrooms: "chambres",
  bathrooms: "bains",
  budgetMin: "min",
  budgetMax: "max",
  depositMonths: "caution",
  parking: "garage",
} as const

export function toCatalogFilterQuery(
  values: Pick<
    LeftSideCatalogFilteringValues,
    | "bedrooms"
    | "bathrooms"
    | "budgetMin"
    | "budgetMax"
    | "depositMonths"
    | "parking"
  >,
): CatalogFilterQuery {
  return {
    bedrooms: values.bedrooms || undefined,
    bathrooms: values.bathrooms || undefined,
    budgetMin: values.budgetMin || undefined,
    budgetMax: values.budgetMax || undefined,
    depositMonths: values.depositMonths || undefined,
    parking: values.parking || undefined,
  }
}

export function hasCatalogFilterQuery(query?: CatalogFilterQuery) {
  if (!query) {
    return false
  }

  return Boolean(
    query.bedrooms ||
      query.bathrooms ||
      query.budgetMin ||
      query.budgetMax ||
      query.depositMonths ||
      query.parking,
  )
}

export function toCatalogFilterSearchParams(query?: CatalogFilterQuery) {
  const params = new URLSearchParams()

  if (!query) {
    return params
  }

  const values: Array<
    [keyof typeof CATALOG_FILTER_PARAM_KEYS, string | undefined]
  > = [
    ["bedrooms", query.bedrooms],
    ["bathrooms", query.bathrooms],
    ["budgetMin", query.budgetMin],
    ["budgetMax", query.budgetMax],
    ["depositMonths", query.depositMonths],
    ["parking", query.parking],
  ]

  for (const [key, value] of values) {
    if (value) {
      params.set(CATALOG_FILTER_PARAM_KEYS[key], value)
    }
  }

  return params
}

export function toDemand(transaction: string): LeftSideCatalogFilteringDemand {
  if (transaction === "ventes-immobilieres") {
    return "sale"
  }

  if (transaction === "baux-immobiliers") {
    return "lease"
  }

  return "rent"
}

export function toLeftSideCatalogFilteringHref(
  country: string,
  currentTransaction: string | undefined,
  values: LeftSideCatalogFilteringValues,
) {
  const transaction =
    DEMAND_TO_TRANSACTION[values.demand] ?? currentTransaction
  const parts = [slugify(country), slugify(transaction ?? "")].filter(Boolean)

  if (values.propertyType) {
    parts.push(slugify(values.propertyType))

    if (values.city) {
      parts.push(slugify(values.city))

      if (values.district) {
        parts.push(slugify(values.district))
      }
    }
  }

  const href = `/${parts.join("/")}`
  const query = toCatalogFilterSearchParams(
    toCatalogFilterQuery(values),
  ).toString()
  return query ? `${href}?${query}` : href
}

export function buildLeftSideCatalogFiltering({
  country,
  transaction,
  segments,
  properties,
  cities,
  districts,
  query,
}: {
  country: string
  transaction?: string
  segments: string[]
  properties: Property[]
  cities?: LocationRecord[]
  districts?: LocationRecord[]
  query?: CatalogFilterQuery
}): LeftSideCatalogFilteringProps {
  const [category, city, district] = segments
  const categorySlug = slugify(category ?? "")
  const citySlug = slugify(city ?? "")
  const districtSlug = slugify(district ?? "")

  const cityOptions = toCityOptions(cities ?? [])

  if (citySlug && !cityOptions.some((option) => option.value === citySlug)) {
    cityOptions.push({ value: citySlug, label: labeledSlug(citySlug) })
  }

  const districtOptions = toDistrictOptions(districts ?? [], citySlug)

  if (
    districtSlug &&
    citySlug &&
    !districtOptions.some(
      (option) => option.value === districtSlug && option.city === citySlug,
    )
  ) {
    districtOptions.push({
      value: districtSlug,
      label: labeledSlug(districtSlug),
      city: citySlug,
    })
  }

  const propertyTypeOptions = uniqueOptions(
    properties.map((property) => ({
      value: slugify(property.categorySlug),
      label: property.propertyType || labeledSlug(property.categorySlug),
    })),
  )

  if (
    categorySlug &&
    !propertyTypeOptions.some((option) => option.value === categorySlug)
  ) {
    propertyTypeOptions.push({
      value: categorySlug,
      label: labeledSlug(categorySlug),
    })
  }

  return {
    country,
    transaction,
    demandOptions: DEMAND_OPTIONS,
    cityOptions,
    districtOptions,
    propertyTypeOptions,
    defaultValues: {
      demand: toDemand(transaction ?? ""),
      city: citySlug,
      district: districtSlug,
      propertyType: categorySlug,
      bedrooms: query?.bedrooms ?? "",
      bathrooms: query?.bathrooms ?? "",
      budgetMin: query?.budgetMin ?? "",
      budgetMax: query?.budgetMax ?? "",
      depositMonths: query?.depositMonths ?? "",
      parking: query?.parking ?? "",
    },
  }
}
