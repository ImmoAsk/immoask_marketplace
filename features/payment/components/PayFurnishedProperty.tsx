"use client"

import { useState } from "react"
import Link from "next/link"

import Button from "@/components/ui/Button"
import { BOOK_FURNISHED_PICKUP_PLACE_OPTIONS } from "@/features/book_property/types"
import PropertyCard from "@/features/catalog/components/PropertyCard"
import PayNow from "@/features/payment/components/PayNow"
import {
  PAYMENT_METHOD_OPTIONS,
  isPaymentMethod,
  type PaymentMethod,
  type PayFurnishedPropertyProps,
} from "@/features/payment/types"
import { AUTH_SIGNIN_PATH } from "@/lib/routing/auth"
import { toAbsoluteUrl } from "@/lib/seo/site"
import { cn } from "@/lib/cn"

function formatAmount(value: number) {
  return `${new Intl.NumberFormat("fr-FR").format(value)} XOF`
}

function formatBookingDate(value: string) {
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

function pickupPlaceLabel(value: string) {
  return (
    BOOK_FURNISHED_PICKUP_PLACE_OPTIONS.find((option) => option.value === value)
      ?.label ?? value
  )
}

export default function PayFurnishedProperty({
  property,
  propertyHref,
  booking,
  guest,
  currency = "XOF",
  countryCode,
  callbackUrl,
  title = "Paiement de la réservation",
  editLabel = "Modifier la réservation",
  className,
  onEditBooking,
  onPay,
  onPaid,
  onError,
}: PayFurnishedPropertyProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mixx")
  const selectedMethodLabel =
    PAYMENT_METHOD_OPTIONS.find((option) => option.id === paymentMethod)?.label ??
    PAYMENT_METHOD_OPTIONS[0].label
  const resolvedCountryCode = (countryCode ?? property.country)?.trim().toUpperCase()
  const canPay = Boolean(
    booking.totalAmount > 0 &&
      guest?.firstname &&
      guest.lastname &&
      guest.email &&
      guest.phone,
  )

  return (
    <section
      className={cn(
        "grid items-start gap-6 rounded-2xl bg-white p-4 sm:p-0 md:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]",
        className,
      )}
      aria-labelledby="pay-furnished-property-title"
    >
      <div className="min-w-0">
        <PropertyCard href={propertyHref} property={property} />
      </div>

      <div className="min-w-0">
        <h2
          id="pay-furnished-property-title"
          className="text-xl font-bold tracking-tight text-navy sm:text-2xl"
        >
          {title}
        </h2>

        <section className="mt-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
            Récapitulatif de la réservation
          </h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">Date d&apos;entrée</dt>
              <dd className="text-right font-medium text-navy capitalize">
                {formatBookingDate(booking.checkIn)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">Date de départ</dt>
              <dd className="text-right font-medium text-navy capitalize">
                {formatBookingDate(booking.checkOut)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">Lieu de prise en charge des clés</dt>
              <dd className="text-right font-medium text-navy">
                {pickupPlaceLabel(booking.pickUpPlace)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">Nombre de voyageurs</dt>
              <dd className="text-right font-medium text-navy">
                {booking.travelersNumber}
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
              Annulation gratuite au moins un jour avant la date d&apos;entrée.
            </li>
            <li>
              Une nuitée est déduite quand c&apos;est annulé à la date
              d&apos;entrée moins un.
            </li>
          </ol>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface px-4 py-3">
            <p className="text-sm font-medium text-navy">Montant du séjour</p>
            <p className="mt-1 text-lg font-semibold text-navy">
              {formatAmount(booking.subtotal)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface px-4 py-3">
            <p className="text-sm font-medium text-navy">Frais de service</p>
            <p className="mt-1 text-lg font-semibold text-navy">
              {formatAmount(booking.serviceFee)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface px-4 py-3">
            <p className="text-sm font-medium text-navy">Total à payer</p>
            <p className="mt-1 text-lg font-semibold text-navy">
              {formatAmount(booking.totalAmount)}
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

        {canPay && guest ? (
          <PayNow
            className="mt-6"
            description={`Réservation séjour N°${property.nuo} — ${selectedMethodLabel}`}
            amount={booking.totalAmount}
            firstname={guest.firstname}
            lastname={guest.lastname}
            phone={guest.phone}
            email={guest.email}
            callback_url={callbackUrl ?? toAbsoluteUrl(propertyHref)}
            country_code={resolvedCountryCode || undefined}
            currency={currency}
            onPay={onPay}
            onSuccess={onPaid}
            onError={onError}
          />
        ) : (
          <p className="mt-6 rounded-xl bg-surface px-4 py-3 text-sm text-muted">
            Connectez-vous pour payer la réservation.{" "}
            <Link href={AUTH_SIGNIN_PATH} className="font-medium text-primary">
              Se connecter
            </Link>
          </p>
        )}

        <Button
          type="button"
          variant="outline"
          className="mt-3 w-full"
          onClick={onEditBooking}
        >
          {editLabel}
        </Button>
      </div>
    </section>
  )
}

export { PayFurnishedProperty }
