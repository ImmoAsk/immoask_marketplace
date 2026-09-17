import type { Metadata } from "next"

import PropertySeekersSubscription from "@/features/subscriptions/components/PropertySeekersSubscription"

export const metadata: Metadata = {
  title: "Formules chercheurs de logement et parcelles",
  description:
    "Comparez les formules Standard, Medium et Premium ImmoAsk pour trouver plus facilement un logement ou sécuriser l'achat d'une parcelle.",
}

export default function PropertySeekersSubscriptionPage() {
  return <PropertySeekersSubscription />
}
