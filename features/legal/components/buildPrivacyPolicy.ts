import type { Metadata } from "next"

import type { LegalDocumentProps } from "@/features/legal/types"
import {
  immoAskSocialOpenGraph,
  immoAskSocialOther,
  immoAskSocialTwitter,
} from "@/lib/seo/site"

export const PRIVACY_POLICY_PATH = "/privacy"

const PRIVACY_POLICY_TITLE = "Politique de confidentialité"
const PRIVACY_POLICY_DESCRIPTION =
  "La présente politique de confidentialité décrit les modalités selon lesquelles ImmoAsk collecte, utilise, conserve et protège les données à caractère personnel des utilisateurs de la plateforme, opérée depuis le Togo."

export function buildPrivacyPolicyMetadata(): Metadata {
  return {
    title: PRIVACY_POLICY_TITLE,
    description: PRIVACY_POLICY_DESCRIPTION,
    keywords: [
      "politique de confidentialité",
      "protection des données",
      "ImmoAsk",
      "immobilier Togo",
    ],
    alternates: {
      canonical: PRIVACY_POLICY_PATH,
    },
    openGraph: immoAskSocialOpenGraph({
      title: `${PRIVACY_POLICY_TITLE} | ImmoAsk`,
      description: PRIVACY_POLICY_DESCRIPTION,
      url: PRIVACY_POLICY_PATH,
    }),
    twitter: immoAskSocialTwitter({
      title: `${PRIVACY_POLICY_TITLE} | ImmoAsk`,
      description: PRIVACY_POLICY_DESCRIPTION,
    }),
    other: immoAskSocialOther({
      "content-language": "fr",
    }),
  }
}

export function buildPrivacyPolicy(): LegalDocumentProps {
  return {
    title: "Politique de confidentialité",
    updatedLabel: "Dernière mise à jour : 11 septembre 2026",
    breadcrumb: [
      { label: "Accueil", href: "/" },
      { label: "Politique de confidentialité" },
    ],
    intro:
      "La présente politique de confidentialité (ci-après la « Politique ») décrit les modalités selon lesquelles ImmoAsk collecte, utilise, conserve et protège les données à caractère personnel des utilisateurs de la plateforme, opérée depuis le Togo. En accédant ou en utilisant nos services, vous consentez aux pratiques décrites dans cette Politique.",
    sections: [
      {
        title: "Responsable du traitement",
        paragraphs: [
          "Le responsable du traitement des données est ImmoAsk. Pour toute question relative à la protection des données, vous pouvez nous contacter via les coordonnées figurant dans la section « Contact ».",
        ],
      },
      {
        title: "Données collectées",
        paragraphs: [
          "ImmoAsk peut collecter les catégories de données personnelles suivantes :",
        ],
        items: [
          "Identifiants : nom, prénom, adresse e-mail, numéro de téléphone, rôle (agent, propriétaire, chercheur).",
          "Informations professionnelles : nom d'agence, carte professionnelle, statut professionnel.",
          "Données relatives aux biens : adresse, photos, description, documents contractuels.",
          "Données de paiement : informations nécessaires au traitement des paiements (partagées via nos prestataires de paiement).",
          "Données de connexion : adresse IP, journaux d'activité, données de navigation et cookies.",
        ],
      },
      {
        title: "Finalités du traitement",
        paragraphs: ["Les données sont traitées pour les finalités suivantes :"],
        items: [
          "Fournir et améliorer les services de publication, de gestion et de prospection immobilière.",
          "Gérer les comptes utilisateur et sécuriser l'accès à la plateforme.",
          "Traiter les paiements et la facturation.",
          "Communiquer avec les utilisateurs (notifications, messages, support).",
          "Conduire des analyses et statistiques pour optimiser l'expérience utilisateur.",
        ],
      },
      {
        title: "Base juridique",
        paragraphs: [
          "Le traitement des données repose sur les bases juridiques suivantes : l'exécution du contrat, le consentement de l'utilisateur, le respect d'obligations légales et l'intérêt légitime d'ImmoAsk pour la sécurité et l'amélioration du service.",
        ],
      },
      {
        title: "Destinataires des données",
        paragraphs: [
          "Les données peuvent être communiquées aux destinataires suivants :",
        ],
        items: [
          "Prestataires techniques (hébergement, paiements, messagerie) contractuellement liés par des clauses de confidentialité.",
          "Autorités publiques lorsque la communication est requise par la loi.",
          "Autres utilisateurs de la plateforme dans le cadre de la publication d'annonces (par exemple, les informations de contact nécessaires à la prise de contact).",
        ],
      },
      {
        title: "Transferts de données",
        paragraphs: [
          "Si des transferts de données en dehors du Togo sont nécessaires, ImmoAsk prendra les mesures appropriées pour assurer un niveau de protection adéquat, notamment par la conclusion de garanties contractuelles ou en se conformant aux cadres légaux applicables.",
        ],
      },
      {
        title: "Durée de conservation",
        paragraphs: [
          "Les données sont conservées pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées, sauf obligation légale contraire. Les données liées aux comptes inactifs peuvent être archivées ou supprimées conformément à notre politique interne.",
        ],
      },
      {
        title: "Sécurité",
        paragraphs: [
          "ImmoAsk met en œuvre des mesures techniques et organisationnelles adaptées afin de protéger les données personnelles contre la perte, l'altération, l'accès non autorisé ou la divulgation. Toutefois, aucune transmission de données sur internet n'est totalement sécurisée ; l'utilisateur est invité à signaler toute faille ou suspicion de violation.",
        ],
      },
      {
        title: "Droits des personnes",
        paragraphs: [
          "Conformément à la législation applicable, l'utilisateur dispose des droits suivants concernant ses données personnelles :",
        ],
        items: [
          "Droit d'accès : obtenir confirmation et copie des données traitées.",
          "Droit de rectification : demander la correction de données inexactes ou incomplètes.",
          "Droit à l'effacement : demander la suppression des données, sous réserve des obligations légales et des besoins contractuels.",
          "Droit à la limitation du traitement et droit d'opposition.",
          "Droit à la portabilité des données lorsque cela est applicable.",
        ],
        closingParagraphs: [
          "Pour exercer ces droits, contactez-nous via la section « Contact » en indiquant vos nom, adresse e-mail et la demande précise. Nous répondrons dans les délais légaux applicables.",
        ],
      },
      {
        title: "Cookies et technologies similaires",
        paragraphs: [
          "La plateforme utilise des cookies et technologies similaires pour assurer son fonctionnement et analyser l'usage. L'utilisateur peut gérer ses préférences relatives aux cookies via les paramètres de son navigateur ou les outils fournis sur le site.",
        ],
      },
      {
        title: "Sécurité des mineurs",
        paragraphs: [
          "La plateforme n'est pas destinée aux mineurs de moins de 18 ans. Nous demandons aux parents et représentants légaux de ne pas permettre à des mineurs de fournir leurs données personnelles sans autorisation.",
        ],
      },
      {
        title: "Modifications de la Politique",
        paragraphs: [
          "ImmoAsk se réserve le droit de modifier la présente Politique. En cas de modification substantielle, nous en informerons les utilisateurs par tout moyen approprié. L'utilisation continue de la plateforme après modification vaut acceptation de la nouvelle Politique.",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          "Pour toute question relative à la protection des données, l'utilisateur peut contacter ImmoAsk à l'adresse e-mail suivante : contact@immoask.com",
        ],
      },
    ],
  }
}
