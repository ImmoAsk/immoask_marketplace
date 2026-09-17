import { propertyApi } from "@/lib/api/properties"
import type { PropertyApiResponse } from "@/lib/api/types"
import { getTransactionId } from "@/lib/routing/routes"

import type { CatalogFilterQuery, CatalogIdFilters, Property } from "../types"

type GetPropertiesParams = {
  country: string
  transaction: string
  segments: string[]
}

type GetFilteringPropertiesParams = {
  country: string
  transaction?: string
  segments?: string[]
  filterQuery?: CatalogFilterQuery
  idFilters?: CatalogIdFilters
}

function parseFilterNumber(value?: string) {
  if (!value) {
    return undefined
  }

  const parsed = Number(value.replace(/\s/g, "").replace(",", "."))
  return Number.isFinite(parsed) ? parsed : undefined
}

export async function getProperties({
  country,
  transaction,
  segments,
}: GetPropertiesParams): Promise<Property[]> {
  const offreId = getTransactionId(transaction)

  if (!offreId) {
    return []
  }

  const [category, city, district] = segments ?? []

  const properties =
    category || city || district
      ? await propertyApi.getProperties({
          offreId,
          categoryName: category,
          cityName: city,
          districtName: district,
        })
      : await propertyApi.getLatestProperties()

  return properties.map(toCatalogProperty)
}

export async function getFilteringProperties({
  transaction,
  segments,
  filterQuery,
  idFilters,
}: GetFilteringPropertiesParams): Promise<Property[]> {
  const offreId = idFilters
    ? idFilters.offre
    : transaction
      ? (getTransactionId(transaction) ?? undefined)
      : undefined
  const [category, city, district] = idFilters ? [] : (segments ?? [])
  const properties = await propertyApi.getFilteringProperties({
    offreId,
    usage: idFilters?.usage,
    categorieId: idFilters?.categorie,
    villeId: idFilters?.ville,
    quartierId: idFilters?.quartier,
    categoryName: category,
    cityName: city,
    districtName: district,
    bedrooms: parseFilterNumber(filterQuery?.bedrooms),
    bathrooms: filterQuery?.bathrooms,
    budgetMin: parseFilterNumber(filterQuery?.budgetMin),
    budgetMax: parseFilterNumber(filterQuery?.budgetMax),
    depositMonths: filterQuery?.depositMonths,
    parking: parseFilterNumber(filterQuery?.parking),
    limit: 100,
  })

  return properties.map(toCatalogProperty)
}

const VISUELS_BASE =
  "https://immoaskbetaapi.omnisoft.africa/public/storage/uploads/visuels/proprietes/"

const OFFER_LABELS: Record<string, string> = {
  vendre: "ACQUISITION",
  vente: "ACQUISITION",
  louer: "LOCATION",
  location: "LOCATION",
  bail: "BAIL",
  investir: "INVESTISSEMENT",
}

function positiveAmount(value: number | null | undefined) {
  return typeof value === "number" && value > 0 ? value : null
}

function resolveBadge(property: PropertyApiResponse) {
  const raw = property.badge_propriete
  const entry = Array.isArray(raw) ? raw[0] : raw
  return entry?.badge?.badge_name ?? null
}

function resolveTitle(property: PropertyApiResponse, propertyType: string) {
  const titre = property.titre?.trim()
  if (titre && titre !== "-") {
    return titre
  }
  return propertyType || "Bien immobilier"
}

function resolveOfferLabel(denomination: string | null | undefined) {
  if (!denomination) {
    return ""
  }
  return OFFER_LABELS[denomination.toLowerCase()] ?? denomination
}

function resolveImageUri(uri: string | null) {
  if (!uri) {
    return null
  }
  if (uri.startsWith("http://") || uri.startsWith("https://")) {
    return uri
  }
  return `${VISUELS_BASE}${uri}`
}

export function toCatalogProperty(property: PropertyApiResponse): Property {
  const salePrice = positiveAmount(property.cout_vente)
  const monthlyPrice = positiveAmount(property.cout_mensuel)
  const nightlyPrice = positiveAmount(property.nuitee)

  const price = salePrice ?? monthlyPrice ?? nightlyPrice ?? null
  const pricePeriod =
    salePrice != null
      ? "vie"
      : monthlyPrice != null
        ? "mois"
        : nightlyPrice != null
          ? "nuit"
          : null

  const propertyType =
    property.categorie_propriete?.denomination ??
    property.usage ??
    ""
  const isFurnished =
    Boolean(property.est_meuble) || /meuble/i.test(propertyType)

  return {
    id: property.id,
    nuo: property.nuo,
    country: property.pays?.code?.toLowerCase() ?? "",
    offreId: property.offre?.id != null ? Number(property.offre.id) : null,
    offreName: property.offre?.denomination ?? "",
    categorySlug:
      property.categorie_propriete?.minus_denomination ??
      propertyType,
    citySlug:
      property.ville?.minus_denonimation ??
      property.ville?.minus_denomination ??
      property.ville?.denomination ??
      "",
    districtSlug:
      property.quartier?.minus_denomination ??
      property.quartier?.denomination ??
      "",
    title: resolveTitle(property, propertyType),
    description: property.descriptif ?? "",

    propertyType,

    offerLabel: resolveOfferLabel(property.offre?.denomination),
    badge: resolveBadge(property),

    location: [
      property.quartier?.denomination,
      property.ville?.denomination,
    ]
      .filter((value): value is string => Boolean(value))
      .join(", "),

    price,
    pricePeriod,
    nightlyPrice,
    isFurnished,

    bedrooms: property.piece ?? null,
    bathrooms: property.wc_douche_interne ?? null,
    parking: property.garage ?? null,
    area: property.surface ?? null,

    images:
      property.visuels
        ?.slice()
        .sort(
          (a, b) => (a.position ?? 0) - (b.position ?? 0),
        )
        .map((image) => resolveImageUri(image.uri))
        .filter((uri): uri is string => Boolean(uri)) ?? [],
  }
}