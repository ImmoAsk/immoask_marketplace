import type { Property } from "@/features/catalog/types"
import type { PayVisitFeeVisitor, PayNowResult } from "@/features/payment/types"

export type VisitPropertyTourProperty = Property & {
  visitFee?: number | null
  proprietaireId?: number | null
}

export type VisitPropertyTourStep = "schedule" | "pay" | "feedback"

export type VisitPropertyTourField = "dateVisit" | "hourVisit"

export type VisitPropertyTourValues = {
  dateVisit: string
  hourVisit: string
  propertyId: number
  nuo: number
}

export type VisitPropertyTourErrors = Partial<
  Record<VisitPropertyTourField, string>
>

export type VisitPropertyTourProps = {
  property: VisitPropertyTourProperty
  propertyHref: string
  title?: string
  dateVisitLabel?: string
  hourVisitLabel?: string
  dateVisitPlaceholder?: string
  hourVisitPlaceholder?: string
  defaultDateVisit?: string
  defaultHourVisit?: string
  minDate?: string
  submitLabel?: string
  pending?: boolean
  disabled?: boolean
  onSubmit?: (
    values: VisitPropertyTourValues,
  ) => Promise<void> | void
  className?: string
}

export type VisitPropertyTourModalProps = {
  open: boolean
  onClose: () => void
  property: VisitPropertyTourProperty
  propertyHref: string
  visitor?: PayVisitFeeVisitor | null
  submitLabel?: string
  onSubmit?: (values: VisitPropertyTourValues) => Promise<void> | void
  onPaid?: (
    result: PayNowResult,
    values: VisitPropertyTourValues,
  ) => Promise<void> | void
}
