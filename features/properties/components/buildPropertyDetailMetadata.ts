import type { Metadata } from "next"

import { getCountry } from "@/lib/routing/countries"
import {
  IMMOASK_COVER_IMAGE,
  immoAskIcons,
  immoAskSocialOpenGraph,
  immoAskSocialOther,
  immoAskSocialTwitter,
} from "@/lib/seo/site"
import type { Property } from "@/features/properties/types"

import { getPropertySharePath } from "./buildPropertyDetailBreadcrumb"

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

function toCountryName(property: Property, country: string) {
  return (
    getCountry(property.countryCode ?? "")?.name ??
    getCountry(country)?.name ??
    country.toUpperCase()
  )
}

export function toMetaDescription(descriptif: string) {
  const text = descriptif.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  if (!text) {
    return undefined
  }

  if (text.length <= 320) {
    return text
  }

  return `${text.slice(0, 317).trimEnd()}...`
}

export function buildPropertyDetailSeoTitle(
  property: Property,
  country: string,
) {
  const type = property.propertyType?.trim() || "Bien immobilier"
  const phrase = toOfferPhrase(property.offreName)
  const lead = [type, phrase].filter(Boolean).join(" ")
  const places = [property.cityName, property.districtName]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(", ")
  const nuo = property.nuo ? `No. ${property.nuo}` : undefined
  const countryName = toCountryName(property, country)
  const left = [lead, places].filter(Boolean).join(", ")
  const right = [nuo, countryName].filter(Boolean).join(" | ")

  return [left, right].filter(Boolean).join(" | ")
}

export function buildPropertyDetailKeywords(title: string) {
  const parts = title
    .split(/[|,]/)
    .map((part) => part.trim())
    .filter(Boolean)

  const words = title
    .split(/[\s|,]+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 1)

  return [...new Set([title, ...parts, ...words])]
}

export function buildPropertyDetailMetadata({
  property,
  country,
  transaction,
  segments,
}: {
  property: Property
  country: string
  transaction: string
  segments: string[]
}): Metadata {
  const title = buildPropertyDetailSeoTitle(property, country)
  const description =
    toMetaDescription(property.description) ??
    `${title}. Annonce immobilière vérifiée sur ImmoAsk.`
  const cover = property.images[0]
  const path = getPropertySharePath({
    property,
    country,
    transaction,
    segments,
  })
  const countryCode = property.countryCode || country
  const countryName = toCountryName(property, country)
  const placeName =
    [property.districtName, property.cityName, countryName]
      .map((value) => value?.trim())
      .filter(Boolean)
      .join(", ") || countryName

  return {
    title: {
      absolute: title,
    },
    description,
    applicationName: "ImmoAsk",
    authors: [{ name: "ImmoAsk", url: "https://www.immoask.com" }],
    creator: "ImmoAsk",
    publisher: "ImmoAsk",
    category: property.propertyType || "immobilier",
    keywords: buildPropertyDetailKeywords(title),
    alternates: {
      canonical: path,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: immoAskIcons,
    openGraph: immoAskSocialOpenGraph({
      type: "article",
      title,
      description,
      url: path,
      locale: countryCode === "bj" ? "fr_BJ" : "fr_TG",
      images: [
        {
          url: cover ?? IMMOASK_COVER_IMAGE,
          alt: title,
        },
      ],
    }),
    twitter: immoAskSocialTwitter({
      title,
      description,
      images: [cover ?? IMMOASK_COVER_IMAGE],
    }),
    other: immoAskSocialOther({
      abstract: description,
      "content-language": "fr",
      "geo.region": countryCode.toUpperCase(),
      "geo.placename": placeName,
      ...(property.latitude != null && property.longitude != null
        ? {
            "geo.position": `${property.latitude};${property.longitude}`,
            ICBM: `${property.latitude}, ${property.longitude}`,
          }
        : {}),
    }),
  }
}
