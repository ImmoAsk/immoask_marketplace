import type { Metadata } from "next"

import type { ContactObjectOption } from "@/features/contact/types"
import {
  immoAskSocialOpenGraph,
  immoAskSocialOther,
  immoAskSocialTwitter,
} from "@/lib/seo/site"

export const CONTACT_PAGE_PATH = "/contact"

export const CONTACT_PAGE_TITLE = "Contactez ImmoAsk"

export const CONTACT_PAGE_DESCRIPTION =
  "Contactez ImmoAsk pour un investissement immobilier, l'exploitation de terrains titrés, la construction d'hôtels ou une promotion immobilière. Notre équipe vous accompagne."

export const DEFAULT_CONTACT_OBJECT_OPTIONS: ContactObjectOption[] = [
  {
    id: "investissement-grande-envergure",
    label: "Investissement immobilier de grande envergure",
  },
  {
    id: "exploitation-terrains-titres",
    label: "Exploitation de terrains titrés en pleine ville",
  },
  {
    id: "construction-hotels",
    label: "Construction d'hôtels",
  },
  {
    id: "promotion-immobiliere",
    label: "Promotion immobilière dans une ville",
  },
]

export function buildContactPageMetadata(): Metadata {
  const title = `${CONTACT_PAGE_TITLE} | ImmoAsk`

  return {
    title: CONTACT_PAGE_TITLE,
    description: CONTACT_PAGE_DESCRIPTION,
    keywords: [
      "contact ImmoAsk",
      "investissement immobilier",
      "terrains titrés",
      "construction hôtels",
      "promotion immobilière",
      "ImmoAsk",
    ],
    alternates: {
      canonical: CONTACT_PAGE_PATH,
    },
    openGraph: immoAskSocialOpenGraph({
      title,
      description: CONTACT_PAGE_DESCRIPTION,
      url: CONTACT_PAGE_PATH,
    }),
    twitter: immoAskSocialTwitter({
      title,
      description: CONTACT_PAGE_DESCRIPTION,
    }),
    other: immoAskSocialOther({
      "content-language": "fr",
    }),
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function buildContactPageContent() {
  return {
    h1: "Contactez notre équipe",
    intro:
      "Décrivez votre projet immobilier et précisez l'objet de votre demande. Nous vous répondrons dans les meilleurs délais.",
    formTitle: "Formulaire de contact",
    submitLabel: "Envoyer le message",
  }
}
