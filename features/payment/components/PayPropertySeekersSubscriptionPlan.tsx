"use client"

import { useState } from "react"
import Link from "next/link"

import Button from "@/components/ui/Button"
import PayNow from "@/features/payment/components/PayNow"
import {
  PAYMENT_METHOD_OPTIONS,
  isPaymentMethod,
  type PaymentMethod,
  type PayPropertySeekersSubscriptionPlanProps,
} from "@/features/payment/types"
import { formatUsdAmount, formatXofAmount } from "@/features/subscriptions/pricing"
import { AUTH_SIGNIN_PATH } from "@/lib/routing/auth"
import { toAbsoluteUrl } from "@/lib/seo/site"
import { cn } from "@/lib/cn"

const WEEKDAYS = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
] as const

const MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
] as const

function formatPlanDate(value: string) {
  const [year, month, day] = value.split("-").map(Number)

  if (!year || !month || !day) {
    return value
  }

  const date = new Date(year, month - 1, day)

  return `${WEEKDAYS[date.getDay()]} ${day} ${MONTHS[month - 1]} ${year}`
}

function formatTotalAmount(plan: {
  amount_usd: number
  amount_xof: number
}) {
  return `${formatUsdAmount(plan.amount_usd)} · ${formatXofAmount(plan.amount_xof)}`
}

export default function PayPropertySeekersSubscriptionPlan({
  plan,
  subscriber,
  countryCode = "TG",
  callbackUrl,
  title = "Paiement de l'abonnement",
  changePlanLabel = "Changer de formule",
  changePlanHref = "/abonnements/chercheurs",
  className,
  onChangePlan,
  onPay,
  onPaid,
  onError,
}: PayPropertySeekersSubscriptionPlanProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mixx")
  const selectedMethodLabel =
    PAYMENT_METHOD_OPTIONS.find((option) => option.id === paymentMethod)?.label ??
    PAYMENT_METHOD_OPTIONS[0].label
  const resolvedCountryCode = countryCode.trim().toUpperCase()
  const canPay = Boolean(
    plan.amount_xof > 0 &&
      subscriber?.firstname &&
      subscriber.lastname &&
      subscriber.email &&
      subscriber.phone,
  )

  return (
    <section
      className={cn("rounded-2xl bg-white p-5 shadow-card sm:p-8", className)}
      aria-labelledby="pay-property-seekers-subscription-title"
    >
      <h2
        id="pay-property-seekers-subscription-title"
        className="text-xl font-bold tracking-tight text-navy sm:text-2xl"
      >
        {title}
      </h2>

      <section className="mt-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
          Récapitulatif de la formule
        </h3>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex items-start justify-between gap-4">
            <dt className="text-muted">Formule</dt>
            <dd className="text-right font-medium text-navy">{plan.lightTitle}</dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="text-muted">Durée</dt>
            <dd className="text-right font-medium text-navy">
              {plan.durationLabel}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="text-muted">Description</dt>
            <dd className="max-w-sm text-right font-medium text-navy">
              {plan.namePricing}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="text-muted">Montant</dt>
            <dd className="text-right font-medium text-navy">
              <span className="block">{plan.subscription_amount}</span>
              {plan.subscription_amount_xof ? (
                <span className="mt-0.5 block text-muted">
                  {plan.subscription_amount_xof}
                </span>
              ) : null}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
          Informations de l&apos;abonné
        </h3>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex items-start justify-between gap-4">
            <dt className="text-muted">Nom</dt>
            <dd className="text-right font-medium text-navy">
              {subscriber?.name || "Non connecté"}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="text-muted">Email</dt>
            <dd className="text-right font-medium text-navy">
              {subscriber?.email || "—"}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="text-muted">Téléphone</dt>
            <dd className="text-right font-medium text-navy">
              {subscriber?.phone || "—"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
          Période d&apos;abonnement
        </h3>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex items-start justify-between gap-4">
            <dt className="text-muted">Date de début</dt>
            <dd className="text-right font-medium text-navy capitalize">
              {formatPlanDate(plan.startDate)}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="text-muted">Date de fin</dt>
            <dd className="text-right font-medium text-navy capitalize">
              {formatPlanDate(plan.endDate)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
          Conditions de remboursement
        </h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-navy">
          <li>
            Aucun remboursement n&apos;est autorisé après le paiement de la
            souscription.
          </li>
        </ol>
      </section>

      <section className="mt-6">
        <div className="rounded-xl border border-border bg-surface px-4 py-3">
          <p className="text-sm font-medium text-navy">Total à payer</p>
          <p className="mt-1 text-lg font-semibold text-navy">
            {formatTotalAmount(plan)}
          </p>
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
          Méthode de paiement
        </h3>
        <div
          role="radiogroup"
          aria-label="Méthode de paiement"
          className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2"
        >
          {PAYMENT_METHOD_OPTIONS.map((option) => {
            const selected = option.id === paymentMethod

            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  if (isPaymentMethod(option.id)) {
                    setPaymentMethod(option.id)
                  }
                }}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  selected
                    ? "border-primary bg-primary-soft text-navy"
                    : "border-border bg-white text-navy hover:border-primary/40",
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </section>

      {canPay && subscriber ? (
        <PayNow
          className="mt-6"
          description={`Abonnement ${plan.lightTitle} ${plan.durationLabel} — ${selectedMethodLabel}`}
          amount={plan.amount_xof}
          firstname={subscriber.firstname}
          lastname={subscriber.lastname}
          phone={subscriber.phone}
          email={subscriber.email}
          callback_url={
            callbackUrl ?? toAbsoluteUrl("/abonnements/chercheurs")
          }
          country_code={resolvedCountryCode || undefined}
          currency="XOF"
          onPay={onPay}
          onSuccess={onPaid}
          onError={onError}
        />
      ) : (
        <p className="mt-6 rounded-xl bg-surface px-4 py-3 text-sm text-muted">
          Connectez-vous pour payer l&apos;abonnement.{" "}
          <Link href={AUTH_SIGNIN_PATH} className="font-medium text-primary">
            Se connecter
          </Link>
        </p>
      )}

      {onChangePlan ? (
        <Button
          type="button"
          variant="outline"
          className="mt-3 w-full"
          onClick={onChangePlan}
        >
          {changePlanLabel}
        </Button>
      ) : (
        <Button
          href={changePlanHref}
          variant="outline"
          className="mt-3 w-full"
        >
          {changePlanLabel}
        </Button>
      )}
    </section>
  )
}

export { PayPropertySeekersSubscriptionPlan }
