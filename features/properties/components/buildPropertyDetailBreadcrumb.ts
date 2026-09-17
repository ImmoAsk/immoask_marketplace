import { getCountry } from "@/lib/routing/countries"
import {
  createPropertyLink,
  getTransactionSlug,
  slugify,
} from "@/lib/utils/createPropertyLink"
import type {
  Property,
  PropertyDetailBreadcrumbItem,
} from "@/features/properties/types"

const TRANSACTION_LABELS: Record<string, string> = {
  "locations-immobilieres": "Locations immobilières",
  "ventes-immobilieres": "Ventes immobilières",
  "baux-immobiliers": "Baux immobiliers",
  "investissements-immobiliers": "Investissements immobiliers",
}

function humanizeSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function pushCrumb(
  items: PropertyDetailBreadcrumbItem[],
  label: string | undefined,
  href?: string,
) {
  if (!label) {
    return
  }

  items.push(href ? { label, href } : { label })
}

export function buildPropertyDetailBreadcrumbItems({
  property,
  country,
  transaction,
  segments,
}: {
  property: Property
  country: string
  transaction: string
  segments: string[]
}): PropertyDetailBreadcrumbItem[] {
  const countryCode = slugify(property.countryCode || country)
  const countryName = getCountry(countryCode)?.name
  const transactionSlug =
    getTransactionSlug({
      transaction,
      offreId: property.offreId,
      offreName: property.offreName,
    }) || slugify(transaction)

  const locationSegments = segments.filter(
    (segment) => segment !== String(property.nuo ?? ""),
  )
  const categorySlug = slugify(
    property.categorySlug || locationSegments[0] || "",
  )
  const citySlug = slugify(property.citySlug || locationSegments[1] || "")
  const districtSlug = slugify(
    property.districtSlug || locationSegments[2] || "",
  )

  const categoryHref = `/${countryCode}/${transactionSlug}/${categorySlug}`
  const cityHref = `${categoryHref}/${citySlug}`
  const districtHref = `${cityHref}/${districtSlug}`
  const nuo = property.nuo ?? property.id

  const items: PropertyDetailBreadcrumbItem[] = []

  pushCrumb(items, "Accueil", "/")
  pushCrumb(items, countryName, `/${countryCode}`)
  pushCrumb(
    items,
    TRANSACTION_LABELS[transactionSlug] ?? humanizeSlug(transactionSlug),
    `/${countryCode}/${transactionSlug}`,
  )
  pushCrumb(
    items,
    property.propertyType || humanizeSlug(categorySlug),
    categorySlug ? categoryHref : undefined,
  )
  pushCrumb(
    items,
    property.cityName || humanizeSlug(citySlug),
    citySlug ? cityHref : undefined,
  )
  pushCrumb(
    items,
    property.districtName || humanizeSlug(districtSlug),
    districtSlug ? districtHref : undefined,
  )
  pushCrumb(items, nuo ? String(nuo) : undefined)

  return items
}

export function getPropertySharePath({
  property,
  country,
  transaction,
  segments,
}: {
  property: Property
  country: string
  transaction: string
  segments: string[]
}) {
  const locationSegments = segments.filter(
    (segment) => segment !== String(property.nuo ?? ""),
  )

  return createPropertyLink({
    country: property.countryCode || country,
    nuo: property.nuo ?? property.id,
    category: property.categorySlug || locationSegments[0] || "",
    city: property.citySlug || locationSegments[1] || "",
    district: property.districtSlug || locationSegments[2] || "",
    transaction,
    offreId: property.offreId,
    offreName: property.offreName,
  })
}
