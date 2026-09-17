import type { Metadata } from "next"

import type {
  CountryWelcomeMetadataInput,
  CountryWelcomeSeoProfile,
} from "@/features/country/types"
import {
  IMMOASK_COVER_IMAGE,
  immoAskIcons,
  immoAskSocialOpenGraph,
  immoAskSocialOther,
  immoAskSocialTwitter,
} from "@/lib/seo/site"

const COUNTRY_WELCOME_SEO: Record<string, CountryWelcomeSeoProfile> = {
  tg: {
    locale: "fr_TG",
    region: "TG",
    cities: ["Lomé", "Agoè", "Adidogomé", "Baguida", "Kara", "Kpalimé", "Sokodé"],
    extraKeywords: [
      "immobilier Togo",
      "immobilier Lomé",
      "appartement à louer Lomé",
      "maison à louer Togo",
      "terrain titré Togo",
      "foncier Togo",
      "visite immobilière Lomé",
    ],
  },
  bj: {
    locale: "fr_BJ",
    region: "BJ",
    cities: ["Cotonou", "Porto-Novo", "Abomey-Calavi", "Parakou"],
    extraKeywords: [
      "immobilier Bénin",
      "immobilier Cotonou",
      "appartement à louer Cotonou",
      "maison à louer Bénin",
      "terrain titré Bénin",
      "foncier Bénin",
      "visite immobilière Cotonou",
    ],
  },
}

const DEFAULT_WELCOME_SEO: CountryWelcomeSeoProfile = {
  locale: "fr",
  region: "",
  cities: [],
  extraKeywords: [],
}

export function countryWelcomePreposition(countryName: string) {
  const normalized = countryName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

  if (normalized === "togo" || normalized === "benin") {
    return `au ${countryName}`
  }

  return `à ${countryName}`
}

export function getCountryWelcomeSeoProfile(countryCode: string) {
  return COUNTRY_WELCOME_SEO[countryCode.toLowerCase()] ?? DEFAULT_WELCOME_SEO
}

export function buildCountryWelcomeTitle(countryName: string) {
  const place = countryWelcomePreposition(countryName)

  return `Trouver aisément un logement urbain ou rural et acheter en sécurité les terrains et immeubles et biens immobiliers ${place} | ImmoAsk: Immobilier, Foncier, BTP, Tourisme | Chez vous, c'est ici`
}

export function buildCountryWelcomeDescription(countryName: string) {
  const place = countryWelcomePreposition(countryName)

  return `Découvrez les meilleures offres immobilières ${place}. Trouvez facilement un logement urbain ou rural à louer, ainsi que des terrains et immeubles à acheter en toute sécurité. ImmoAsk vous accompagne dans l'achat, la vente, la location et la gestion de patrimoine immobilier.`
}

export function buildCountryWelcomeKeywords(
  countryCode: string,
  countryName: string,
) {
  const place = countryWelcomePreposition(countryName)
  const profile = getCountryWelcomeSeoProfile(countryCode)
  const cityKeywords = profile.cities.flatMap((city) => [
    `immobilier ${city}`,
    `logement ${city}`,
    `terrain à vendre ${city}`,
  ])

  return [
    ...new Set([
      `immobilier ${countryName}`,
      `logement urbain ${countryName}`,
      `logement rural ${countryName}`,
      `appartement à louer ${countryName}`,
      `maison à louer ${countryName}`,
      `terrain à vendre ${countryName}`,
      `immeuble à vendre ${countryName}`,
      `acheter un terrain ${place}`,
      `acheter un immeuble ${place}`,
      `location immobilière ${countryName}`,
      `vente immobilière ${countryName}`,
      `foncier ${countryName}`,
      `titre foncier ${countryName}`,
      `BTP ${countryName}`,
      `tourisme ${countryName}`,
      `gestion de patrimoine immobilier ${countryName}`,
      "ImmoAsk",
      "ImmoAsk immobilier",
      "Chez vous, c'est ici",
      ...profile.extraKeywords,
      ...cityKeywords,
    ]),
  ]
}

export function buildCountryWelcomeCanonicalPath(countryCode: string) {
  return `/${countryCode.toLowerCase()}`
}

export function buildCountryWelcomeMetadata({
  countryCode,
  countryName,
}: CountryWelcomeMetadataInput): Metadata {
  const code = countryCode.toLowerCase()
  const title = buildCountryWelcomeTitle(countryName)
  const description = buildCountryWelcomeDescription(countryName)
  const keywords = buildCountryWelcomeKeywords(code, countryName)
  const path = buildCountryWelcomeCanonicalPath(code)
  const profile = getCountryWelcomeSeoProfile(code)

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
    keywords,
    alternates: {
      canonical: path,
      languages: {
        "fr": path,
        "x-default": path,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: immoAskIcons,
    openGraph: immoAskSocialOpenGraph({
      locale: profile.locale,
      title,
      description,
      url: path,
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
      ...(profile.region
        ? {
            "geo.region": profile.region,
            "geo.placename": countryName,
          }
        : {}),
    }),
  }
}
