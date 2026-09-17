import type {
  MarketplaceSubscriptionFeature,
  MarketplaceSubscriptionPlan,
  MarketplaceSubscriptionProps,
  Property,
} from "@/features/properties/types"

const CITY_LABELS: Record<string, string> = {
  lome: "Lomé",
}

export const DEFAULT_MARKETPLACE_SUBSCRIPTION_FEATURES: MarketplaceSubscriptionFeature[] =
  [
    {
      icon: "agents",
      title: "Jusqu'à 5 agents immobiliers simultanément",
      description:
        "Votre requête prospectée en direct par 5 agents immobiliers certifiés",
    },
    {
      icon: "assistant",
      title: "Support personnalisé",
      description: "Un support personnalisé pour vous aider à trouver votre bien",
    },
    {
      icon: "vip",
      title: "Abonnement VIP mensuel",
      description: "Accès coupe-file, visites illimitées et négociation garantie",
    },
  ]

export const DEFAULT_MARKETPLACE_SUBSCRIPTION_PLANS: MarketplaceSubscriptionPlan[] =
  [
    {
      id: "vip-mensuel",
      name: "VIP mensuel",
      priceLabel: "25 000 XOF",
      periodLabel: "/ mois",
      description: "Accès coupe-file, visites illimitées et négociation garantie",
      highlighted: true,
    },
    {
      id: "conciergerie",
      name: "Conciergerie 7j/7",
      priceLabel: "49 000 XOF",
      periodLabel: "/ mois",
      description:
        "11 agents simultanés, Doodoo et un conseiller dédié sur votre recherche",
    },
  ]

function toCityLabel(city?: string) {
  const value = city?.trim()
  if (!value) {
    return "Lomé"
  }

  return CITY_LABELS[value.toLowerCase()] ?? value
}

export function buildMarketplaceSubscription(
  property: Property,
): MarketplaceSubscriptionProps {
  const city = toCityLabel(property.cityName)

  return {
    badgeLabel: "Service sur-mesure & urgence",
    title: "Une demande immobilière très personnalisée et urgente ?",
    description: `Bénéficiez d'une force de recherche exclusive sur ${city} avec notre service de demande immobilière urgente et personnalisée.`,
    features: DEFAULT_MARKETPLACE_SUBSCRIPTION_FEATURES,
    ctaLabel: "Lancer ma demande personnalisée",
    reassuranceLabel: "Sans engagement • Réponse garantie en moins d'1h",
    plans: DEFAULT_MARKETPLACE_SUBSCRIPTION_PLANS,
    modalTitle: "Choisir votre abonnement pour une demande immobilière urgente et personnalisée",
    modalDescription:
      "Activez le service de demande immobilière urgente et personnalisée ImmoAsk pour lancer votre demande personnalisée et urgente.",
  }
}
