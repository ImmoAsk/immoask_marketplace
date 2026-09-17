"use client"

import { useEffect, useMemo, useState } from "react"

import Button from "@/components/ui/Button"
import Modal from "@/components/ui/Modal"
import { resolveSessionUserId } from "@/features/account/session"
import { useAccountSession } from "@/features/account/useAccountSession"
import Feedback from "@/features/feedbacks/components/Feedback"
import FeedbackIllustration from "@/features/feedbacks/components/FeedbackIllustration"
import type { FeedbackStatus } from "@/features/feedbacks/types"
import { toNewDemandeEmailInput } from "@/features/inquiry/buildNewDemandeEmail"
import PropertyInquiryForm, {
  toSendPropertyInquiryInput,
} from "@/features/inquiry/components/PropertyInquiryForm"
import type {
  PropertyInquiryFormInput,
  PropertyInquiryFormValues,
} from "@/features/inquiry/types"
import {
  buildPayPropertySeekersSubscriptionPlan,
  isPropertySeekersPaidPlanId,
} from "@/features/payment/components/buildPayPropertySeekersSubscriptionPlan"
import PayPropertySeekersSubscriptionCheckout from "@/features/payment/components/PayPropertySeekersSubscriptionCheckout"
import type {
  MarketplaceSubscriptionModalProps,
  MarketplaceSubscriptionModalStep,
} from "@/features/properties/types"
import PropertySeekersSubscription from "@/features/subscriptions/components/PropertySeekersSubscription"
import { sendNewDemandeEmail } from "@/lib/api/emails"
import { inquiryApi } from "@/lib/api/inquiries"
import { cn } from "@/lib/cn"

const DEFAULT_PLAN_ID = "medium"

function stepLabel(step: MarketplaceSubscriptionModalStep) {
  if (step === "inquiry") {
    return "Étape 1 sur 3 — Votre demande personnalisée"
  }

  if (step === "plan") {
    return "Étape 2 sur 3 — Choisir une formule"
  }

  if (step === "pay") {
    return "Étape 3 sur 3 — Paiement de l'abonnement"
  }

  return "Confirmation"
}

function toInquiryDefaultValues(
  input: PropertyInquiryFormInput | null,
): Partial<PropertyInquiryFormValues> | undefined {
  if (!input) {
    return undefined
  }

  return {
    categoryValue: input.project_name
      ? `${input.category_inquiry},${input.project_name}`
      : input.category_inquiry,
    final_date: input.final_date,
    description: input.description,
  }
}

export default function MarketplaceSubscriptionModal({
  open,
  onClose,
  callbackUrl,
  className,
  onInquirySuccess,
  onPaid,
}: MarketplaceSubscriptionModalProps) {
  const { session } = useAccountSession()
  const [step, setStep] = useState<MarketplaceSubscriptionModalStep>("inquiry")
  const [inquiry, setInquiry] = useState<PropertyInquiryFormInput | null>(null)
  const [planId, setPlanId] = useState(DEFAULT_PLAN_ID)
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus | null>(
    null,
  )

  const chosenPlan = useMemo(
    () => buildPayPropertySeekersSubscriptionPlan(planId),
    [planId],
  )

  useEffect(() => {
    if (open) {
      return
    }

    setStep("inquiry")
    setInquiry(null)
    setPlanId(DEFAULT_PLAN_ID)
    setFeedbackStatus(null)
  }, [open])

  useEffect(() => {
    if (step === "pay" && !chosenPlan) {
      setStep("plan")
    }
  }, [step, chosenPlan])

  function handleClose() {
    setStep("inquiry")
    setInquiry(null)
    setPlanId(DEFAULT_PLAN_ID)
    setFeedbackStatus(null)
    onClose()
  }

  const resolvedCallbackUrl =
    callbackUrl ??
    (typeof window !== "undefined" ? window.location.href : undefined)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      size={step === "plan" ? "xl" : step === "feedback" ? "md" : "lg"}
      closeLabel="Fermer la demande personnalisée"
      className={cn("max-h-[90vh] overflow-y-auto", className)}
    >
      <p className="mb-4 text-sm font-medium text-muted">{stepLabel(step)}</p>

      {step === "feedback" && feedbackStatus ? (
        <Feedback
          status={feedbackStatus}
          title={
            feedbackStatus === "success"
              ? "Votre demande personnalisée est en bonne voie !"
              : "Le paiement n'a pas abouti"
          }
          subtitle={
            feedbackStatus === "success"
              ? "Le paiement a bien été initialisé. Un conseiller ImmoAsk active votre conciergerie très bientôt."
              : "Vous pouvez réessayer maintenant ou choisir une autre formule."
          }
          image_illustration={
            <FeedbackIllustration status={feedbackStatus} />
          }
          actionLabel={
            feedbackStatus === "success" ? "Terminer" : "Réessayer"
          }
          onAction={
            feedbackStatus === "success"
              ? handleClose
              : () => setStep("pay")
          }
          secondaryActionLabel={
            feedbackStatus === "failure" ? "Fermer" : undefined
          }
          onSecondaryAction={
            feedbackStatus === "failure" ? handleClose : undefined
          }
        />
      ) : step === "inquiry" ? (
        <PropertyInquiryForm
          title=""
          submitLabel="Continuer vers l'abonnement"
          defaultValues={toInquiryDefaultValues(inquiry)}
          className="p-0 shadow-none"
          onSubmit={(input) => {
            setInquiry(input)
            setStep("plan")
          }}
        />
      ) : step === "plan" ? (
        <PropertySeekersSubscription
          embedded
          title="Choisissez votre formule"
          subtitle="Sélectionnez l'abonnement qui accompagnera votre demande personnalisée."
          complementaryConditions={{ title: "", items: [] }}
          selectedColumnId={planId}
          onSelectColumn={setPlanId}
          footer={
            <div className="flex w-full max-w-md flex-col gap-3">
              <Button
                type="button"
                size="lg"
                className="w-full"
                disabled={!isPropertySeekersPaidPlanId(planId)}
                onClick={() => {
                  if (!isPropertySeekersPaidPlanId(planId)) {
                    return
                  }

                  setStep("pay")
                }}
              >
                Continuer vers le paiement
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setStep("inquiry")}
              >
                Modifier la demande
              </Button>
            </div>
          }
        />
      ) : chosenPlan ? (
        <PayPropertySeekersSubscriptionCheckout
          plan={chosenPlan}
          embedded
          callbackUrl={resolvedCallbackUrl}
          onChangePlan={() => setStep("plan")}
          onPay={async () => {
            if (!inquiry) {
              return
            }

            const inquiryInput = toSendPropertyInquiryInput(
              inquiry,
              resolveSessionUserId(session),
            )
            const emailInput = toNewDemandeEmailInput({
              inquiry,
              session,
            })

            const [inquiryResult] = await Promise.allSettled([
              inquiryApi.sendPropertyInquiry(
                inquiryInput,
                session?.accessToken,
              ),
              emailInput
                ? sendNewDemandeEmail(emailInput)
                : Promise.resolve(),
            ])

            if (inquiryResult.status === "fulfilled") {
              onInquirySuccess?.(inquiryResult.value, inquiry)
            }
          }}
          onPaid={(result) => {
            onPaid?.(result)
            setFeedbackStatus("success")
            setStep("feedback")
          }}
          onError={() => {
            setFeedbackStatus("failure")
            setStep("feedback")
          }}
        />
      ) : null}
    </Modal>
  )
}

export { MarketplaceSubscriptionModal }
