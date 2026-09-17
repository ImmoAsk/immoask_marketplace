import type { Metadata } from "next"

import LandlordSubscription from "@/features/subscriptions/components/LandlordSubscription"

export const metadata: Metadata = {
  title: "Formules propriétaires — ImmoAsk Business",
  description:
    "Comparez les offres Essentiel, Sérénité et Elite pour commercialiser, digitaliser ou déléguer entièrement la gestion de vos biens immobiliers avec ImmoAsk Business.",
}

export default function LandlordSubscriptionPage() {
  return <LandlordSubscription />
}
