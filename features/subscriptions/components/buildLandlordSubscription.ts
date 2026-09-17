import type {
  TemplateSubscriptionColumn,
  TemplateSubscriptionComplementaryConditions,
  TemplateSubscriptionProps,
} from "@/features/subscriptions/types"

export const LANDLORD_SUBSCRIPTION_COLUMNS: TemplateSubscriptionColumn[] = [
  {
    id: "essentiel",
    lightTitle: "Essentiel",
    namePricing:
      "Votre bien est vacant ? Nous vous aidons à trouver votre prochain locataire.",
    subscription_amount: "0 FCFA",
    subscription_amount_xof: "d'abonnement",
    ctaLabel: "Choisir Essentiel",
    ctaHref: "/lister-une-propriete",
    salesPoints: [
      {
        label:
          "L'offre Essentiel est conçue pour les propriétaires qui souhaitent commercialiser leurs biens lorsqu'ils sont vacants, sans s'engager dans une gestion locative complète.",
        variant: "intro",
      },
      {
        label: "Vous bénéficiez de :",
        variant: "heading",
      },
      "Publication gratuite de votre première annonce sur ImmoAsk.",
      "Assistance marketing Niveau 1 pour améliorer la visibilité de votre bien.",
      "Diffusion de votre annonce auprès de la communauté ImmoAsk.",
      "Mobilisation de notre réseau d'agents immobiliers partenaires pour rechercher des locataires potentiels.",
      "Utilisation de nos outils et technologies pour faciliter la prospection et la mise en relation avec des candidats locataires.",
      "50 % d'un mois de loyer lorsque la mise en location est réalisée grâce à ImmoAsk, selon les conditions applicables.",
      {
        label: "Idéal pour",
        variant: "heading",
      },
      {
        label:
          "Les propriétaires qui gèrent eux-mêmes leurs biens, mais qui ont besoin d'aide lorsqu'un logement devient vacant.",
        variant: "note",
      },
      {
        label:
          "Vous gérez votre bien. ImmoAsk vous aide à trouver votre prochain locataire.",
        variant: "note",
      },
    ],
  },
  {
    id: "serenite",
    lightTitle: "Sérénité",
    namePricing:
      "Vous gérez vous-même. ImmoAsk vous donne les outils pour le faire simplement.",
    subscription_amount: "4,9 %",
    subscription_amount_xof: "des encaissements bruts",
    highlighted: true,
    ctaLabel: "Choisir Sérénité",
    ctaHref: "/abonnements/proprietaires/paiement?plan=serenite",
    salesPoints: [
      {
        label: "De 1 à 50 contrats de location",
        variant: "intro",
      },
      {
        label:
          "Fini les fichiers Excel dispersés, les échanges WhatsApp difficiles à suivre et les documents papier. Avec ImmoAsk Business, vous disposez d'un espace centralisé pour gérer vous-même votre activité locative.",
        variant: "note",
      },
      {
        label: "Tout ce qu'il vous faut pour gérer :",
        variant: "heading",
      },
      "Gestion centralisée de vos biens immobiliers et contrats de location.",
      "Suivi et encaissement des loyers depuis une plateforme unique.",
      "Automatisation du suivi des paiements et des échéances.",
      "Notifications et alertes via les différents canaux disponibles.",
      "Création et gestion de vos contrats de location.",
      "Accès illimité aux outils de gestion des contrats.",
      "Suivi des informations financières de chaque bien.",
      "Tableaux de bord pour suivre vos revenus et encaissements.",
      "Assistance marketing Niveau 2.",
      "Gestion et suivi des états des lieux.",
      "Outils de suivi permettant de conserver l'historique des opérations liées à vos biens.",
      {
        label: "Votre avantage",
        variant: "heading",
      },
      {
        label: "Bye-bye Excel, WhatsApp et les dossiers papier.",
        variant: "note",
      },
      {
        label:
          "Même depuis l'étranger, vous pouvez suivre vos biens, vos contrats, vos loyers et vos opérations depuis un seul espace. Vous restez le gestionnaire de votre patrimoine ; ImmoAsk Business vous fournit la technologie pour gagner du temps et réduire les tâches administratives.",
        variant: "note",
      },
      {
        label: "Idéal pour",
        variant: "heading",
      },
      {
        label: "Les propriétaires de la diaspora.",
        variant: "note",
      },
      {
        label: "Les investisseurs immobiliers.",
        variant: "note",
      },
      {
        label: "Les propriétaires très occupés.",
        variant: "note",
      },
      {
        label:
          "Les personnes qui souhaitent garder la gestion de leurs biens tout en la digitalisant.",
        variant: "note",
      },
      {
        label: "Vous gardez le contrôle. ImmoAsk vous donne les outils.",
        variant: "note",
      },
    ],
  },
  {
    id: "elite",
    lightTitle: "Elite",
    namePricing:
      "Vous ne voulez plus gérer ? Nous nous en occupons pour vous.",
    subscription_amount: "Sur mesure",
    subscription_amount_xof: "Contactez-nous",
    ctaLabel: "Contactez-nous",
    ctaHref: "/contact",
    salesPoints: [
      {
        label: "Gestion immobilière entièrement déléguée",
        variant: "intro",
      },
      {
        label:
          "L'offre Elite est destinée aux propriétaires qui souhaitent déléguer totalement la gestion de leurs biens et ne plus avoir à gérer au quotidien les locataires, les loyers, les maintenances et les différentes opérations immobilières.",
        variant: "note",
      },
      {
        label: "Tout ce qui est inclus dans Sérénité, avec en plus :",
        variant: "heading",
      },
      "Gestion immobilière dédiée et personnalisée.",
      "Gestion opérationnelle de vos biens et de vos contrats.",
      "Suivi des locataires et des principales opérations locatives.",
      "Suivi des loyers et des encaissements.",
      "Gestion et suivi des états des lieux.",
      "Coordination des interventions de maintenance immobilière.",
      "Suivi des prestataires intervenant sur vos biens.",
      "Coordination des petites rénovations et réparations.",
      "Accompagnement dans le recouvrement des impayés.",
      "Assistance dans la gestion des conflits locatifs mineurs.",
      "Suivi régulier de l'état et de l'activité de vos biens.",
      "Notifications et reporting pour vous permettre de rester informé, même à distance.",
      "Mobilisation de nos équipes, agents partenaires et technologies selon les besoins de votre patrimoine.",
      {
        label: "Votre avantage",
        variant: "heading",
      },
      {
        label:
          "Vous n'avez plus besoin de gérer les opérations quotidiennes. ImmoAsk devient votre relais local pour votre patrimoine immobilier.",
        variant: "note",
      },
      {
        label:
          "Vous restez propriétaire et gardez la visibilité sur vos biens, tandis que nous nous occupons de leur gestion opérationnelle.",
        variant: "note",
      },
      {
        label: "Idéal pour",
        variant: "heading",
      },
      {
        label: "Les propriétaires vivant à l'étranger.",
        variant: "note",
      },
      {
        label:
          "Les propriétaires qui ne résident pas dans la ville où se trouvent leurs biens.",
        variant: "note",
      },
      {
        label: "Les investisseurs disposant de plusieurs propriétés.",
        variant: "note",
      },
      {
        label: "Les dirigeants et professionnels qui manquent de temps.",
        variant: "note",
      },
      {
        label:
          "Les propriétaires qui souhaitent déléguer complètement la gestion de leur patrimoine.",
        variant: "note",
      },
      {
        label: "Vous possédez le patrimoine. Nous nous occupons du quotidien.",
        variant: "note",
      },
    ],
  },
]

export const LANDLORD_COMPLEMENTARY_CONDITIONS: TemplateSubscriptionComplementaryConditions =
  {
    title: "Pourquoi ImmoAsk Business ?",
    items: [
      {
        title: "Votre patrimoine reste sous contrôle, où que vous soyez",
        paragraphs: [
          "Suivez vos biens depuis l'étranger ou depuis une autre ville sans devoir être physiquement présent pour chaque opération.",
        ],
      },
      {
        title: "Une seule plateforme",
        paragraphs: [
          "Centralisez vos biens, contrats, loyers, locataires et opérations au même endroit.",
        ],
      },
      {
        title: "La technologie au service de votre patrimoine",
        paragraphs: [
          "Automatisation, notifications, tableaux de bord et outils intelligents vous permettent de réduire les tâches répétitives.",
        ],
      },
      {
        title:
          "La technologie quand vous voulez gérer vous-même. L'humain quand vous voulez déléguer.",
        paragraphs: [
          "Avec ImmoAsk Business, vous pouvez commencer par gérer vous-même, puis évoluer progressivement vers une gestion entièrement déléguée.",
          "Votre patrimoine évolue. Votre niveau de délégation aussi.",
        ],
      },
    ],
  }

export function buildLandlordSubscription(): TemplateSubscriptionProps {
  return {
    title: "Gérez vos biens immobiliers, même à distance",
    subtitle:
      "Vous vivez à l'étranger ? Vous êtes dans une autre ville ? Vous êtes très occupé et n'avez pas le temps de suivre quotidiennement vos biens ? Avec ImmoAsk Business, choisissez simplement le niveau d'accompagnement qui vous convient : trouver un locataire, gérer vous-même avec nos outils, ou nous déléguer toute la gestion.",
    columns: LANDLORD_SUBSCRIPTION_COLUMNS,
    complementaryConditions: LANDLORD_COMPLEMENTARY_CONDITIONS,
  }
}
