import {
  AGENT_MARKETPLACE_PLAN_PRICES,
  formatMonthlyUsd,
  formatMonthlyXof,
} from "@/features/subscriptions/pricing"
import type {
  TemplateSubscriptionColumn,
  TemplateSubscriptionComplementaryConditions,
  TemplateSubscriptionProps,
} from "@/features/subscriptions/types"

export const AGENT_MARKETPLACE_SUBSCRIPTION_COLUMNS: TemplateSubscriptionColumn[] =
  [
    {
      id: "just",
      lightTitle: "JUST",
      namePricing:
        "Publiez vos biens gratuitement et commencez à développer votre visibilité.",
      subscription_amount: formatMonthlyUsd(
        AGENT_MARKETPLACE_PLAN_PRICES.just.usd,
      ),
      subscription_amount_xof: formatMonthlyXof(
        AGENT_MARKETPLACE_PLAN_PRICES.just.xof,
      ),
      ctaLabel: "Choisir JUST",
      ctaHref: "/auth/signup",
      salesPoints: [
        {
          label:
            "Une offre conçue pour permettre à tous les professionnels immobiliers de rejoindre ImmoAsk sans abonnement mensuel.",
          variant: "intro",
        },
        {
          label: "Votre offre comprend",
          variant: "heading",
        },
        "Publication illimitée de vos biens immobiliers",
        "Diffusion de vos biens sur les canaux sociaux de ImmoAsk",
        "Visibilité auprès des utilisateurs ImmoAsk",
        "Assistance marketing essentielle",
        "Aucune commission sur vos transactions immobilières avec vos clients",
        "10 % de frais ImmoAsk sur les droits de visite générés via la plateforme",
        "5 % de frais ImmoAsk sur les réservations de logements meublés",
        {
          label: "Idéal pour",
          variant: "heading",
        },
        {
          label:
            "Les professionnels qui souhaitent commencer à utiliser ImmoAsk sans abonnement mensuel.",
          variant: "note",
        },
      ],
    },
    {
      id: "senior",
      lightTitle: "SENIOR",
      namePricing:
        "Développez votre visibilité, votre image professionnelle et votre acquisition de clients.",
      subscription_amount: formatMonthlyUsd(
        AGENT_MARKETPLACE_PLAN_PRICES.senior.usd,
      ),
      subscription_amount_xof: formatMonthlyXof(
        AGENT_MARKETPLACE_PLAN_PRICES.senior.xof,
      ),
      highlighted: true,
      ctaLabel: "Choisir SENIOR",
      ctaHref: "/contact",
      salesPoints: [
        {
          label:
            "Une offre conçue pour les professionnels immobiliers qui souhaitent aller au-delà de la simple publication d'annonces.",
          variant: "intro",
        },
        {
          label: "Tout ce qui est inclus dans JUST, plus :",
          variant: "heading",
        },
        "Notifications multicanales pour rester connecté à vos prospects",
        "Assistance marketing avancée",
        "Page publique dédiée à votre organisation immobilière",
        "Intégration de vos réseaux sociaux",
        "Diffusion de vos biens sur vos réseaux sociaux connectés",
        "Meilleure visibilité de vos biens sur l'écosystème ImmoAsk",
        "Aucune commission sur vos transactions immobilières avec vos clients",
        "5 % de frais ImmoAsk sur les droits de visite générés via la plateforme",
        "4,5 % de frais ImmoAsk sur les réservations de logements meublés",
        {
          label: "Idéal pour",
          variant: "heading",
        },
        {
          label:
            "Les professionnels qui veulent développer leur visibilité et transformer davantage de prospects en clients.",
          variant: "note",
        },
      ],
    },
    {
      id: "business",
      lightTitle: "BUSINESS",
      namePricing:
        "Le professionnel immobilier passe au niveau supérieur avec son propre environnement digital et son assistant IA.",
      subscription_amount: formatMonthlyUsd(
        AGENT_MARKETPLACE_PLAN_PRICES.business.usd,
      ),
      subscription_amount_xof: formatMonthlyXof(
        AGENT_MARKETPLACE_PLAN_PRICES.business.xof,
      ),
      ctaLabel: "Contacter ImmoAsk",
      ctaHref: "/contact",
      salesPoints: [
        {
          label:
            "Une offre conçue pour les agences et professionnels immobiliers qui souhaitent digitaliser, automatiser et professionnaliser leur relation avec leurs clients.",
          variant: "intro",
        },
        {
          label: "Tout ce qui est inclus dans SENIOR, plus :",
          variant: "heading",
        },
        "Site web dédié à votre agence",
        "Site personnalisé à vos couleurs et à votre identité visuelle",
        "Présentation de votre portefeuille immobilier",
        "Votre propre agent IA immobilier connecté à votre portefeuille immobilier",
        "Agent IA disponible pour répondre aux questions de vos prospects",
        "Présentation intelligente de vos biens immobilier",
        "Qualification automatique des prospects",
        "Orientation des prospects qualifiés vers votre équipe",
        "Accompagnement digital et marketing avancé",
        "Aucune commission sur vos transactions immobilières avec vos clients",
        "4 % de frais ImmoAsk sur les droits de visite générés via la plateforme",
        "4 % de frais ImmoAsk sur les réservations de logements meublés",
        {
          label: "Idéal pour",
          variant: "heading",
        },
        {
          label:
            "Les agences qui veulent disposer de leur propre infrastructure digitale et exploiter l'IA pour développer leur activité.",
          variant: "note",
        },
      ],
    },
  ]

export const AGENT_MARKETPLACE_COMPLEMENTARY_CONDITIONS: TemplateSubscriptionComplementaryConditions =
  {
    title: "Publiez. Développez. Automatisez.",
    items: [
      {
        title: "De la publication à l'automatisation",
        paragraphs: [
          "Que vous soyez agent indépendant, gestionnaire ou agence immobilière, ImmoAsk vous accompagne de la simple publication de vos biens jusqu'à la digitalisation et l'automatisation de votre activité.",
        ],
      },
      {
        title: "Des frais clairs et maîtrisés",
        paragraphs: [
          "Aucune commission sur vos transactions immobilières avec vos clients. Les frais ImmoAsk s'appliquent uniquement sur les droits de visite et les réservations de logements meublés générés via la plateforme, selon la formule choisie.",
        ],
      },
      {
        title: "Évoluez à votre rythme",
        paragraphs: [
          "Commencez gratuitement avec JUST, développez votre acquisition avec SENIOR, puis passez à BUSINESS lorsque vous êtes prêt à disposer de votre propre infrastructure digitale et d'un agent IA.",
        ],
      },
    ],
  }

export function buildAgentMarketPlaceSubscription(): TemplateSubscriptionProps {
  return {
    title: "Des outils pour faire grandir votre activité immobilière",
    subtitle:
      "Que vous soyez agent indépendant, gestionnaire ou agence immobilière, ImmoAsk vous accompagne de la simple publication de vos biens jusqu'à la digitalisation et l'automatisation de votre activité. Publiez. Développez. Automatisez.",
    columns: AGENT_MARKETPLACE_SUBSCRIPTION_COLUMNS,
    complementaryConditions: AGENT_MARKETPLACE_COMPLEMENTARY_CONDITIONS,
  }
}
