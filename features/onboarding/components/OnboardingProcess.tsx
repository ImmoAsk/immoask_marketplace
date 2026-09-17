"use client"

import { useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import Container from "@/components/ui/Container"
import AccountCreationForm from "@/features/account/components/AccountCreationForm"
import { saveAccountSession, sessionFromRegister } from "@/features/account/session"
import type { RegisterAccountInput } from "@/features/account/types"
import { useAccountSession } from "@/features/account/useAccountSession"
import { accountApi } from "@/lib/api/accounts"
import { sendWelcomeEmail } from "@/lib/api/emails"
import Feedback from "@/features/feedbacks/components/Feedback"
import FeedbackIllustration from "@/features/feedbacks/components/FeedbackIllustration"
import { buildPayPropertySeekersSubscriptionPlan } from "@/features/payment/components/buildPayPropertySeekersSubscriptionPlan"
import PayPropertySeekersSubscriptionPlan from "@/features/payment/components/PayPropertySeekersSubscriptionPlan"
import { toPayVisitFeeVisitor } from "@/features/payment/components/toPayVisitFeeVisitor"
import type { PayPropertySeekersSubscriptionSubscriber } from "@/features/payment/types"
import { PROPERTY_SEEKERS_SUBSCRIPTION_COLUMNS } from "@/features/subscriptions/components/buildPropertySeekersSubscription"
import PropertySeekersSubscription from "@/features/subscriptions/components/PropertySeekersSubscription"
import { AUTH_SIGNIN_PATH } from "@/lib/routing/auth"
import { toAbsoluteUrl } from "@/lib/seo/site"
import { cn } from "@/lib/cn"
import {
  ONBOARDING_PROPERTY_SEEKER_ROLE_ID,
  type OnboardingAccount,
  type OnboardingFeedbackState,
  type OnboardingProcessProps,
  type OnboardingStep,
} from "@/features/onboarding/types"

const DEFAULT_PLAN_ID = PROPERTY_SEEKERS_SUBSCRIPTION_COLUMNS[0]?.id ?? "standard"

function welcomeUserName(name: string) {
  return name.trim().split(/\s+/).filter(Boolean)[0] || "Client"
}

function sendOnboardingWelcomeEmail(input: OnboardingAccount) {
  const to = input.email.trim()

  if (!to) {
    return
  }

  void sendWelcomeEmail({
    to,
    userName: welcomeUserName(input.name),
    subject: "Bienvenue sur ImmoAsk",
  }).catch(() => {
    // Welcome email must not block onboarding.
  })
}

function isPropertySeekerRole(userRole: string | number | null | undefined) {
  return String(userRole ?? "") === ONBOARDING_PROPERTY_SEEKER_ROLE_ID
}

function toOnboardingSubscriber(
  account: OnboardingAccount | null,
): PayPropertySeekersSubscriptionSubscriber | null {
  const name = account?.name.trim() || ""
  const email = account?.email.trim() || ""
  const phone = account?.phone.trim() || ""
  const parts = name.split(/\s+/).filter(Boolean)
  const firstname = parts[0] ?? ""
  const lastname = parts.slice(1).join(" ") || firstname

  if (!name && !email && !phone) {
    return null
  }

  return {
    name: name || [firstname, lastname].filter(Boolean).join(" "),
    firstname,
    lastname,
    email,
    phone,
  }
}

function stepLabel(step: OnboardingStep, isSeeker: boolean) {
  if (step === "account") {
    return "Étape 1 — Créer votre compte"
  }

  if (step === "subscription") {
    return "Étape 2 sur 3 — Choisir votre formule"
  }

  if (step === "payment") {
    return "Étape 3 sur 3 — Payer l'abonnement"
  }

  return isSeeker
    ? "Étape 3 sur 3 — Confirmation"
    : "Étape 2 sur 2 — Confirmation"
}

function OnboardingFeedback({
  feedback,
  selectedPlanId,
  onAction,
  onChangePlan,
}: {
  feedback: OnboardingFeedbackState
  selectedPlanId: string
  onAction: () => void
  onChangePlan: () => void
}) {
  const copy = feedbackCopy(feedback, selectedPlanId)

  return (
    <Container className="max-w-xl">
      <div className="rounded-2xl bg-white p-5 shadow-card sm:p-8">
        <Feedback
          status={feedback.status}
          title={copy.title}
          subtitle={copy.subtitle}
          image_illustration={<FeedbackIllustration status={feedback.status} />}
          actionLabel={copy.actionLabel}
          onAction={onAction}
          secondaryActionLabel={copy.secondaryActionLabel}
          onSecondaryAction={
            feedback.status === "failure" ? onChangePlan : undefined
          }
        />
      </div>
    </Container>
  )
}

function feedbackCopy(
  feedback: OnboardingFeedbackState,
  selectedPlanId: string,
) {
  if (feedback.status === "failure") {
    return {
      title: "Le paiement n'a pas abouti",
      subtitle:
        "Pas d'inquiétude. Réessayez le paiement ou choisissez une autre formule.",
      actionLabel: "Réessayer",
      secondaryActionLabel: "Changer de formule",
    }
  }

  if (feedback.source === "subscription" && selectedPlanId === DEFAULT_PLAN_ID) {
    return {
      title: "Votre compte est prêt",
      subtitle:
        "Vous restez sur la formule Standard. Vous pouvez dès maintenant rechercher un logement ou une parcelle sur ImmoAsk.",
      actionLabel: "Terminer",
    }
  }

  if (feedback.source === "payment") {
    return {
      title: "Votre abonnement est lancé",
      subtitle:
        "Le paiement a bien été initialisé. Votre formule sera active dès confirmation.",
      actionLabel: "Terminer",
    }
  }

  return {
    title: "Votre compte est créé",
    subtitle: "Vous pouvez maintenant utiliser ImmoAsk selon votre profil.",
    actionLabel: "Terminer",
  }
}

export default function OnboardingProcess({
  defaultCountry = "TG",
  loginHref = AUTH_SIGNIN_PATH,
  backHref = "/",
  completeHref = "/",
  className,
}: OnboardingProcessProps) {
  const router = useRouter()
  const { session } = useAccountSession()
  const [step, setStep] = useState<OnboardingStep>("account")
  const [userRole, setUserRole] = useState("")
  const [account, setAccount] = useState<OnboardingAccount | null>(null)
  const [selectedPlanId, setSelectedPlanId] = useState(DEFAULT_PLAN_ID)
  const [feedback, setFeedback] = useState<OnboardingFeedbackState | null>(null)
  const [registered, setRegistered] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const advancingPlanRef = useRef(false)

  const isSeeker = isPropertySeekerRole(userRole || account?.userRole)
  const paidPlan = useMemo(
    () => buildPayPropertySeekersSubscriptionPlan(selectedPlanId),
    [selectedPlanId],
  )
  const subscriber =
    toPayVisitFeeVisitor(session) ?? toOnboardingSubscriber(account)

  function finish() {
    router.push(completeHref)
  }

  async function registerAccount(input: OnboardingAccount) {
    if (registered) {
      return true
    }

    setRegistering(true)
    setRegisterError(null)

    try {
      const result = await accountApi.registerAccount(input)
      const nextSession = sessionFromRegister(result, input)

      if (nextSession) {
        saveAccountSession(nextSession)
      }

      setRegistered(true)
      return true
    } catch (error) {
      setRegisterError(
        error instanceof Error
          ? error.message
          : "La création du compte a échoué. Réessayez.",
      )
      return false
    } finally {
      setRegistering(false)
    }
  }

  function handleAccountContinue(input: RegisterAccountInput) {
    const nextAccount: OnboardingAccount = {
      ...input,
      userRole: String(input.userRole),
    }

    setUserRole(String(nextAccount.userRole))
    setAccount(nextAccount)
    setSelectedPlanId(DEFAULT_PLAN_ID)
    setFeedback(null)
    setRegisterError(null)
    sendOnboardingWelcomeEmail(nextAccount)

    if (isPropertySeekerRole(nextAccount.userRole)) {
      setStep("subscription")
      return
    }

    void (async () => {
      const created = await registerAccount(nextAccount)

      if (!created) {
        return
      }

      setFeedback({ status: "success", source: "account" })
      setStep("feedback")
    })()
  }

  async function handleSelectPlan(planId: string) {
    if (advancingPlanRef.current || registering) {
      return
    }

    if (!account) {
      setStep("account")
      return
    }

    advancingPlanRef.current = true
    setSelectedPlanId(planId)

    const created = await registerAccount(account)

    if (!created) {
      advancingPlanRef.current = false
      return
    }

    if (planId === DEFAULT_PLAN_ID) {
      setFeedback({ status: "success", source: "subscription" })
      setStep("feedback")
      return
    }

    setStep("payment")
  }

  function handleFeedbackAction() {
    if (feedback?.status === "failure") {
      setStep("payment")
      return
    }

    finish()
  }

  return (
    <div className={cn("bg-surface py-6 sm:py-10", className)}>
      <Container>
        <p className="mb-4 text-center text-sm font-medium text-muted">
          {stepLabel(step, isSeeker)}
        </p>
      </Container>

      {step === "account" ? (
        <Container>
          {registerError ? (
            <p role="alert" className="mb-4 rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger">
              {registerError}
            </p>
          ) : null}
          <AccountCreationForm
            defaultCountry={defaultCountry}
            loginHref={loginHref}
            backHref={backHref}
            submitLabel={registering ? "Création du compte..." : "Continuer"}
            redirectOnSuccess={false}
            registerOnSubmit={false}
            onUserRoleChange={setUserRole}
            onContinue={handleAccountContinue}
          />
        </Container>
      ) : null}

      {step === "subscription" ? (
        <>
          {registerError ? (
            <Container className="max-w-2xl pb-4">
              <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger">
                {registerError}
              </p>
            </Container>
          ) : null}
          <PropertySeekersSubscription
            selectedColumnId={selectedPlanId}
            onSelectColumn={(planId) => {
              void handleSelectPlan(planId)
            }}
            footer={
              registering ? (
                <p className="text-sm font-medium text-muted">
                  Création du compte...
                </p>
              ) : undefined
            }
          />
        </>
      ) : null}

      {step === "payment" && paidPlan ? (
        <Container className="max-w-2xl">
          <PayPropertySeekersSubscriptionPlan
            plan={paidPlan}
            subscriber={subscriber}
            callbackUrl={toAbsoluteUrl(completeHref)}
            onChangePlan={() => {
              advancingPlanRef.current = false
              setStep("subscription")
            }}
            onPaid={() => {
              setFeedback({ status: "success", source: "payment" })
              setStep("feedback")
            }}
            onError={() => {
              setFeedback({ status: "failure", source: "payment" })
              setStep("feedback")
            }}
          />
        </Container>
      ) : null}

      {step === "feedback" && feedback ? (
        <OnboardingFeedback
          feedback={feedback}
          selectedPlanId={selectedPlanId}
          onAction={handleFeedbackAction}
          onChangePlan={() => {
            advancingPlanRef.current = false
            setStep("subscription")
          }}
        />
      ) : null}
    </div>
  )
}

export { OnboardingProcess }
