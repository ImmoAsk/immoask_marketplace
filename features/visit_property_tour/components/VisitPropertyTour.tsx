"use client"

import { useId, useState, type FormEvent } from "react"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Spinner from "@/components/ui/Spinner"
import PropertyCard from "@/features/catalog/components/PropertyCard"
import { cn } from "@/lib/cn"
import type {
  VisitPropertyTourErrors,
  VisitPropertyTourField,
  VisitPropertyTourProps,
  VisitPropertyTourValues,
} from "@/features/visit_property_tour/types"

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

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0 text-muted"
    >
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 8v4.4l2.8 1.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const fieldClassName = cn(
  "h-12 rounded-xl pr-11 shadow-none",
  "focus-visible:ring-offset-0",
  "[color-scheme:light]",
)

function todayIsoDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function validate(values: Pick<VisitPropertyTourValues, VisitPropertyTourField>) {
  const errors: VisitPropertyTourErrors = {}

  if (!values.dateVisit.trim()) {
    errors.dateVisit = "La date de visite est obligatoire"
  }

  if (!values.hourVisit.trim()) {
    errors.hourVisit = "L'heure de visite est obligatoire"
  }

  return errors
}

function canContinueToPayment(
  values: Pick<VisitPropertyTourValues, VisitPropertyTourField>,
) {
  return Object.keys(validate(values)).length === 0
}

export default function VisitPropertyTour({
  property,
  propertyHref,
  title = "Planification de la visite en cours",
  dateVisitLabel = "Date de visite",
  hourVisitLabel = "Heure de visite",
  dateVisitPlaceholder,
  hourVisitPlaceholder,
  defaultDateVisit = "",
  defaultHourVisit = "",
  minDate,
  submitLabel = "Planifier la visite",
  pending = false,
  disabled = false,
  onSubmit,
  className,
}: VisitPropertyTourProps) {
  const formId = useId()
  const [dateVisit, setDateVisit] = useState(defaultDateVisit)
  const [hourVisit, setHourVisit] = useState(defaultHourVisit)
  const [errors, setErrors] = useState<VisitPropertyTourErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const busy = disabled || pending || submitting
  const canSubmit = canContinueToPayment({
    dateVisit: dateVisit.trim(),
    hourVisit: hourVisit.trim(),
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const values: VisitPropertyTourValues = {
      dateVisit: dateVisit.trim(),
      hourVisit: hourVisit.trim(),
      propertyId: property.id,
      nuo: property.nuo,
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
          : "La planification de la visite a échoué. Réessayez.",
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
                htmlFor={`${formId}-dateVisit`}
                className="mb-1.5 block text-sm font-medium text-navy"
              >
                {dateVisitLabel}
              </label>
              <div className="relative">
                <Input
                  id={`${formId}-dateVisit`}
                  name="dateVisit"
                  type="date"
                  value={dateVisit}
                  min={minDate ?? todayIsoDate()}
                  placeholder={dateVisitPlaceholder}
                  disabled={busy}
                  required
                  aria-invalid={Boolean(errors.dateVisit)}
                  onChange={(event) => {
                    setDateVisit(event.target.value)
                    setErrors((current) => {
                      const next = { ...current }
                      delete next.dateVisit
                      return next
                    })
                  }}
                  className={cn(
                    fieldClassName,
                    "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
                    errors.dateVisit && "border-danger",
                  )}
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center">
                  <CalendarIcon />
                </span>
              </div>
              {errors.dateVisit ? (
                <p className="mt-1 text-xs text-danger">{errors.dateVisit}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor={`${formId}-hourVisit`}
                className="mb-1.5 block text-sm font-medium text-navy"
              >
                {hourVisitLabel}
              </label>
              <div className="relative">
                <Input
                  id={`${formId}-hourVisit`}
                  name="hourVisit"
                  type="time"
                  value={hourVisit}
                  placeholder={hourVisitPlaceholder}
                  disabled={busy}
                  required
                  aria-invalid={Boolean(errors.hourVisit)}
                  onChange={(event) => {
                    setHourVisit(event.target.value)
                    setErrors((current) => {
                      const next = { ...current }
                      delete next.hourVisit
                      return next
                    })
                  }}
                  className={cn(
                    fieldClassName,
                    "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
                    errors.hourVisit && "border-danger",
                  )}
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center">
                  <ClockIcon />
                </span>
              </div>
              {errors.hourVisit ? (
                <p className="mt-1 text-xs text-danger">{errors.hourVisit}</p>
              ) : null}
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

export { VisitPropertyTour }
