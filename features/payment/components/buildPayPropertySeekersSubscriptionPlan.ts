import { PROPERTY_SEEKERS_SUBSCRIPTION_COLUMNS } from "@/features/subscriptions/components/buildPropertySeekersSubscription"
import { PROPERTY_SEEKERS_PLAN_PRICES } from "@/features/subscriptions/pricing"
import {
  PROPERTY_SEEKERS_PAID_PLAN_IDS,
  type PayPropertySeekersSubscriptionChosenPlan,
  type PropertySeekersPaidPlanId,
} from "@/features/payment/types"

export function isPropertySeekersPaidPlanId(
  value: string | null | undefined,
): value is PropertySeekersPaidPlanId {
  return PROPERTY_SEEKERS_PAID_PLAN_IDS.includes(
    value as PropertySeekersPaidPlanId,
  )
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function addMonths(date: Date, months: number) {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  next.setMonth(next.getMonth() + months)

  return next
}

export function buildPayPropertySeekersSubscriptionPlan(
  planId: string,
  start: Date = new Date(),
): PayPropertySeekersSubscriptionChosenPlan | null {
  if (!isPropertySeekersPaidPlanId(planId)) {
    return null
  }

  const column = PROPERTY_SEEKERS_SUBSCRIPTION_COLUMNS.find(
    (item) => item.id === planId,
  )

  if (!column) {
    return null
  }

  const pricing = PROPERTY_SEEKERS_PLAN_PRICES[planId]
  const startDate = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  )

  return {
    id: planId,
    lightTitle: column.lightTitle,
    namePricing: column.namePricing,
    subscription_amount: column.subscription_amount,
    subscription_amount_xof: column.subscription_amount_xof,
    amount: pricing.xof,
    amount_usd: pricing.usd,
    amount_xof: pricing.xof,
    durationMonths: 1,
    durationLabel: "1 mois",
    startDate: toIsoDate(startDate),
    endDate: toIsoDate(addMonths(startDate, 1)),
  }
}
