import type { Metadata } from "next"

import type { LegalDocumentProps } from "@/features/legal/types"
import {
  immoAskSocialOpenGraph,
  immoAskSocialOther,
  immoAskSocialTwitter,
} from "@/lib/seo/site"

export const LEGAL_NOTICES_PATH = "/legal"

const LEGAL_NOTICES_TITLE = "Mentions légales"
const LEGAL_NOTICES_DESCRIPTION =
  "La plateforme ImmoAsk est éditée et exploitée par Omnisoft Africa, société basée au Togo. L'ensemble des contenus, services et opérations proposés via la plateforme sont soumis aux lois et réglementations en vigueur en République Togolaise."

export function buildLegalNoticesMetadata(): Metadata {
  return {
    title: LEGAL_NOTICES_TITLE,
    description: LEGAL_NOTICES_DESCRIPTION,
    keywords: [
      "mentions légales",
      "ImmoAsk",
      "Omnisoft Africa",
      "immobilier Togo",
    ],
    alternates: {
      canonical: LEGAL_NOTICES_PATH,
    },
    openGraph: immoAskSocialOpenGraph({
      title: `${LEGAL_NOTICES_TITLE} | ImmoAsk`,
      description: LEGAL_NOTICES_DESCRIPTION,
      url: LEGAL_NOTICES_PATH,
    }),
    twitter: immoAskSocialTwitter({
      title: `${LEGAL_NOTICES_TITLE} | ImmoAsk`,
      description: LEGAL_NOTICES_DESCRIPTION,
    }),
    other: immoAskSocialOther({
      "content-language": "fr",
    }),
  }
}

export function buildLegalNotices(): LegalDocumentProps {
  return {
    title: "Mentions légales",
    updatedLabel: "Dernière mise à jour : 11 septembre 2026",
    breadcrumb: [
      { label: "Accueil", href: "/" },
      { label: "Mentions légales" },
    ],
    intro:
      "La plateforme ImmoAsk est éditée et exploitée par Omnisoft Africa, société basée au Togo. L'ensemble des contenus, services et opérations proposés via la plateforme sont soumis aux lois et réglementations en vigueur en République Togolaise.",
    sections: [
      {
        title: "Éditeur de la plateforme",
        paragraphs: [
          "Omnisoft Africa",
          "Société de services numériques",
          "Siège social : Lomé, Togo",
          "Contact : contact@immoask.com",
        ],
      },
      {
        title: "Hébergement",
        items: [
          "Les données et l'API ImmoAsk sont hébergées sur des infrastructures situées en France, au sein des data centers de LWS (Ligne Web Services).",
          "L'application web ImmoAsk est hébergée sur la plateforme Vercel.",
          "L'application mobile est distribuée via le Google Play Store.",
        ],
      },
      {
        title: "Propriété intellectuelle",
        paragraphs: [
          "L'ensemble des éléments composant la plateforme ImmoAsk (textes, images, logos, interface, structure, code, contenus, etc.) est protégé par les lois togolaises et internationales relatives à la propriété intellectuelle. Toute reproduction, distribution, modification ou exploitation non autorisée est strictement interdite.",
        ],
      },
      {
        title: "Responsabilité",
        paragraphs: [
          "ImmoAsk met tout en œuvre pour assurer l'exactitude et la mise à jour des informations diffusées, sans toutefois pouvoir en garantir l'exhaustivité ou l'absence d'erreurs. Omnisoft Africa ne saurait être tenue responsable :",
        ],
        items: [
          "des interruptions de service ou bugs techniques ;",
          "de l'inexactitude des contenus publiés par les utilisateurs ;",
          "de tout dommage direct ou indirect résultant de l'utilisation de la plateforme.",
        ],
      },
      {
        title: "Cookies et traceurs",
        paragraphs: [
          "La plateforme ImmoAsk peut utiliser des cookies et technologies similaires afin d'assurer son bon fonctionnement, de mesurer l'audience, d'améliorer l'expérience utilisateur et de sécuriser les accès. L'utilisateur peut configurer son navigateur pour accepter, refuser ou limiter l'utilisation des cookies. Certaines fonctionnalités peuvent toutefois être dégradées en cas de désactivation totale.",
        ],
      },
      {
        title: "Données personnelles",
        paragraphs: [
          "ImmoAsk collecte et traite des données personnelles conformément aux lois en vigueur au Togo et aux standards internationaux en matière de protection des données. Les informations recueillies dans le cadre de l'utilisation de la plateforme sont utilisées uniquement pour fournir les services proposés, assurer la sécurité des comptes, améliorer les fonctionnalités et respecter les obligations légales. L'utilisateur dispose d'un droit d'accès, de rectification et de suppression, qu'il peut exercer en contactant : contact@immoask.com.",
        ],
      },
      {
        title: "Litiges et juridiction compétente",
        paragraphs: [
          "Les présentes mentions légales sont régies par le droit togolais. En cas de litige relatif à l'interprétation, l'exécution ou la validité des présentes, les parties s'efforceront de trouver une résolution amiable. À défaut d'accord amiable, le différend sera porté devant les juridictions compétentes de la République Togolaise.",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          "Pour toute question relative aux présentes mentions légales ou à la plateforme, vous pouvez nous contacter à l'adresse suivante :",
          "contact@immoask.com",
        ],
      },
    ],
  }
}
