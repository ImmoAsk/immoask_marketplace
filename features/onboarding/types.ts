import {
  ACCOUNT_ROLE_IDS,
  type RegisterAccountInput,
} from "@/features/account/types"
import type { FeedbackStatus } from "@/features/feedbacks/types"

export const ONBOARDING_STEPS = [
  "account",
  "subscription",
  "payment",
  "feedback",
] as const

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number]

export const ONBOARDING_PROPERTY_SEEKER_ROLE_ID = String(
  ACCOUNT_ROLE_IDS.locataire,
)

export type OnboardingAccount = RegisterAccountInput

export type OnboardingProcessProps = {
  defaultCountry?: string
  loginHref?: string
  backHref?: string
  completeHref?: string
  className?: string
}

export type OnboardingFeedbackState = {
  status: FeedbackStatus
  source: "account" | "subscription" | "payment"
}
