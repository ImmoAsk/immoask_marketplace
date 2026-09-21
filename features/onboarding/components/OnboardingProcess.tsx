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
import AgentMarketPlaceSubscription from "@/features/subscriptions/components/AgentMarketPlaceSubscription"
import { AGENT_MARKETPLACE_SUBSCRIPTION_COLUMNS } from "@/features/subscriptions/components/buildAgentMarketPlaceSubscription"
import { LANDLORD_SUBSCRIPTION_COLUMNS } from "@/features/subscriptions/components/buildLandlordSubscription"
import { PROPERTY_SEEKERS_SUBSCRIPTION_COLUMNS } from "@/features/subscriptions/components/buildPropertySeekersSubscription"
import LandlordSubscription from "@/features/subscriptions/components/LandlordSubscription"
import PropertySeekersSubscription from "@/features/subscriptions/components/PropertySeekersSubscription"
import { AUTH_SIGNIN_PATH } from "@/lib/routing/auth"
import { toAbsoluteUrl } from "@/lib/seo/site"
import { cn } from "@/lib/cn"
import {
  ONBOARDING_AGENT_ROLE_ID,
  ONBOARDING_LANDLORD_ROLE_ID,
  ONBOARDING_PROPERTY_SEEKER_ROLE_ID,
  type OnboardingAccount,
  type OnboardingFeedbackState,
  type OnboardingProcessProps,
  type OnboardingStep,
} from "@/features/onboarding/types"

const DEFAULT_SEEKER_PLAN_ID =
  PROPERTY_SEEKERS_SUBSCRIPTION_COLUMNS[0]?.id ?? "standard"
const DEFAULT_LANDLORD_PLAN_ID =
  LANDLORD_SUBSCRIPTION_COLUMNS[0]?.id ?? "essentiel"
const DEFAULT_AGENT_PLAN_ID =
  AGENT_MARKETPLACE_SUBSCRIPTION_COLUMNS[0]?.id ?? "just"

const FREE_PLAN_IDS = new Set([
  DEFAULT_SEEKER_PLAN_ID,
  DEFAULT_LANDLORD_PLAN_ID,
  DEFAULT_AGENT_PLAN_ID,
])

const CONTACT_PLAN_IDS = new Set([
  "senior",
  "business",
  "serenite",
  "elite",
])

type OnboardingAudience = "seeker" | "landlord" | "agent"

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

function resolveAudience(
  userRole: string | number | null | undefined,
): OnboardingAudience | null {
  const role = String(userRole ?? "")

  if (role === ONBOARDING_PROPERTY_SEEKER_ROLE_ID) {
    return "seeker"
  }

  if (role === ONBOARDING_LANDLORD_ROLE_ID) {
    return "landlord"
  }

  if (role === ONBOARDING_AGENT_ROLE_ID) {
    return "agent"
  }

  return null
}

function defaultPlanIdForAudience(audience: OnboardingAudience) {
  if (audience === "landlord") {
    return DEFAULT_LANDLORD_PLAN_ID
  }

  if (audience === "agent") {
    return DEFAULT_AGENT_PLAN_ID
  }

  return DEFAULT_SEEKER_PLAN_ID
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

function stepLabel(step: OnboardingStep) {
  if (step === "account") {
    return "Étape 1 sur 3 — Créer votre compte"
  }

  if (step === "subscription") {
    return "Étape 2 sur 3 — Choisir votre formule"
  }

  if (step === "payment") {
    return "Étape 3 sur 3 — Payer l'abonnement"
  }

  return "Étape 3 sur 3 — Confirmation"
}

function OnboardingFeedback({
  feedback,
  selectedPlanId,
  audience,
  onAction,
  onChangePlan,
}: {
  feedback: OnboardingFeedbackState
  selectedPlanId: string
  audience: OnboardingAudience | null
  onAction: () => void
  onChangePlan: () => void
}) {
  const copy = feedbackCopy(feedback, selectedPlanId, audience)

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
  audience: OnboardingAudience | null,
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

  if (feedback.source === "subscription") {
    if (audience === "seeker" && selectedPlanId === DEFAULT_SEEKER_PLAN_ID) {
      return {
        title: "Votre compte est prêt",
        subtitle:
          "Vous êtes sur la formule Standard. Vous pouvez dès maintenant rechercher un logement ou une parcelle sur ImmoAsk.",
        actionLabel: "Terminer",
      }
    }

    if (audience === "landlord" && selectedPlanId === DEFAULT_LANDLORD_PLAN_ID) {
      return {
        title: "Votre compte propriétaire est prêt",
        subtitle:
          "Vous êtes sur la formule Essentiel. Publiez votre bien et commencez à trouver votre prochain locataire.",
        actionLabel: "Terminer",
      }
    }

    if (audience === "landlord" && selectedPlanId === "serenite") {
      return {
        title: "Formule Sérénité sélectionnée",
        subtitle:
          "Votre compte est créé. Contactez ImmoAsk pour activer Sérénité et digitaliser la gestion de vos biens.",
        actionLabel: "Contacter ImmoAsk",
      }
    }

    if (audience === "landlord" && selectedPlanId === "elite") {
      return {
        title: "Formule Elite sélectionnée",
        subtitle:
          "Votre compte est créé. Contactez ImmoAsk pour une gestion immobilière entièrement déléguée.",
        actionLabel: "Contacter ImmoAsk",
      }
    }

    if (audience === "agent" && selectedPlanId === DEFAULT_AGENT_PLAN_ID) {
      return {
        title: "Votre compte professionnel est prêt",
        subtitle:
          "Vous êtes sur la formule JUST. Publiez vos biens gratuitement et développez votre visibilité sur ImmoAsk.",
        actionLabel: "Terminer",
      }
    }

    if (audience === "agent" && selectedPlanId === "senior") {
      return {
        title: "Formule SENIOR sélectionnée",
        subtitle:
          "Votre compte est créé. Contactez ImmoAsk pour activer SENIOR et développer votre acquisition de clients.",
        actionLabel: "Contacter ImmoAsk",
      }
    }

    if (audience === "agent" && selectedPlanId === "business") {
      return {
        title: "Formule BUSINESS sélectionnée",
        subtitle:
          "Votre compte est créé. Contactez ImmoAsk pour digitaliser votre agence avec un environnement dédié et un agent IA.",
        actionLabel: "Contacter ImmoAsk",
      }
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
  const [selectedPlanId, setSelectedPlanId] = useState(DEFAULT_SEEKER_PLAN_ID)
  const [feedback, setFeedback] = useState<OnboardingFeedbackState | null>(null)
  const [registered, setRegistered] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const advancingPlanRef = useRef(false)

  const audience = resolveAudience(userRole || account?.userRole)
  const paidPlan = useMemo(
    () =>
      audience === "seeker"
        ? buildPayPropertySeekersSubscriptionPlan(selectedPlanId)
        : null,
    [audience, selectedPlanId],
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

      sendOnboardingWelcomeEmail(input)
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
    const nextAudience = resolveAudience(nextAccount.userRole)

    setUserRole(String(nextAccount.userRole))
    setAccount(nextAccount)
    setFeedback(null)
    setRegisterError(null)
    setRegistered(false)
    advancingPlanRef.current = false

    if (!nextAudience) {
      setRegisterError(
        "Sélectionnez un profil valide pour continuer vers les formules.",
      )
      return
    }

    setSelectedPlanId(defaultPlanIdForAudience(nextAudience))
    setStep("subscription")
  }

  async function handleSelectPlan(planId: string) {
    if (advancingPlanRef.current || registering) {
      return
    }

    if (!account || !audience) {
      setStep("account")
      return
    }

    advancingPlanRef.current = true
    setSelectedPlanId(planId)
    setRegisterError(null)

    const created = await registerAccount(account)

    if (!created) {
      advancingPlanRef.current = false
      return
    }

    if (FREE_PLAN_IDS.has(planId) || CONTACT_PLAN_IDS.has(planId)) {
      setFeedback({ status: "success", source: "subscription" })
      setStep("feedback")
      return
    }

    if (
      audience === "seeker" &&
      buildPayPropertySeekersSubscriptionPlan(planId)
    ) {
      setStep("payment")
      return
    }

    setFeedback({ status: "success", source: "subscription" })
    setStep("feedback")
  }

  function handleFeedbackAction() {
    if (feedback?.status === "failure") {
      setStep("payment")
      return
    }

    if (
      feedback?.source === "subscription" &&
      CONTACT_PLAN_IDS.has(selectedPlanId)
    ) {
      router.push("/contact")
      return
    }

    finish()
  }

  return (
    <div className={cn("bg-surface py-6 sm:py-10", className)}>
      <Container>
        <p className="mb-4 text-center text-sm font-medium text-muted">
          {stepLabel(step)}
        </p>
      </Container>

      {step === "account" ? (
        <Container>
          {registerError ? (
            <p
              role="alert"
              className="mb-4 rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger"
            >
              {registerError}
            </p>
          ) : null}
          <AccountCreationForm
            defaultCountry={defaultCountry}
            loginHref={loginHref}
            backHref={backHref}
            submitLabel="Continuer"
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
              <p
                role="alert"
                className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger"
              >
                {registerError}
              </p>
            </Container>
          ) : null}

          {audience === "seeker" ? (
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
          ) : null}

          {audience === "landlord" ? (
            <LandlordSubscription
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
          ) : null}

          {audience === "agent" ? (
            <AgentMarketPlaceSubscription
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
          ) : null}
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
          audience={audience}
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
