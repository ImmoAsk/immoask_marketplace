import type { CatalogHeaderBreadcrumbItem, CatalogHeaderProps } from "@/features/properties/types"
import { getCountry } from "@/lib/routing/countries"
import { slugify } from "@/lib/utils/createPropertyLink"

const CITY_LABELS: Record<string, string> = {
  lome: "Lomé",
}

const DISTRICT_LABELS: Record<string, string> = {
  agoe: "Agoè",
  agodeke: "Agodeke",
  adidogome: "Adidogomé",
  akodessewa: "Akodessewa",
}

const TRANSACTION_LABELS: Record<string, string> = {
  "locations-immobilieres": "Locations immobilières",
  "ventes-immobilieres": "Ventes immobilières",
  "baux-immobiliers": "Baux immobiliers",
  "investissements-immobiliers": "Investissements immobiliers",
}

const TRANSACTION_TITLE_LABELS: Record<string, string> = {
  "locations-immobilieres": "en location",
  "ventes-immobilieres": "en vente",
  "baux-immobiliers": "en bail",
  "investissements-immobiliers": "en investissement",
}

const CATEGORY_LABELS: Record<string, string> = {
  magasin: "Magasin",
  villa: "Villa",
  duplex: "Duplex",
  appartement: "Appartement",
  "appartement-meuble": "Appartement meublé",
  maison: "Maison",
  "terrain-urbain": "Terrain urbain",
  "terrain-rural": "Terrain rural",
  rooftop: "Rooftop",
  bureau: "Bureau",
  chambre: "Chambre",
  studio: "Studio",
}

const CATEGORY_PLURALS: Record<string, string> = {
  magasin: "magasins",
  villa: "villas",
  duplex: "duplex",
  appartement: "appartements",
  "appartement-meuble": "appartements meublés",
  maison: "maisons",
  "terrain-urbain": "terrains urbains",
  "terrain-rural": "terrains ruraux",
  rooftop: "rooftops",
  bureau: "bureaux",
  chambre: "chambres",
  studio: "studios",
}

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

function pushCrumb(
  items: CatalogHeaderBreadcrumbItem[],
  label: string | undefined,
  href?: string,
) {
  if (!label) {
    return
  }

  items.push(href ? { label, href } : { label })
}

function countryPreposition(countryName: string) {
  const normalized = countryName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

  if (normalized === "togo" || normalized === "benin") {
    return `au ${countryName}`
  }

  return `à ${countryName}`
}

function startsWithVowel(value: string) {
  const first = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .charAt(0)
    .toLowerCase()

  return "aeiouy".includes(first)
}

function toCategoryPhrase(slug: string) {
  if (CATEGORY_PLURALS[slug]) {
    return CATEGORY_PLURALS[slug]
  }

  const label = humanizeSlug(slug).toLowerCase()
  if (label.endsWith("s") || label.endsWith("x") || label.endsWith("z")) {
    return label
  }

  return `${label}s`
}

export function buildCatalogTitle({
  transactionSlug,
  categorySlug,
  cityLabel,
  districtLabel,
}: {
  transactionSlug: string
  categorySlug: string
  cityLabel?: string
  districtLabel?: string
}) {
  if (!transactionSlug && !categorySlug) {
    return "Catalogue immobilier"
  }

  const categoryPhrase = categorySlug
    ? toCategoryPhrase(categorySlug)
    : "biens"
  const article = startsWithVowel(categoryPhrase) ? "d'" : "de "
  const transactionPhrase = transactionSlug
    ? (TRANSACTION_TITLE_LABELS[transactionSlug] ??
      `en ${humanizeSlug(transactionSlug).toLowerCase()}`)
    : ""
  const places = [cityLabel, districtLabel].filter(Boolean)

  return [
    `Catalogue ${article}${categoryPhrase}${transactionPhrase ? ` ${transactionPhrase}` : ""}`,
    ...places,
  ].join(", ")
}

export function buildCatalogPageTitle({
  country,
  transaction,
  segments = [],
}: {
  country: string
  transaction?: string
  segments?: string[]
}) {
  const transactionSlug = slugify(transaction ?? "")
  const categorySlug = slugify(segments[0] ?? "")
  const cityLabel = labeledSlug(segments[1], CITY_LABELS)
  const districtLabel = labeledSlug(segments[2], DISTRICT_LABELS)

  return buildCatalogTitle({
    transactionSlug,
    categorySlug,
    cityLabel,
    districtLabel,
  })
}

function toCountLabel({
  propertyCount,
  cityLabel,
  countryName,
}: {
  propertyCount: number
  cityLabel?: string
  countryName: string
}) {
  const plural = propertyCount > 1
  const count = countFormatter.format(propertyCount)
  const location = cityLabel
    ? `à ${cityLabel} & environs`
    : countryPreposition(countryName)

  return `${count} bien${plural ? "s" : ""} disponible${plural ? "s" : ""} ${location}`
}

export function buildCatalogHeader({
  country,
  transaction,
  segments,
  propertyCount,
}: {
  country: string
  transaction?: string
  segments: string[]
  propertyCount: number
}): CatalogHeaderProps {
  const countryCode = slugify(country)
  const countryName = getCountry(countryCode)?.name ?? humanizeSlug(countryCode)
  const transactionSlug = slugify(transaction ?? "")
  const categorySlug = slugify(segments[0] ?? "")
  const citySlug = slugify(segments[1] ?? "")
  const districtSlug = slugify(segments[2] ?? "")
  const cityLabel = labeledSlug(citySlug, CITY_LABELS)
  const districtLabel = labeledSlug(districtSlug, DISTRICT_LABELS)
  const transactionHref = transactionSlug
    ? `/${countryCode}/${transactionSlug}`
    : undefined
  const categoryHref = transactionHref
    ? `${transactionHref}/${categorySlug}`
    : undefined
  const cityHref = categoryHref ? `${categoryHref}/${citySlug}` : undefined

  const items: CatalogHeaderBreadcrumbItem[] = []

  pushCrumb(items, "Catalogue immobilier", `/${countryCode}`)
  pushCrumb(
    items,
    transactionSlug
      ? (TRANSACTION_LABELS[transactionSlug] ?? humanizeSlug(transactionSlug))
      : undefined,
    transactionHref,
  )
  pushCrumb(
    items,
    labeledSlug(categorySlug, CATEGORY_LABELS),
    categorySlug ? categoryHref : undefined,
  )
  pushCrumb(items, cityLabel, citySlug ? cityHref : undefined)
  pushCrumb(items, districtLabel)

  return {
    items,
    title: buildCatalogPageTitle({
      country,
      transaction,
      segments,
    }),
    subtitle: `Transactions sécurisées, visites physiques certifiées et vérification des titres fonciers ${countryPreposition(countryName)}.`,
    countLabel: toCountLabel({
      propertyCount,
      cityLabel,
      countryName,
    }),
  }
}
