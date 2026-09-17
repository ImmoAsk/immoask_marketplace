"use client"

import { useState } from "react"

import Button from "@/components/ui/Button"
import { useAccountSession } from "@/features/account/useAccountSession"
import { toPayVisitFeeVisitor } from "@/features/payment/components/toPayVisitFeeVisitor"
import VisitPropertyTourModal from "@/features/visit_property_tour/components/VisitPropertyTourModal"
import { cn } from "@/lib/cn"
import type { PropertyDetailVisitTourProps } from "@/features/properties/types"

function CircleCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
    >
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8.8 12.1 11.1 14.4 15.4 9.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function PropertyDetailVisitTour({
  property,
  propertyHref,
  title = "Planifier une visite physique accompagnée",
  note = "Les droits de visite sont remboursés entièrement en cas de changement de disponibilité par le propriétaire ou l'agent immobilier.",
  submitLabel = "Planifier une visite",
  disabled = false,
  onSubmit,
  className,
}: PropertyDetailVisitTourProps) {
  const [open, setOpen] = useState(false)
  const { session } = useAccountSession()
  const visitor = toPayVisitFeeVisitor(session)

  if ((property.visitFee ?? 0) <= 0) {
    return null
  }

  return (
    <section
      className={cn("rounded-2xl bg-white p-5 shadow-card sm:p-6", className)}
      aria-labelledby="property-detail-visit-tour-title"
    >
      <h2
        id="property-detail-visit-tour-title"
        className="text-lg font-bold tracking-tight text-navy"
      >
        {title}
      </h2>

      <p className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-navy">
        <CircleCheckIcon className="mt-0.5 text-primary" />
        <span>{note}</span>
      </p>

      <Button
        type="button"
        pill
        size="lg"
        disabled={disabled}
        onClick={() => setOpen(true)}
        className="mt-5 w-full"
      >
        <CircleCheckIcon className="text-white" />
        {submitLabel}
      </Button>

      <VisitPropertyTourModal
        open={open}
        onClose={() => setOpen(false)}
        property={property}
        propertyHref={propertyHref}
        visitor={visitor}
        onSubmit={onSubmit}
      />
    </section>
  )
}

export { PropertyDetailVisitTour }
