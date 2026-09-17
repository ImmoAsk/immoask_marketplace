import {
  PROPERTY_SEEKERS_PLAN_PRICES,
  formatMonthlyUsd,
  formatMonthlyXof,
} from "@/features/subscriptions/pricing"
import type {
  TemplateSubscriptionColumn,
  TemplateSubscriptionComplementaryConditions,
  TemplateSubscriptionProps,
} from "@/features/subscriptions/types"

const AGENT_OWNED_PROPERTY_POINTS = [
  {
    label: "Concernant les biens appartenant à un agent immobilier",
    variant: "heading" as const,
  },
  {
    label:
      "Lorsque le bien immobilier publié sur ImmoAsk appartient directement à un agent immobilier, les conditions et le montant de la commission sont déterminés par cet agent.",
    variant: "note" as const,
  },
  {
    label:
      "ImmoAsk ne fixe pas actuellement les commissions appliquées par les agents immobiliers propriétaires de leurs biens.",
    variant: "note" as const,
  },
]

export const PROPERTY_SEEKERS_SUBSCRIPTION_COLUMNS: TemplateSubscriptionColumn[] =
  [
    {
      id: "standard",
      lightTitle: "Standard",
      namePricing:
        "Pour rechercher gratuitement des biens immobiliers sur ImmoAsk.",
      subscription_amount: formatMonthlyUsd(PROPERTY_SEEKERS_PLAN_PRICES.standard.usd),
      subscription_amount_xof: formatMonthlyXof(
        PROPERTY_SEEKERS_PLAN_PRICES.standard.xof,
      ),
      salesPoints: [
        "Trouvez des offres immobilières à l'aide de filtres avancés.",
        "Accédez à notre Assistante immobilière intelligente pour vous accompagner durant 24h",
      ],
    },
    {
      id: "medium",
      lightTitle: "Medium",
      namePricing:
        "Pour bénéficier d'un accompagnement renforcé et accélérer votre recherche.",
      subscription_amount: formatMonthlyUsd(PROPERTY_SEEKERS_PLAN_PRICES.medium.usd),
      subscription_amount_xof: formatMonthlyXof(
        PROPERTY_SEEKERS_PLAN_PRICES.medium.xof,
      ),
      highlighted: true,
      ctaLabel: "Choisir Medium",
      ctaHref: "/abonnements/chercheurs/paiement?plan=medium",
      salesPoints: [
        "Accédez à notre Assistante immobilière intelligente en illimité pendant 1 mois.",
        "Soumettez votre demande immobilière urgente et personnalisée ",
        "Votre demande immobilière est traitée simultanément par jusqu'à 3 agents immobiliers partenaires.",
        "Recevez des notifications instantanées sur les différents canaux disponibles.",
        "Accédez à la localisation du bien avant la visite, lorsque cette information est disponible.",
        "Bénéficiez d'une réduction de 50 % sur les frais de commission pour les biens publiés directement sur ImmoAsk par un propriétaire.",
        "Bénéficiez de 0 FCFA de frais de visite lorsque le bien est publié directement sur ImmoAsk par un propriétaire.",
        ...AGENT_OWNED_PROPERTY_POINTS,
      ],
    },
    {
      id: "premium",
      lightTitle: "Premium",
      namePricing:
        "Pour une recherche prioritaire avec un accompagnement renforcé.",
      subscription_amount: formatMonthlyUsd(PROPERTY_SEEKERS_PLAN_PRICES.premium.usd),
      subscription_amount_xof: formatMonthlyXof(
        PROPERTY_SEEKERS_PLAN_PRICES.premium.xof,
      ),
      ctaLabel: "Choisir Premium",
      ctaHref: "/abonnements/chercheurs/paiement?plan=premium",
      salesPoints: [
        {
          label:
            "La formule Premium comprend les avantages de la formule Medium, avec un niveau d'accompagnement supérieur :",
          variant: "intro",
        },
        "Votre demande immobilière est traitée simultanément par jusqu'à 5 agents immobiliers partenaires.",
        "Bénéficiez d'une réduction de 75 % sur les frais de commission pour les biens publiés directement sur ImmoAsk par un propriétaire.",
        "Bénéficiez d'une réduction de 10 % sur les frais des trois premières visites lorsque le bien appartient directement à un agent immobilier.",
        ...AGENT_OWNED_PROPERTY_POINTS,
      ],
    },
  ]

export const PROPERTY_SEEKERS_COMPLEMENTARY_CONDITIONS: TemplateSubscriptionComplementaryConditions =
  {
    title: "Conditions complémentaires",
    items: [
      {
        title: "Un abonnement conçu pour accélérer votre recherche",
        paragraphs: [
          "Les frais d'abonnement donnent accès aux fonctionnalités et technologies ImmoAsk conçues pour vous aider à trouver plus rapidement un bien immmobilier correspondant à vos critères.",
          "L'objectif d'ImmoAsk est de vous permettre d'exploiter efficacement la recherche immobilière, l'assistance intelligente et notre réseau d'agents partenaires afin de réduire le temps consacré à votre recherche.",
          "La durée de recherche et le délai de disponibilité d'un bien dépendent toutefois du marché, de vos critères et des offres disponibles. ImmoAsk ne garantit donc pas contractuellement qu'un bien sera trouvé dans un délai précis.",
        ],
      },
      {
        title: "Les commissions des agents immobiliers",
        paragraphs: [
          "ImmoAsk ne partage pas avec le chercheur de logement une partie des commissions versées aux agents immobiliers partenaires.",
          "Toutefois, le chercheur de logement reste libre de négocier directement les conditions et le montant de la commission avec l'agent immobilier, lorsque cela est possible.",
          "Les pratiques et commissions des agents immobiliers peuvent varier selon le bien, l'agent et les conditions de la transaction.",
        ],
      },
      {
        title:
          "Contrôle des frais sur les biens publiés par les propriétaires",
        paragraphs: [
          "Lorsqu'un bien est publié directement par un propriétaire sur ImmoAsk, ImmoAsk contrôle les frais d'assistance et les conditions applicables dans le cadre de ses offres.",
          "Cela permet de proposer aux chercheurs de logement des conditions plus avantageuses sur les biens directement proposés par les propriétaires.",
          "Lorsqu'un bien appartient directement à un agent immobilier, les commissions et certaines conditions commerciales restent sous la responsabilité de cet agent.",
        ],
      },
      {
        title: "Disponibilité des avantages",
        paragraphs: [
          "Les avantages liés aux formules Standard, Medium et Premium sont applicables selon les conditions du bien, du propriétaire, de l'agent immobilier et des services disponibles sur ImmoAsk.",
          "ImmoAsk se réserve le droit de faire évoluer ses offres, ses fonctionnalités et ses conditions commerciales, avec information préalable lorsque cela est requis.",
        ],
      },
    ],
  }

export function buildPropertySeekersSubscription(): TemplateSubscriptionProps {
  return {
    title:
      "Les formules ImmoAsk pour les chercheurs de logement et parcelles",
    subtitle:
      "Trouver plus facilement votre prochain logement et sécuriser l'achat de votre parcelle grâce aux outils de recherche, à l'assistance immobilière intelligente et à notre réseau d'agents immobiliers partenaires.",
    columns: PROPERTY_SEEKERS_SUBSCRIPTION_COLUMNS,
    complementaryConditions: PROPERTY_SEEKERS_COMPLEMENTARY_CONDITIONS,
  }
}
