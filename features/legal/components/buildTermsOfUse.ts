import type { Metadata } from "next"

import type { LegalDocumentProps } from "@/features/legal/types"
import {
  immoAskSocialOpenGraph,
  immoAskSocialOther,
  immoAskSocialTwitter,
} from "@/lib/seo/site"

export const TERMS_OF_USE_PATH = "/toc"

const TERMS_OF_USE_TITLE = "Conditions d'utilisation"
const TERMS_OF_USE_DESCRIPTION =
  "Les présentes conditions d'utilisation régissent l'accès et l'usage de la plateforme ImmoAsk, opérée au Togo et destinée aux professionnels immobiliers, propriétaires bailleurs et utilisateurs en recherche de biens immobiliers ou fonciers."

export function buildTermsOfUseMetadata(): Metadata {
  return {
    title: TERMS_OF_USE_TITLE,
    description: TERMS_OF_USE_DESCRIPTION,
    keywords: [
      "conditions d'utilisation",
      "ImmoAsk",
      "immobilier Togo",
      "CGU",
    ],
    alternates: {
      canonical: TERMS_OF_USE_PATH,
    },
    openGraph: immoAskSocialOpenGraph({
      title: `${TERMS_OF_USE_TITLE} | ImmoAsk`,
      description: TERMS_OF_USE_DESCRIPTION,
      url: TERMS_OF_USE_PATH,
    }),
    twitter: immoAskSocialTwitter({
      title: `${TERMS_OF_USE_TITLE} | ImmoAsk`,
      description: TERMS_OF_USE_DESCRIPTION,
    }),
    other: immoAskSocialOther({
      "content-language": "fr",
    }),
  }
}

export function buildTermsOfUse(): LegalDocumentProps {
  return {
    title: "Conditions d'utilisation",
    updatedLabel: "Dernière mise à jour : 11 septembre 2026",
    breadcrumb: [
      { label: "Accueil", href: "/" },
      { label: "Conditions d'utilisation" },
    ],
    intro:
      "Les présentes conditions d'utilisation (ci-après les « Conditions ») régissent l'accès et l'usage de la plateforme ImmoAsk, opérée au Togo et destinée aux professionnels immobiliers, propriétaires bailleurs et utilisateurs en recherche de biens immobiliers ou fonciers. En accédant à la plateforme ou en utilisant les services, l'utilisateur reconnaît avoir lu, compris et accepté sans réserve les Conditions.",
    sections: [
      {
        title: "Objet des services",
        paragraphs: ["La plateforme ImmoAsk met à disposition :"],
        items: [
          "Pour les professionnels immobiliers : un service de marketing de biens immobiliers, ainsi que des services payants de prospection et des abonnements mensuels ou annuels.",
          "Pour les propriétaires : des services payants de prospection et des offres complètes de gestion immobilière pouvant inclure la gestion locative, le suivi administratif et la coordination opérationnelle.",
          "Pour les aspirants locataires de logements et acquéreurs de terrains ou investisseurs immobiliers : un accès aux biens via un abonnement temporaire.",
        ],
      },
      {
        title: "Conditions d'accès et d'inscription",
        paragraphs: [
          "L'accès à certaines fonctionnalités nécessite la création d'un compte utilisateur. L'utilisateur s'engage à fournir des informations exactes, sincères et régulièrement mises à jour. ImmoAsk se réserve le droit de refuser ou de suspendre un compte en cas de non-respect des présentes Conditions.",
        ],
      },
      {
        title: "Modalités financières",
        items: [
          "Professionnels immobiliers : les annonces sont publiées gratuitement. Les services de prospection ainsi que les abonnements sont facturés selon les tarifs en vigueur au moment de la souscription.",
          "Propriétaires : les services de prospection et les contrats de gestion sont facturés conformément aux conditions contractuelles convenues avec ImmoAsk.",
          "Utilisateurs chercheurs : l'abonnement temporaire est payable à l'activation et n'est pas remboursable, sauf disposition contraire imposée par la loi.",
        ],
      },
      {
        title: "Obligations et responsabilités des utilisateurs",
        items: [
          "L'utilisateur s'engage à utiliser la plateforme dans le respect des lois et réglementations en vigueur au Togo.",
          "L'agent immobilier garantit détenir l'autorisation nécessaire pour publier les annonces et mener les opérations immobilières proposées.",
          "Le propriétaire atteste de la conformité juridique des biens mis en location ou en gestion.",
          "Le chercheur de biens s'engage à ne pas faire une utilisation abusive des données et contacts obtenus via la plateforme.",
        ],
      },
      {
        title: "Utilisation conforme de la plateforme",
        paragraphs: ["Il est strictement interdit d'utiliser la plateforme pour :"],
        items: [
          "Publier des informations frauduleuses, inexactes ou trompeuses.",
          "Usurper l'identité d'un tiers ou importer des contenus sans autorisation.",
          "Collecter des données ou tenter d'accéder illégalement aux systèmes d'ImmoAsk.",
        ],
      },
      {
        title: "Données personnelles",
        paragraphs: [
          "ImmoAsk collecte et traite les données personnelles conformément à la législation en vigueur. Les données ne sont en aucun cas revendues à des tiers. L'utilisateur dispose d'un droit d'accès, de rectification et de suppression conformément aux lois applicables.",
        ],
      },
      {
        title: "Propriété intellectuelle",
        paragraphs: [
          "La plateforme, ses contenus, logos, éléments graphiques et technologiques sont protégés par les lois relatives à la propriété intellectuelle. Toute reproduction ou diffusion non autorisée est strictement interdite.",
        ],
      },
      {
        title: "Limitation de responsabilité",
        paragraphs: [
          "ImmoAsk intervient exclusivement en tant qu'intermédiaire. La plateforme ne garantit pas l'exactitude des informations fournies par les utilisateurs et ne peut être tenue responsable des transactions ou litiges entre utilisateurs. Chaque partie reste seule responsable de ses vérifications et obligations légales.",
        ],
      },
      {
        title: "Suspension et résiliation",
        paragraphs: [
          "ImmoAsk se réserve le droit de suspendre ou de résilier tout compte en cas de non-respect des présentes Conditions, de fraude, d'usage abusif ou de tentative d'atteinte à l'intégrité de la plateforme.",
        ],
      },
      {
        title: "Modification des Conditions",
        paragraphs: [
          "Les Conditions peuvent être modifiées à tout moment. Toute modification substantielle sera communiquée aux utilisateurs par tout moyen jugé approprié. L'utilisation continue de la plateforme vaut acceptation des Conditions mises à jour.",
        ],
      },
    ],
  }
}
