"use client"

import { useId, useMemo, useState, type FormEvent } from "react"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Spinner from "@/components/ui/Spinner"
import PropertyCard from "@/features/catalog/components/PropertyCard"
import {
  addDaysIso,
  computeBookFurnishedAmounts,
  isBookFurnishedPickupPlace,
  todayIsoDate,
} from "@/features/book_property/computeBookFurnishedAmounts"
import type {
  BookFurnishedPickupPlace,
  BookFurnishedPropertyErrors,
  BookFurnishedPropertyField,
  BookFurnishedPropertyProps,
  BookFurnishedPropertyValues,
} from "@/features/book_property/types"
import { BOOK_FURNISHED_PICKUP_PLACE_OPTIONS } from "@/features/book_property/types"
import { cn } from "@/lib/cn"

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0 text-muted"
    >
      <rect
        x="4"
        y="5.5"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8 3.5v4M16 3.5v4M4 10.5h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

const fieldClassName = cn(
  "h-12 rounded-xl shadow-none",
  "focus-visible:ring-offset-0",
  "[color-scheme:light]",
)

const dateFieldClassName = cn(
  fieldClassName,
  "pr-11",
  "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
)

function formatAmount(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value)
}

function formatPercent(rate: number) {
  return `${Math.round(rate * 100)} %`
}

function validate(
  values: Pick<
    BookFurnishedPropertyValues,
    BookFurnishedPropertyField | "nights"
  >,
) {
  const errors: BookFurnishedPropertyErrors = {}

  if (!Number.isInteger(values.travelersNumber) || values.travelersNumber < 1) {
    errors.travelersNumber = "Le nombre de voyageurs doit être au moins 1"
  }

  if (!isBookFurnishedPickupPlace(values.pickUpPlace)) {
    errors.pickUpPlace = "Le lieu de prise en charge est obligatoire"
  }

  if (!values.checkIn.trim()) {
    errors.checkIn = "La date d'arrivée est obligatoire"
  }

  if (!values.checkOut.trim()) {
    errors.checkOut = "La date de départ est obligatoire"
  } else if (values.checkIn && values.nights < 1) {
    errors.checkOut = "La date de départ doit être postérieure à l'arrivée"
  }

  return errors
}

function canContinueToPayment(
  values: Pick<
    BookFurnishedPropertyValues,
    BookFurnishedPropertyField | "nights"
  >,
) {
  return Object.keys(validate(values)).length === 0
}

export default function BookFurnishedProperty({
  property,
  propertyHref,
  userRole,
  title = "Réservation d'un séjour meublé",
  travelersNumberLabel = "Nombre de voyageurs",
  pickUpPlaceLabel = "Lieu de prise en charge",
  checkInLabel = "Date d'arrivée",
  checkOutLabel = "Date de départ",
  serviceFeeLabel = "Frais de service",
  totalAmountLabel = "Montant total",
  defaultTravelersNumber = 1,
  defaultPickUpPlace = "Sur place",
  defaultCheckIn = "",
  defaultCheckOut = "",
  minDate,
  submitLabel = "Réserver le séjour",
  pending = false,
  disabled = false,
  onSubmit,
  className,
}: BookFurnishedPropertyProps) {
  const formId = useId()
  const listingRoleName = userRole ?? property.roleName ?? null

  const earliestDate = minDate ?? todayIsoDate()
  const [travelersNumber, setTravelersNumber] = useState(
    String(defaultTravelersNumber),
  )
  const [pickUpPlace, setPickUpPlace] =
    useState<BookFurnishedPickupPlace>(defaultPickUpPlace)
  const [checkIn, setCheckIn] = useState(defaultCheckIn)
  const [checkOut, setCheckOut] = useState(defaultCheckOut)
  const [errors, setErrors] = useState<BookFurnishedPropertyErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const amounts = useMemo(
    () =>
      computeBookFurnishedAmounts({
        property,
        checkIn,
        checkOut,
        userRole: listingRoleName,
      }),
    [checkIn, checkOut, listingRoleName, property],
  )

  const busy = disabled || pending || submitting
  const parsedTravelers = Number.parseInt(travelersNumber, 10)
  const canSubmit = canContinueToPayment({
    travelersNumber: Number.isNaN(parsedTravelers) ? 0 : parsedTravelers,
    pickUpPlace,
    checkIn: checkIn.trim(),
    checkOut: checkOut.trim(),
    nights: amounts.nights,
  })

  function clearFieldError(field: BookFurnishedPropertyField) {
    setErrors((current) => {
      if (!current[field]) {
        return current
      }

      const next = { ...current }
      delete next[field]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const values: BookFurnishedPropertyValues = {
      travelersNumber: Number.isNaN(parsedTravelers) ? 0 : parsedTravelers,
      pickUpPlace,
      checkIn: checkIn.trim(),
      checkOut: checkOut.trim(),
      userRole: listingRoleName,
      isFurnished: property.isFurnished,
      propertyId: property.id,
      nuo: property.nuo,
      ...amounts,
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSubmitting(true)

    try {
      await onSubmit?.(values)
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "La réservation du séjour a échoué. Réessayez.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      className={cn(
        "grid items-start gap-6 rounded-2xl bg-white p-4 shadow-card sm:p-6 md:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)]",
        className,
      )}
      aria-labelledby={`${formId}-title`}
    >
      <div className="min-w-0">
        <PropertyCard href={propertyHref} property={property} />
      </div>

      <div className="min-w-0">
        <h2
          id={`${formId}-title`}
          className="text-xl font-bold tracking-tight text-navy sm:text-2xl"
        >
          {title}
        </h2>

        <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`${formId}-travelersNumber`}
                className="mb-1.5 block text-sm font-medium text-navy"
              >
                {travelersNumberLabel}
              </label>
              <Input
                id={`${formId}-travelersNumber`}
                name="travelersNumber"
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                value={travelersNumber}
                disabled={busy}
                required
                aria-invalid={Boolean(errors.travelersNumber)}
                onChange={(event) => {
                  setTravelersNumber(event.target.value)
                  clearFieldError("travelersNumber")
                }}
                className={cn(fieldClassName, errors.travelersNumber && "border-danger")}
              />
              {errors.travelersNumber ? (
                <p className="mt-1 text-xs text-danger">{errors.travelersNumber}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor={`${formId}-pickUpPlace`}
                className="mb-1.5 block text-sm font-medium text-navy"
              >
                {pickUpPlaceLabel}
              </label>
              <Select
                id={`${formId}-pickUpPlace`}
                name="pickUpPlace"
                value={pickUpPlace}
                disabled={busy}
                required
                aria-invalid={Boolean(errors.pickUpPlace)}
                onChange={(event) => {
                  if (isBookFurnishedPickupPlace(event.target.value)) {
                    setPickUpPlace(event.target.value)
                  }
                  clearFieldError("pickUpPlace")
                }}
                className={cn(fieldClassName, errors.pickUpPlace && "border-danger")}
              >
                {BOOK_FURNISHED_PICKUP_PLACE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              {errors.pickUpPlace ? (
                <p className="mt-1 text-xs text-danger">{errors.pickUpPlace}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor={`${formId}-checkIn`}
                className="mb-1.5 block text-sm font-medium text-navy"
              >
                {checkInLabel}
              </label>
              <div className="relative">
                <Input
                  id={`${formId}-checkIn`}
                  name="checkIn"
                  type="date"
                  value={checkIn}
                  min={earliestDate}
                  disabled={busy}
                  required
                  aria-invalid={Boolean(errors.checkIn)}
                  onChange={(event) => {
                    const nextCheckIn = event.target.value
                    setCheckIn(nextCheckIn)
                    clearFieldError("checkIn")

                    if (nextCheckIn && (!checkOut || checkOut <= nextCheckIn)) {
                      setCheckOut(addDaysIso(nextCheckIn, 1))
                      clearFieldError("checkOut")
                    }
                  }}
                  className={cn(dateFieldClassName, errors.checkIn && "border-danger")}
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center">
                  <CalendarIcon />
                </span>
              </div>
              {errors.checkIn ? (
                <p className="mt-1 text-xs text-danger">{errors.checkIn}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor={`${formId}-checkOut`}
                className="mb-1.5 block text-sm font-medium text-navy"
              >
                {checkOutLabel}
              </label>
              <div className="relative">
                <Input
                  id={`${formId}-checkOut`}
                  name="checkOut"
                  type="date"
                  value={checkOut}
                  min={checkIn ? addDaysIso(checkIn, 1) : earliestDate}
                  disabled={busy}
                  required
                  aria-invalid={Boolean(errors.checkOut)}
                  onChange={(event) => {
                    setCheckOut(event.target.value)
                    clearFieldError("checkOut")
                  }}
                  className={cn(dateFieldClassName, errors.checkOut && "border-danger")}
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center">
                  <CalendarIcon />
                </span>
              </div>
              {errors.checkOut ? (
                <p className="mt-1 text-xs text-danger">{errors.checkOut}</p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface px-4 py-3">
              <p className="text-sm font-medium text-navy">
                {serviceFeeLabel}
                {amounts.serviceFeeRate > 0
                  ? ` (${formatPercent(amounts.serviceFeeRate)})`
                  : null}
              </p>
              <p className="mt-1 text-lg font-semibold text-navy">
                {formatAmount(amounts.serviceFee)} XOF
              </p>
              <input type="hidden" name="serviceFee" value={amounts.serviceFee} />
            </div>

            <div className="rounded-xl border border-border bg-surface px-4 py-3">
              <p className="text-sm font-medium text-navy">{totalAmountLabel}</p>
              <p className="mt-1 text-lg font-semibold text-navy">
                {formatAmount(amounts.totalAmount)} XOF
              </p>
              {amounts.nights > 0 ? (
                <p className="mt-1 text-xs text-muted">
                  {amounts.nights} {amounts.nights > 1 ? "nuits" : "nuit"} ×{" "}
                  {formatAmount(amounts.nightlyPrice)} XOF
                  {amounts.serviceFee > 0
                    ? ` + ${formatAmount(amounts.serviceFee)} XOF de frais`
                    : null}
                </p>
              ) : null}
              <input type="hidden" name="totalAmount" value={amounts.totalAmount} />
            </div>
          </div>

          {formError ? <p className="text-sm text-danger">{formError}</p> : null}

          <Button
            type="submit"
            size="lg"
            disabled={busy || !canSubmit}
            className="h-12 w-full rounded-xl sm:w-auto"
          >
            {submitting || pending ? (
              <Spinner size="sm" className="text-white" />
            ) : null}
            {submitLabel}
          </Button>
        </form>
      </div>
    </section>
  )
}

export { BookFurnishedProperty }
