import type { ReactNode } from "react"

export const IMMOASK_PRICING_CUSTOMER_TYPES = [
  "chercheurs",
  "proprietaires",
  "professionnels",
] as const

export type ImmoAskPricingCustomerType =
  (typeof IMMOASK_PRICING_CUSTOMER_TYPES)[number]

export type ImmoAskPricingCustomerOption = {
  id: ImmoAskPricingCustomerType
  label: string
  description?: string
}

export type ImmoAskPricingProps = {
  title?: string
  subtitle?: string
  customerOptions?: ImmoAskPricingCustomerOption[]
  defaultCustomerType?: ImmoAskPricingCustomerType
  customerType?: ImmoAskPricingCustomerType
  onCustomerTypeChange?: (customerType: ImmoAskPricingCustomerType) => void
  className?: string
  footer?: ReactNode
}

export function isImmoAskPricingCustomerType(
  value: string | null | undefined,
): value is ImmoAskPricingCustomerType {
  return (
    value === "chercheurs" ||
    value === "proprietaires" ||
    value === "professionnels"
  )
}
