"use client"

import { useEffect, useState } from "react"

import Modal from "@/components/ui/Modal"
import { useAccountSession } from "@/features/account/useAccountSession"
import Feedback from "@/features/feedbacks/components/Feedback"
import FeedbackIllustration from "@/features/feedbacks/components/FeedbackIllustration"
import type { FeedbackStatus } from "@/features/feedbacks/types"
import PayVisitFee from "@/features/payment/components/PayVisitFee"
import { sendNewVisitNotificationEmail } from "@/lib/api/emails"
import { saveVisitTour } from "@/lib/api/visits"
import { toNewVisitNotificationEmailInput } from "@/features/visit_property_tour/buildNewVisitNotificationEmail"
import VisitPropertyTour from "@/features/visit_property_tour/components/VisitPropertyTour"
import { toSaveVisitTourInput } from "@/features/visit_property_tour/toSaveVisitTourInput"
import type {
  VisitPropertyTourModalProps,
  VisitPropertyTourStep,
  VisitPropertyTourValues,
} from "@/features/visit_property_tour/types"

function visitTourStepLabel(step: VisitPropertyTourStep) {
  if (step === "schedule") {
    return "Étape 1 sur 3 — Planifier la visite"
  }

  if (step === "pay") {
    return "Étape 2 sur 3 — Payer le droit de visite"
  }

  return "Étape 3 sur 3 — Confirmation"
}

export default function VisitPropertyTourModal({
  open,
  onClose,
  property,
  propertyHref,
  visitor,
  submitLabel = "Continuer vers le paiement",
  onSubmit,
  onPaid,
}: VisitPropertyTourModalProps) {
  const { session } = useAccountSession()
  const [step, setStep] = useState<VisitPropertyTourStep>("schedule")
  const [visit, setVisit] = useState<VisitPropertyTourValues | null>(null)
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus | null>(
    null,
  )

  useEffect(() => {
    if (open) {
      return
    }

    setStep("schedule")
    setVisit(null)
    setFeedbackStatus(null)
  }, [open])

  function handleClose() {
    setStep("schedule")
    setVisit(null)
    setFeedbackStatus(null)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      size={step === "feedback" ? "md" : "xl"}
      closeLabel="Fermer la planification de visite"
      className="max-h-[90vh] overflow-y-auto"
    >
      <p className="mb-4 text-sm font-medium text-muted">
        {visitTourStepLabel(step)}
      </p>

      {step === "feedback" && feedbackStatus ? (
        <Feedback
          status={feedbackStatus}
          title={
            feedbackStatus === "success"
              ? "Votre visite est lancée !"
              : "Le paiement n'a pas abouti"
          }
          subtitle={
            feedbackStatus === "success"
              ? "Le paiement a bien été initialisé. L'agent confirmera le créneau et vous retrouvera sur place."
              : "Pas d'inquiétude. Réessayez ou ajustez votre créneau, nous restons avec vous."
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
      ) : step === "schedule" || !visit ? (
        <VisitPropertyTour
          property={property}
          propertyHref={propertyHref}
          defaultDateVisit={visit?.dateVisit}
          defaultHourVisit={visit?.hourVisit}
          submitLabel={submitLabel}
          className="p-0 shadow-none"
          onSubmit={(values) => {
            setVisit(values)
            setStep("pay")
          }}
        />
      ) : (
        <PayVisitFee
          property={property}
          propertyHref={propertyHref}
          visit={visit}
          visitor={visitor}
          visitFee={property.visitFee ?? 0}
          countryCode={property.country}
          onEditVisit={() => setStep("schedule")}
          onPay={async () => {
            const emailInput = toNewVisitNotificationEmailInput({
              visitor,
              visit,
              property,
            })
            const visitInput = toSaveVisitTourInput({
              visit,
              visitor,
              property,
              session,
            })

            await Promise.allSettled([
              visitInput
                ? saveVisitTour(visitInput, session?.accessToken)
                : Promise.resolve(),
              emailInput
                ? sendNewVisitNotificationEmail(emailInput)
                : Promise.resolve(),
            ])
          }}
          onPaid={async (result) => {
            setFeedbackStatus("success")
            setStep("feedback")
            await onSubmit?.(visit)
            await onPaid?.(result, visit)
          }}
          onError={() => {
            setFeedbackStatus("failure")
            setStep("feedback")
          }}
        />
      )}
    </Modal>
  )
}

export { VisitPropertyTourModal }
