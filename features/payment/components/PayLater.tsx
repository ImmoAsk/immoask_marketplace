"use client"

import { useRef, useState } from "react"

import Button from "@/components/ui/Button"
import Spinner from "@/components/ui/Spinner"
import { resolveSessionUserId } from "@/features/account/session"
import { useAccountSession } from "@/features/account/useAccountSession"
import type { PayLaterProps } from "@/features/payment/types"
import { savePaymentTransaction } from "@/lib/api/payments"
import { cn } from "@/lib/cn"

const PENDING_TYPE_TRANSACTION = "pending"

export default function PayLater({
  label = "Payer plus tard",
  className,
  disabled = false,
  description,
  montant,
  type_transaction = PENDING_TYPE_TRANSACTION,
  user_id,
  propriete_id,
  proprietaire_id,
  contrat_id,
  email_visitor,
  telephone_visitor,
  fullname_visitor,
  transaction_id,
  onPay,
  onSuccess,
  onError,
}: PayLaterProps) {
  const { session } = useAccountSession()
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
      // Upstream booking/visit/inquiry saves must not block deferred payment.
    }

    try {
      const resolvedUserId = user_id ?? resolveSessionUserId(session)

      if (resolvedUserId == null) {
        throw new Error("Connectez-vous pour enregistrer un paiement différé.")
      }

      const result = await savePaymentTransaction(
        {
          user_id: resolvedUserId,
          description,
          type_transaction,
          montant,
          ...(propriete_id != null ? { propriete_id } : {}),
          ...(proprietaire_id != null ? { proprietaire_id } : {}),
          ...(contrat_id != null ? { contrat_id } : {}),
          ...(email_visitor?.trim()
            ? { email_visitor: email_visitor.trim() }
            : {}),
          ...(telephone_visitor?.trim()
            ? { telephone_visitor: telephone_visitor.trim() }
            : {}),
          ...(fullname_visitor?.trim()
            ? { fullname_visitor: fullname_visitor.trim() }
            : {}),
          transaction_id: transaction_id ?? 0,
        },
        session?.accessToken,
      )

      try {
        await onSuccessRef.current?.(result)
      } catch {
        // Success UI must not fail the deferred payment flow.
      }
    } catch (caught) {
      const nextError =
        caught instanceof Error
          ? caught
          : new Error("Le paiement différé n'a pas pu être enregistré.")

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
        variant="outline"
        disabled={disabled || pending}
        aria-busy={pending}
        onClick={handleClick}
      >
        {pending ? (
          <Spinner size="sm" label="Enregistrement du paiement différé" />
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

export { PayLater }
