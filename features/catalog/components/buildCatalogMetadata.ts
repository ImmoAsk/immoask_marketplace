import type { Metadata } from "next"

import type { CatalogMetadataProps } from "@/features/catalog/types"
import { getCountry } from "@/lib/routing/countries"
import {
  IMMOASK_COVER_IMAGE,
  immoAskIcons,
  immoAskSocialOpenGraph,
  immoAskSocialOther,
  immoAskSocialTwitter,
} from "@/lib/seo/site"
import { slugify } from "@/lib/utils/createPropertyLink"

import { buildCatalogPageTitle } from "./buildCatalogHeader"

export function buildCatalogKeywords(title: string) {
  const parts = title
    .split(/[|,]/)
    .map((part) => part.trim())
    .filter(Boolean)

  const words = title
    .split(/[\s|,]+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 1)

  return [...new Set([title, ...parts, ...words, "ImmoAsk", "immobilier"])]
}

export function buildCatalogDescription(title: string) {
  return `${title}. Trouvez des annonces immobilières vérifiées sur ImmoAsk, avec visites physiques certifiées et transactions sécurisées.`
}

export function buildCatalogCanonicalPath({
  country,
  transaction,
  segments = [],
}: CatalogMetadataProps) {
  const parts = [country, transaction, ...segments]
    .map((part) => slugify(part ?? ""))
    .filter(Boolean)

  return `/${parts.join("/")}`
}

export function buildCatalogMetadata({
  country,
  transaction,
  segments = [],
}: CatalogMetadataProps): Metadata {
  const title = buildCatalogPageTitle({
    country,
    transaction,
    segments,
  })
  const description = buildCatalogDescription(title)
  const path = buildCatalogCanonicalPath({
    country,
    transaction,
    segments,
  })
  const countryName = getCountry(country)?.name ?? country.toUpperCase()

  return {
    title: {
      absolute: title,
    },
    description,
    applicationName: "ImmoAsk",
    authors: [{ name: "ImmoAsk", url: "https://www.immoask.com" }],
    creator: "ImmoAsk",
    publisher: "ImmoAsk",
    category: "immobilier",
    keywords: buildCatalogKeywords(title),
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
      title,
      description,
      url: path,
      locale: country === "bj" ? "fr_BJ" : "fr_TG",
      images: [
        {
          url: IMMOASK_COVER_IMAGE,
          alt: title,
        },
      ],
    }),
    twitter: immoAskSocialTwitter({
      title,
      description,
      images: [IMMOASK_COVER_IMAGE],
    }),
    other: immoAskSocialOther({
      abstract: description,
      "content-language": "fr",
      "geo.region": country.toUpperCase(),
      "geo.placename": countryName,
    }),
  }
}
