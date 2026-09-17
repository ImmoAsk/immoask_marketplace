import type { Metadata } from "next"

import type {
  ImmoAskPricingCustomerOption,
  ImmoAskPricingProps,
} from "@/features/pricing/types"
import { toAbsoluteUrl } from "@/lib/seo/site"

export const IMMOASK_PRICING_PATH = "/tarifications"

export const IMMOASK_PRICING_CUSTOMER_OPTIONS: ImmoAskPricingCustomerOption[] = [
  {
    id: "chercheurs",
    label: "Chercheurs de logement ou parcelles",
    description:
      "Formules Standard, Medium et Premium pour accélérer votre recherche.",
  },
  {
    id: "proprietaires",
    label: "Propriétaire de biens immobiliers",
    description:
      "Offres Essentiel, Sérénité et Elite pour commercialiser ou gérer vos biens.",
  },
]

export function buildImmoAskPricing(): Required<
  Pick<ImmoAskPricingProps, "title" | "subtitle" | "defaultCustomerType">
> & {
  customerOptions: ImmoAskPricingCustomerOption[]
} {
  return {
    title: "Tarifications ImmoAsk",
    subtitle:
      "Choisissez votre profil pour comparer les formules adaptées à votre besoin : recherche de logement ou parcelle, ou gestion de votre patrimoine immobilier.",
    defaultCustomerType: "chercheurs",
    customerOptions: IMMOASK_PRICING_CUSTOMER_OPTIONS,
  }
}

export function buildImmoAskPricingMetadata(): Metadata {
  const title = "Tarifications"
  const description =
    "Comparez les tarifs ImmoAsk pour les chercheurs de logement ou parcelles et pour les propriétaires de biens immobiliers. Formules Standard, Medium, Premium, Essentiel, Sérénité et Elite."

  return {
    title,
    description,
    keywords: [
      "tarifications ImmoAsk",
      "abonnement immobilier",
      "chercheurs de logement",
      "propriétaires immobiliers",
      "ImmoAsk Business",
      "formules Standard Medium Premium",
      "Essentiel Sérénité Elite",
    ],
    alternates: {
      canonical: IMMOASK_PRICING_PATH,
    },
    openGraph: {
      title: `${title} | ImmoAsk`,
      description,
      url: toAbsoluteUrl(IMMOASK_PRICING_PATH),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ImmoAsk`,
      description,
    },
  }
}
