import { cache } from "react"

import { propertyApi } from "@/lib/api/properties"
import type { PropertyApiResponse } from "@/lib/api/types"
import { getCountry } from "@/lib/routing/countries"
import type { Property, PropertyAgent, PropertyInfrastructure } from "../types"

const VISUELS_BASE =
  "https://immoaskbetaapi.omnisoft.africa/public/storage/uploads/visuels/proprietes/"
const AVATARS_BASE =
  "https://immoaskbetaapi.omnisoft.africa/public/storage/uploads/visuels/avatars/"
const ORGANISATIONS_BASE =
  "https://immoaskbetaapi.omnisoft.africa/public/storage/uploads/visuels/organisations/"

export const getProperty = cache(async function getProperty(
  propertyNuo: number,
): Promise<Property | null> {
  const property = await propertyApi.getProperty(propertyNuo)

  if (!property) {
    return null
  }

  return toProperty(property)
})

function resolveImageUri(uri: string | null) {
  if (!uri) {
    return null
  }

  if (uri.startsWith("http://") || uri.startsWith("https://")) {
    return uri
  }

  return `${VISUELS_BASE}${uri}`
}

function resolveBadges(property: PropertyApiResponse) {
  const raw = property.badge_propriete
  const entries = Array.isArray(raw) ? raw : raw ? [raw] : []

  return entries
    .map((entry) => entry.badge?.badge_name?.trim())
    .filter((name): name is string => Boolean(name))
}

function positiveAmount(value: number | null | undefined) {
  return typeof value === "number" && value > 0 ? value : null
}

function toDepositMonths(value: string | number | null | undefined) {
  const months = typeof value === "number" ? value : Number(value)

  return Number.isFinite(months) && months > 0 ? months : null
}

function parseLatLong(value: string | null | undefined) {
  if (!value) {
    return { latitude: null, longitude: null }
  }

  const [rawLatitude, rawLongitude] = value.split(",")
  const latitude = Number(rawLatitude?.trim())
  const longitude = Number(rawLongitude?.trim())

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return { latitude: null, longitude: null }
  }

  return { latitude, longitude }
}

function resolveAssetUri(base: string, uri: string | null | undefined) {
  if (!uri) {
    return undefined
  }

  if (uri.startsWith("http://") || uri.startsWith("https://")) {
    return uri
  }

  return `${base}${uri}`
}

function toAgentId(value: string | number | null | undefined) {
  if (value == null || value === "") {
    return null
  }

  const id = typeof value === "number" ? value : Number(value)

  return Number.isFinite(id) ? id : null
}

function toAgent(property: PropertyApiResponse): PropertyAgent | undefined {
  const name = property.user?.name?.trim()
  if (!name) {
    return undefined
  }

  const avatar = property.user?.avatar?.trim()
  const avatarUrl =
    avatar && avatar !== "default.png"
      ? resolveAssetUri(AVATARS_BASE, avatar)
      : resolveAssetUri(ORGANISATIONS_BASE, property.user?.organisation?.logo)

  return {
    id: toAgentId(property.user?.id),
    name,
    avatarUrl,
    title: property.user?.organisation?.name_organisation?.trim() || undefined,
    organisationName:
      property.user?.organisation?.name_organisation?.trim() || undefined,
    roleName: property.user?.role?.roleName?.trim() || undefined,
  }
}

function toInfrastructures(
  entries: PropertyApiResponse["infrastructures"],
): PropertyInfrastructure[] {
  if (!entries?.length) {
    return []
  }

  const infrastructures: PropertyInfrastructure[] = []

  for (const entry of entries) {
    const name = entry.denomination?.trim()
    if (!name) {
      continue
    }

    const { latitude, longitude } = parseLatLong(entry.lat_long)

    infrastructures.push({
      name,
      type: entry.type,
      iconName: entry.icone,
      latitude,
      longitude,
    })
  }

  return infrastructures
}

function toStatus(value: string | number | null | undefined) {
  if (value == null || value === "") {
    return null
  }

  const status = Number(value)
  return Number.isFinite(status) ? status : null
}

function toIsAvailable(property: PropertyApiResponse) {
  if (toStatus(property.statut) === 2) {
    return false
  }

  if (property.est_disponible == null) {
    return true
  }

  return Boolean(property.est_disponible)
}

function toPropertyId(value: string | number | null | undefined) {
  const id = typeof value === "number" ? value : Number(value)

  return Number.isFinite(id) ? id : 0
}

function toProperty(property: PropertyApiResponse): Property {
  const propertyType =
    property.categorie_propriete?.denomination ?? property.usage ?? ""
  const monthlyPrice = positiveAmount(property.cout_mensuel)
  const salePrice = positiveAmount(property.cout_vente)
  const nightlyPrice = positiveAmount(property.nuitee)

  return {
    id: toPropertyId(property.id),
    nuo: property.nuo,
    title: property.titre ?? "",
    description: property.descriptif ?? "",
    propertyType,
    location: [
      property.quartier?.denomination,
      property.ville?.denomination,
      getCountry(property.pays?.code?.toLowerCase() ?? "")?.name,
    ]
      .filter((value): value is string => Boolean(value))
      .join(", "),
    price: salePrice ?? monthlyPrice ?? nightlyPrice ?? null,
    monthlyPrice,
    salePrice,
    nightlyPrice,
    visitFee: positiveAmount(property.cout_visite),
    isFurnished: Boolean(property.est_meuble),
    depositMonths: toDepositMonths(property.caution_avance),
    bedrooms: property.piece,
    bathrooms: property.wc_douche_interne,
    livingRooms: property.salon,
    parking: property.garage,
    area: property.surface,
    images:
      property.visuels
        ?.slice()
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((image) => resolveImageUri(image.uri))
        .filter((uri): uri is string => Boolean(uri)) ?? [],
    badges: resolveBadges(property),
    countryCode: property.pays?.code?.toLowerCase() ?? "",
    offreId: property.offre?.id != null ? Number(property.offre.id) : null,
    offreName: property.offre?.denomination ?? "",
    categorySlug:
      property.categorie_propriete?.minus_denomination ?? propertyType,
    cityName: property.ville?.denomination ?? "",
    citySlug:
      property.ville?.minus_denonimation ??
      property.ville?.minus_denomination ??
      property.ville?.denomination ??
      "",
    districtName: property.quartier?.denomination ?? "",
    districtSlug:
      property.quartier?.minus_denomination ??
      property.quartier?.denomination ??
      "",
    superCategory: property.super_categorie ?? "",
    status: toStatus(property.statut),
    isAvailable: toIsAvailable(property),
    papierPropriete: property.papier_propriete?.trim() || null,
    ...parseLatLong(property.lat_long),
    addressLabel: property.adresse?.libelle?.trim() || undefined,
    infrastructures: toInfrastructures(property.infrastructures),
    agent: toAgent(property),
  }
}
