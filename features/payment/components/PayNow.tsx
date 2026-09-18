"use client"

import { useRef, useState } from "react"

import Button from "@/components/ui/Button"
import Spinner from "@/components/ui/Spinner"
import { payWithFedaPay } from "@/lib/api/payments"
import { cn } from "@/lib/cn"
import type { PayNowInput, PayNowProps } from "@/features/payment/types"

function toPayNowInput(props: PayNowInput): PayNowInput {
  return {
    description: props.description,
    amount: props.amount,
    firstname: props.firstname,
    lastname: props.lastname,
    phone: props.phone,
    callback_url: props.callback_url,
    email: props.email,
    ...(props.country_code ? { country_code: props.country_code } : {}),
    ...(props.currency ? { currency: props.currency } : {}),
  }
}

function openPaymentUrl(url: string) {
  const popup = window.open(url, "_blank", "noopener,noreferrer")

  if (!popup) {
    window.location.assign(url)
  }
}

export default function PayNow({
  label = "Payer maintenant",
  className,
  disabled = false,
  onPay,
  onSuccess,
  onError,
  ...input
}: PayNowProps) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const onPayRef = useRef(onPay)
  const onSuccessRef = useRef(onSuccess)
  const onErrorRef = useRef(onError)

  onPayRef.current = onPay
  onSuccessRef.current = onSuccess
  onErrorRef.current = onError

  async function handleClick() {
    if (pending || disabled) {
      return
    }

    setPending(true)
    setError(null)

    try {
      await onPayRef.current?.()
    } catch {
      // Notification emails must not block or fail the payment attempt.
    }

    try {
      const result = await payWithFedaPay(toPayNowInput(input))

      if (!result.success || !result.payment_url) {
        throw new Error(result.message || "Le paiement n'a pas pu être initialisé.")
      }

      // Show success Feedback first, then open the gateway so the user
      // still sees confirmation if the popup is blocked / page navigates.
      try {
        await onSuccessRef.current?.(result)
      } catch {
        // Success UI must not block the payment gateway redirect.
      }

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 300)
      })

      openPaymentUrl(result.payment_url)
    } catch (caught) {
      const nextError =
        caught instanceof Error
          ? caught
          : new Error("Le paiement n'a pas pu être initialisé.")

      setError(nextError.message)
      onErrorRef.current?.(nextError)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className={cn("flex flex-col items-stretch gap-2", className)}>
      <Button
        type="button"
        disabled={disabled || pending}
        aria-busy={pending}
        onClick={handleClick}
      >
        {pending ? (
          <Spinner size="sm" label="Initialisation du paiement" className="text-white" />
        ) : null}
        {label}
      </Button>

      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export { PayNow }
