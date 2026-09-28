import type { Metadata } from "next"

import {
  immoAskIcons,
  immoAskSocialOpenGraph,
  immoAskSocialTwitter,
  toAbsoluteUrl,
} from "@/lib/seo/site"

export function buildAnnuaireTitle(countryName: string) {
  return `Annuaire des professionnels immobiliers au ${countryName} : Agents immobiliers, agences immobilières, Huissiers, Notaires, Gestionnaires immobiliers`
}

export function buildAnnuaireDescription(countryName: string) {
  return `Rencontrer des agents immobiliers, des agences immobilières, des huissiers et des notaires au ${countryName}. L'annuaire ImmoAsk rassemble les professionnels de l'expertise et de la gestion immobilière.`
}

export function buildAnnuairePath(countryCode: string) {
  return `/${countryCode.toLowerCase()}/annuaire`
}

export function buildAnnuaireMetadata({
  countryCode,
  countryName,
}: {
  countryCode: string
  countryName: string
}): Metadata {
  const title = buildAnnuaireTitle(countryName)
  const description = buildAnnuaireDescription(countryName)
  const path = buildAnnuairePath(countryCode)

  return {
    title: { absolute: title },
    description,
    applicationName: "ImmoAsk",
    authors: [{ name: "ImmoAsk", url: "https://www.immoask.com" }],
    creator: "ImmoAsk",
    publisher: "ImmoAsk",
    category: "immobilier",
    keywords: [
      title,
      `annuaire immobilier ${countryName}`,
      `agents immobiliers ${countryName}`,
      `agences immobilières ${countryName}`,
      `huissiers ${countryName}`,
      `notaires ${countryName}`,
      `gestionnaires immobiliers ${countryName}`,
      "annuaire ImmoAsk",
    ],
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
      url: toAbsoluteUrl(path),
      type: "website",
    }),
    twitter: immoAskSocialTwitter({
      title,
      description,
    }),
  }
}

export function buildAnnuaireJsonLd({
  countryName,
  path,
  agents,
}: {
  countryName: string
  path: string
  agents: Array<{ name: string; href?: string }>
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: buildAnnuaireTitle(countryName),
    description: buildAnnuaireDescription(countryName),
    url: toAbsoluteUrl(path),
    inLanguage: "fr",
    about: {
      "@type": "ItemList",
      itemListElement: agents.slice(0, 10).map((agent, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: agent.name,
        url: agent.href ? toAbsoluteUrl(agent.href) : undefined,
      })),
    },
  }
}
