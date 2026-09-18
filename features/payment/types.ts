import type {
  BookFurnishedPickupPlace,
  BookFurnishedPropertyAmounts,
} from "@/features/book_property/types"
import type { Property } from "@/features/catalog/types"
import type {
  PayWithFedaPayInput,
  PayWithFedaPayResult,
} from "@/lib/api/types"

export type PayNowInput = PayWithFedaPayInput

export type PayNowResult = PayWithFedaPayResult

export type PayNowProps = PayNowInput & {
  label?: string
  className?: string
  disabled?: boolean
  onPay?: () => void | Promise<void>
  onSuccess?: (result: PayNowResult) => void | Promise<void>
  onError?: (error: Error) => void
}

export const PAYMENT_METHODS = ["mixx", "flooz"] as const

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]

export const PAYMENT_METHOD_OPTIONS: ReadonlyArray<{
  id: PaymentMethod
  label: string
}> = [
  { id: "mixx", label: "Mixx by Yas" },
  { id: "flooz", label: "Flooz" },
]

export function isPaymentMethod(value: string): value is PaymentMethod {
  return PAYMENT_METHODS.includes(value as PaymentMethod)
}

export type PayVisitFeeVisitor = {
  name: string
  firstname: string
  lastname: string
  email: string
  phone: string
}

export type PayVisitFeeVisit = {
  dateVisit: string
  hourVisit: string
}

export type PayVisitFeeProps = {
  property: Property
  propertyHref: string
  visit: PayVisitFeeVisit
  visitor?: PayVisitFeeVisitor | null
  visitFee: number
  currency?: string
  countryCode?: string
  callbackUrl?: string
  title?: string
  editLabel?: string
  className?: string
  onEditVisit: () => void
  onPay?: () => void | Promise<void>
  onPaid?: (result: PayNowResult) => void
  onError?: (error: Error) => void
}

export type PayFurnishedPropertyGuest = PayVisitFeeVisitor

export type PayFurnishedPropertyBooking = BookFurnishedPropertyAmounts & {
  checkIn: string
  checkOut: string
  pickUpPlace: BookFurnishedPickupPlace
  travelersNumber: number
}

export type PayFurnishedPropertyProps = {
  property: Property
  propertyHref: string
  booking: PayFurnishedPropertyBooking
  guest?: PayFurnishedPropertyGuest | null
  currency?: string
  countryCode?: string
  callbackUrl?: string
  title?: string
  editLabel?: string
  className?: string
  onEditBooking: () => void
  onPay?: () => void | Promise<void>
  onPaid?: (result: PayNowResult) => void
  onError?: (error: Error) => void
}

export const PROPERTY_SEEKERS_PAID_PLAN_IDS = ["medium", "premium"] as const

export type PropertySeekersPaidPlanId =
  (typeof PROPERTY_SEEKERS_PAID_PLAN_IDS)[number]

export type PayPropertySeekersSubscriptionSubscriber = PayVisitFeeVisitor

export type PayPropertySeekersSubscriptionChosenPlan = {
  id: PropertySeekersPaidPlanId
  lightTitle: string
  namePricing: string
  subscription_amount: string
  subscription_amount_xof?: string
  amount: number
  amount_usd: number
  amount_xof: number
  durationMonths: 1
  durationLabel: string
  startDate: string
  endDate: string
}

export type PayPropertySeekersSubscriptionPlanProps = {
  plan: PayPropertySeekersSubscriptionChosenPlan
  subscriber?: PayPropertySeekersSubscriptionSubscriber | null
  currency?: string
  countryCode?: string
  callbackUrl?: string
  title?: string
  changePlanLabel?: string
  changePlanHref?: string
  className?: string
  onChangePlan?: () => void
  onPay?: () => void | Promise<void>
  onPaid?: (result: PayNowResult) => void
  onError?: (error: Error) => void
}

export type PayPropertySeekersSubscriptionCheckoutProps = {
  plan: PayPropertySeekersSubscriptionChosenPlan
  embedded?: boolean
  callbackUrl?: string
  changePlanHref?: string
  className?: string
  onChangePlan?: () => void
  onPay?: () => void | Promise<void>
  onPaid?: (result: PayNowResult) => void
  onError?: (error: Error) => void
}
