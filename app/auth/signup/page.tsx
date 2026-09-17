import type { Metadata } from "next"

import OnboardingProcess from "@/features/onboarding/components/OnboardingProcess"

export const metadata: Metadata = {
  title: "Créer un compte",
  description: "Créez votre compte ImmoAsk pour louer, vendre ou gérer un bien.",
}

export default function CreateAccountPage() {
  return <OnboardingProcess />
}
