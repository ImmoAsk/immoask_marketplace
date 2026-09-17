import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { buildPayPropertySeekersSubscriptionPlan } from "@/features/payment/components/buildPayPropertySeekersSubscriptionPlan"
import PayPropertySeekersSubscriptionCheckout from "@/features/payment/components/PayPropertySeekersSubscriptionCheckout"

export const metadata: Metadata = {
  title: "Paiement de l'abonnement chercheur",
  description:
    "Payez votre formule ImmoAsk d'un mois pour les chercheurs de logement et parcelles.",
}

type PropertySeekersSubscriptionPaymentPageProps = {
  searchParams: Promise<{
    plan?: string
  }>
}

export default async function PropertySeekersSubscriptionPaymentPage({
  searchParams,
}: PropertySeekersSubscriptionPaymentPageProps) {
  const { plan: planId } = await searchParams
  const plan = buildPayPropertySeekersSubscriptionPlan(planId ?? "")

  if (!plan) {
    notFound()
  }

  return <PayPropertySeekersSubscriptionCheckout plan={plan} />
}
