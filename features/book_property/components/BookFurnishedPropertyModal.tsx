"use client"

import { useEffect, useState } from "react"

import Modal from "@/components/ui/Modal"
import { useAccountSession } from "@/features/account/useAccountSession"
import BookFurnishedProperty from "@/features/book_property/components/BookFurnishedProperty"
import { toNewBookingPropertyEmailInput } from "@/features/book_property/buildNewBookingPropertyEmail"
import { toSaveFurnishedBookingInput } from "@/features/book_property/toSaveFurnishedBookingInput"
import type {
  BookFurnishedPropertyModalProps,
  BookFurnishedPropertyStep,
  BookFurnishedPropertyValues,
} from "@/features/book_property/types"
import Feedback from "@/features/feedbacks/components/Feedback"
import FeedbackIllustration from "@/features/feedbacks/components/FeedbackIllustration"
import type { FeedbackStatus } from "@/features/feedbacks/types"
import PayFurnishedProperty from "@/features/payment/components/PayFurnishedProperty"
import { sendNewBookingPropertyEmail } from "@/lib/api/emails"
import { saveFurnishedBooking } from "@/lib/api/reservations"

function bookFurnishedStepLabel(step: BookFurnishedPropertyStep) {
  if (step === "book") {
    return "Étape 1 sur 3 — Réserver le séjour"
  }

  if (step === "pay") {
    return "Étape 2 sur 3 — Payer la réservation"
  }

  return "Étape 3 sur 3 — Confirmation"
}

export default function BookFurnishedPropertyModal({
  open,
  onClose,
  property,
  propertyHref,
  userRole,
  guest,
  submitLabel = "Continuer vers le paiement",
  onSubmit,
  onPaid,
}: BookFurnishedPropertyModalProps) {
  const { session } = useAccountSession()
  const [step, setStep] = useState<BookFurnishedPropertyStep>("book")
  const [booking, setBooking] = useState<BookFurnishedPropertyValues | null>(
    null,
  )
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus | null>(
    null,
  )

  useEffect(() => {
    if (open) {
      return
    }

    setStep("book")
    setBooking(null)
    setFeedbackStatus(null)
  }, [open])

  function handleClose() {
    setStep("book")
    setBooking(null)
    setFeedbackStatus(null)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      size={step === "feedback" ? "md" : "xl"}
      closeLabel="Fermer la réservation du séjour"
      className="max-h-[90vh] overflow-y-auto"
    >
      <p className="mb-4 text-sm font-medium text-muted">
        {bookFurnishedStepLabel(step)}
      </p>

      {step === "feedback" && feedbackStatus ? (
        <Feedback
          status={feedbackStatus}
          title={
            feedbackStatus === "success"
              ? "Votre séjour est en bonne voie !"
              : "Le paiement n'a pas abouti"
          }
          subtitle={
            feedbackStatus === "success"
              ? "Le paiement a bien été initialisé. Le propriétaire confirmera la disponibilité très bientôt."
              : "Vous pouvez réessayer maintenant ou ajuster votre réservation."
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
      ) : step === "book" || !booking ? (
        <BookFurnishedProperty
          property={property}
          propertyHref={propertyHref}
          userRole={userRole}
          defaultTravelersNumber={booking?.travelersNumber}
          defaultPickUpPlace={booking?.pickUpPlace}
          defaultCheckIn={booking?.checkIn}
          defaultCheckOut={booking?.checkOut}
          submitLabel={submitLabel}
          className="p-0 shadow-none"
          onSubmit={(values) => {
            setBooking(values)
            setStep("pay")
          }}
        />
      ) : (
        <PayFurnishedProperty
          property={property}
          propertyHref={propertyHref}
          booking={booking}
          guest={guest}
          countryCode={property.country}
          onEditBooking={() => setStep("book")}
          onPay={async () => {
            const emailInput = toNewBookingPropertyEmailInput({
              guest,
              booking,
              property,
              propertyHref,
            })
            const bookingInput = toSaveFurnishedBookingInput({
              booking,
              guest,
              property,
              session,
            })

            await Promise.allSettled([
              bookingInput
                ? saveFurnishedBooking(bookingInput, session?.accessToken)
                : Promise.resolve(),
              emailInput
                ? sendNewBookingPropertyEmail(emailInput)
                : Promise.resolve(),
            ])
          }}
          onPaid={async (result) => {
            setFeedbackStatus("success")
            setStep("feedback")
            await onSubmit?.(booking)
            await onPaid?.(result, booking)
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

export { BookFurnishedPropertyModal }
