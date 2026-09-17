"use client"

import { useState } from "react"
import Link from "next/link"

import Button from "@/components/ui/Button"
import PropertyCard from "@/features/catalog/components/PropertyCard"
import PayNow from "@/features/payment/components/PayNow"
import {
  PAYMENT_METHOD_OPTIONS,
  isPaymentMethod,
  type PaymentMethod,
  type PayVisitFeeProps,
} from "@/features/payment/types"
import { AUTH_SIGNIN_PATH } from "@/lib/routing/auth"
import { toAbsoluteUrl } from "@/lib/seo/site"
import { cn } from "@/lib/cn"

function formatAmount(value: number) {
  return `${new Intl.NumberFormat("fr-FR").format(value)} XOF`
}

function formatVisitDate(value: string) {
  const [year, month, day] = value.split("-").map(Number)

  if (!year || !month || !day) {
    return value
  }

  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day))
}

function formatVisitHour(value: string) {
  const [hours, minutes] = value.split(":")

  if (!hours || !minutes) {
    return value
  }

  return `${hours} h ${minutes}`
}

export default function PayVisitFee({
  property,
  propertyHref,
  visit,
  visitor,
  visitFee,
  currency = "XOF",
  countryCode,
  callbackUrl,
  title = "Paiement du droit de visite",
  editLabel = "Modifier la visite",
  className,
  onEditVisit,
  onPay,
  onPaid,
  onError,
}: PayVisitFeeProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mixx")
  const selectedMethodLabel =
    PAYMENT_METHOD_OPTIONS.find((option) => option.id === paymentMethod)?.label ??
    PAYMENT_METHOD_OPTIONS[0].label
  const resolvedCountryCode = (countryCode ?? property.country)?.trim().toUpperCase()
  const canPay = Boolean(
    visitFee > 0 &&
      visitor?.firstname &&
      visitor.lastname &&
      visitor.email &&
      visitor.phone,
  )

  return (
    <section
      className={cn(
        "grid items-start gap-6 rounded-2xl bg-white p-4 sm:p-0 md:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]",
        className,
      )}
      aria-labelledby="pay-visit-fee-title"
    >
      <div className="min-w-0">
        <PropertyCard href={propertyHref} property={property} />
      </div>

      <div className="min-w-0">
        <h2
          id="pay-visit-fee-title"
          className="text-xl font-bold tracking-tight text-navy sm:text-2xl"
        >
          {title}
        </h2>

        <section className="mt-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
            Récapitulatif de la visite
          </h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">Date de visite</dt>
              <dd className="text-right font-medium text-navy capitalize">
                {formatVisitDate(visit.dateVisit)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">Heure de visite</dt>
              <dd className="text-right font-medium text-navy">
                {formatVisitHour(visit.hourVisit)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">Visiteur</dt>
              <dd className="text-right font-medium text-navy">
                {visitor?.name || "Non connecté"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
            Conditions d&apos;annulation
          </h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-navy">
            <li>
              En cas d&apos;annulation de la visite par l&apos;agent immobilier
              ou le propriétaire, le remboursement complet des droits de visite
              est total.
            </li>
            <li>
              Nous déduisons 10% si l&apos;annulation vient de votre part.
            </li>
          </ol>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface px-4 py-3">
            <p className="text-sm font-medium text-navy">Droit de visite</p>
            <p className="mt-1 text-lg font-semibold text-navy">
              {formatAmount(visitFee)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface px-4 py-3">
            <p className="text-sm font-medium text-navy">Total à payer</p>
            <p className="mt-1 text-lg font-semibold text-navy">
              {formatAmount(visitFee)}
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

        {canPay && visitor ? (
          <PayNow
            className="mt-6"
            description={`Droit de visite N°${property.nuo} — ${selectedMethodLabel}`}
            amount={visitFee}
            firstname={visitor.firstname}
            lastname={visitor.lastname}
            phone={visitor.phone}
            email={visitor.email}
            callback_url={callbackUrl ?? toAbsoluteUrl(propertyHref)}
            country_code={resolvedCountryCode || undefined}
            currency={currency}
            onPay={onPay}
            onSuccess={onPaid}
            onError={onError}
          />
        ) : (
          <p className="mt-6 rounded-xl bg-surface px-4 py-3 text-sm text-muted">
            Connectez-vous pour payer le droit de visite.{" "}
            <Link href={AUTH_SIGNIN_PATH} className="font-medium text-primary">
              Se connecter
            </Link>
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          className="mt-3 w-full"
          onClick={onEditVisit}
        >
          {editLabel}
        </Button>
      </div>
    </section>
  )
}

export { PayVisitFee }
