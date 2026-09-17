import type { Metadata } from "next"

import type { ListingPageContent } from "./types"
import {
  immoAskSocialOpenGraph,
  immoAskSocialOther,
  immoAskSocialTwitter,
} from "@/lib/seo/site"

export const LISTING_PAGE_PATH = "/listing"

export const LISTING_PAGE_TITLE =
  "Publier un bien immobilier à louer ou à vendre | ImmoAsk"

export const LISTING_PAGE_DESCRIPTION =
  "Publiez votre appartement, villa, terrain, bureau ou local commercial sur ImmoAsk. Trouvez des locataires ou acquéreurs grâce à notre application mobile et notre communauté immobilière."

export const LISTING_PAGE_H1 =
  "Publiez votre bien immobilier sur ImmoAsk depuis notre application mobile"

export const LISTING_CTA_LABEL =
  "Lister un bien immobilier via l'appli mobile"

export const LISTING_APP_HREF = "https://bit.ly/immoask-mobile-android"

export function buildListingPageMetadata(): Metadata {
  return {
    title: {
      absolute: LISTING_PAGE_TITLE,
    },
    description: LISTING_PAGE_DESCRIPTION,
    keywords: [
      "publier bien immobilier",
      "mettre en location",
      "mettre en vente",
      "annonce immobilière",
      "application ImmoAsk",
      "louer appartement Lomé",
      "vendre terrain Togo",
      "ImmoAsk",
    ],
    alternates: {
      canonical: LISTING_PAGE_PATH,
    },
    openGraph: immoAskSocialOpenGraph({
      title: LISTING_PAGE_TITLE,
      description: LISTING_PAGE_DESCRIPTION,
      url: LISTING_PAGE_PATH,
    }),
    twitter: immoAskSocialTwitter({
      title: LISTING_PAGE_TITLE,
      description: LISTING_PAGE_DESCRIPTION,
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

export function buildListingPageContent(): ListingPageContent {
  return {
    h1: LISTING_PAGE_H1,
    introTitle: "Vous souhaitez mettre un bien en location ou en vente ?",
    introParagraphs: [
      [
        {
          text: "Appartement, villa, maison, chambre-salon, appartement meublé, bureau, local commercial ou terrain : publiez votre bien immobilier sur ImmoAsk et présentez-le à une communauté de professionnels de l'immobilier et de chercheurs de logements.",
          emphasis: true,
        },
      ],
      [
        { text: "Que vous soyez " },
        {
          text: "propriétaire, bailleur, vendeur ou investisseur immobilier",
          emphasis: true,
        },
        {
          text: ", vous pouvez mettre votre bien en ligne simplement depuis l'application mobile ImmoAsk.",
        },
      ],
    ],
    heroIllustration: {
      id: "hero",
      alt: "Illustration d'une publication immobilière depuis l'application mobile ImmoAsk",
    },
    cta: {
      label: LISTING_CTA_LABEL,
      href: LISTING_APP_HREF,
    },
    sections: [
      {
        id: "types-de-biens",
        title: "Quel bien souhaitez-vous mettre en location ou en vente ?",
        illustration: {
          id: "types-de-biens",
          alt: "Illustration des différents types de biens immobiliers publiables sur ImmoAsk",
        },
        paragraphs: [
          "Vous pouvez publier différents types de biens immobiliers :",
        ],
        items: [
          "Appartement",
          "Appartement meublé",
          "Villa",
          "Maison",
          "Chambre-salon",
          "Studio",
          "Bureau",
          "Local commercial",
          "Terrain",
          "Immeuble",
          "Et bien d'autres types de propriétés.",
        ],
        closingParagraphs: [
          [
            { text: "Indiquez simplement " },
            {
              text: "le type de bien, sa localisation, son prix, ses caractéristiques et ses photos",
              emphasis: true,
            },
            { text: "." },
          ],
          "Notre plateforme vous accompagne pour structurer votre annonce et la rendre facilement compréhensible par les personnes à la recherche d'un bien immobilier.",
        ],
      },
      {
        id: "communaute",
        title: "Votre bien peut être présenté à notre communauté immobilière",
        illustration: {
          id: "communaute",
          alt: "Illustration de la communauté d'agents et chercheurs immobiliers ImmoAsk",
        },
        paragraphs: [
          [
            { text: "ImmoAsk développe une communauté de " },
            {
              text: "plus de 300 agents immobiliers et professionnels de l'immobilier",
              emphasis: true,
            },
            {
              text: " qui peuvent rechercher et proposer des biens correspondant aux besoins de leurs clients.",
            },
          ],
          "En publiant votre bien sur ImmoAsk, vous donnez à votre annonce la possibilité d'être découverte par :",
        ],
        items: [
          "des agents immobiliers partenaires ;",
          "des locataires à la recherche d'un logement ;",
          "des acquéreurs à la recherche d'un bien ;",
          "des investisseurs immobiliers ;",
          "des personnes recherchant des terrains ou des locaux professionnels.",
        ],
      },
      {
        id: "confiance",
        title: "Déjà des propriétaires et des agents nous font confiance",
        illustration: {
          id: "confiance",
          alt: "Illustration des mises en relation réussies entre propriétaires et chercheurs de biens",
        },
        paragraphs: [
          "La communauté ImmoAsk a déjà contribué à mettre en relation des propriétaires et des chercheurs de biens immobiliers.",
          [
            { text: "À ce jour, " },
            {
              text: "plus de 300 locataires et plus de 150 acquéreurs ont déjà été trouvés pour des propriétaires et des agents immobiliers présents dans notre écosystème.",
              emphasis: true,
            },
          ],
          [
            {
              text: "Ces résultats illustrent la dynamique de notre communauté et notre objectif : ",
            },
            {
              text: "faciliter la rencontre entre l'offre immobilière et la demande.",
              emphasis: true,
            },
          ],
        ],
        note: "Les résultats peuvent varier selon le type de bien, son prix, sa localisation, ses caractéristiques et les conditions du marché.",
      },
      {
        id: "controle",
        title:
          "Votre bien est déjà loué ou vendu ? Vous gardez le contrôle",
        illustration: {
          id: "controle",
          alt: "Illustration du contrôle de disponibilité d'une annonce immobilière",
        },
        paragraphs: [
          "Vous avez trouvé un locataire ou un acquéreur avant qu'ImmoAsk ne vous mette en relation avec un candidat ?",
          "Aucun problème.",
          [
            { text: "Vous pouvez " },
            {
              text: "mettre votre annonce en indisponible",
              emphasis: true,
            },
            {
              text: " depuis votre espace afin d'éviter de continuer à recevoir des demandes concernant un bien qui n'est plus disponible.",
            },
          ],
          "Vous gardez ainsi le contrôle sur la disponibilité de votre bien.",
        ],
      },
      {
        id: "localisation",
        title: "Où se trouve votre bien immobilier ?",
        illustration: {
          id: "localisation",
          alt: "Illustration de la localisation précise d'un bien immobilier sur une carte",
        },
        paragraphs: [
          [
            {
              text: "Indiquez précisément la ",
            },
            {
              text: "ville, le quartier et les informations de localisation",
              emphasis: true,
            },
            { text: " de votre propriété." },
          ],
          [
            { text: "Que votre bien se trouve à " },
            {
              text: "Lomé, Agoè, Adidogomé, Bè-Kpota, Agbalépédo, Vogan ou dans une autre zone couverte par ImmoAsk",
              emphasis: true,
            },
            {
              text: ", renseignez sa localisation directement depuis l'application.",
            },
          ],
          "Une localisation précise permet aux chercheurs et aux professionnels de mieux identifier les biens correspondant à leurs besoins.",
        ],
      },
      {
        id: "doodoo",
        title: "Décrivez votre bien, notre technologie vous accompagne",
        illustration: {
          id: "doodoo",
          alt: "Illustration de Doodoo, l'assistante immobilière intelligente d'ImmoAsk",
        },
        paragraphs: [
          "Vous n'êtes pas un professionnel de l'immobilier et vous ne savez pas comment présenter correctement votre bien ?",
          [
            { text: "Avec " },
            {
              text: "Doodoo, l'assistante immobilière intelligente d'ImmoAsk",
              emphasis: true,
            },
            {
              text: ", vous pouvez fournir les informations essentielles concernant votre propriété et être accompagné dans la préparation de votre annonce.",
            },
          ],
          "Indiquez notamment :",
        ],
        items: [
          "le type de bien ;",
          "sa localisation ;",
          "le nombre de pièces ;",
          "sa superficie ;",
          "son état ;",
          "son prix ;",
          "ses équipements ;",
          "ses conditions de location ou de vente ;",
          "les autres caractéristiques importantes.",
        ],
        closingParagraphs: [
          [
            {
              text: "Doodoo vous accompagne pour transformer ces informations en une présentation immobilière plus claire et structurée.",
              emphasis: true,
            },
          ],
        ],
      },
      {
        id: "pourquoi",
        title: "Pourquoi publier votre bien avec l'application ImmoAsk ?",
        illustration: {
          id: "pourquoi",
          alt: "Illustration des avantages de publier un bien avec l'application ImmoAsk",
        },
        features: [
          {
            title: "Une publication depuis votre téléphone",
            description:
              "Publiez et gérez votre annonce directement depuis l'application mobile.",
          },
          {
            title: "Une communauté immobilière active",
            description:
              "Votre bien peut être découvert par notre réseau de professionnels et par des personnes recherchant activement des biens immobiliers.",
          },
          {
            title: "Une meilleure présentation de votre propriété",
            description:
              "Ajoutez les caractéristiques, le prix, la localisation, les photos et les informations importantes de votre bien.",
          },
          {
            title: "Vous gardez le contrôle",
            description:
              "Vous pouvez modifier les informations de votre annonce et la rendre indisponible lorsque votre bien n'est plus disponible.",
          },
          {
            title: "Une assistance immobilière intelligente",
            description:
              "Utilisez Doodoo pour vous accompagner dans la préparation de votre annonce et dans la présentation de votre bien.",
          },
        ],
      },
      {
        id: "appel-final",
        title:
          "Votre prochain locataire ou acquéreur recherche peut-être déjà votre bien",
        illustration: {
          id: "appel-final",
          alt: "Illustration d'un propriétaire qui donne de la visibilité à son bien immobilier",
        },
        paragraphs: [
          "Ne laissez pas votre propriété rester invisible.",
          [
            {
              text: "Publiez votre appartement, votre villa, votre terrain, votre local commercial ou tout autre bien immobilier sur ImmoAsk et donnez-lui une nouvelle visibilité auprès de notre communauté.",
              emphasis: true,
            },
          ],
          "Téléchargez l'application, renseignez les informations de votre bien et commencez votre mise en ligne.",
        ],
      },
    ],
  }
}
