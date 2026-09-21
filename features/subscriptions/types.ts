import type { ReactNode } from "react"

export type TemplateSubscriptionSalesPointVariant =
  | "point"
  | "intro"
  | "heading"
  | "note"

export type TemplateSubscriptionSalesPoint = {
  label: string
  variant?: TemplateSubscriptionSalesPointVariant
}

export type TemplateSubscriptionColumn = {
  id?: string
  lightTitle: string
  namePricing: string
  subscription_amount: string
  subscription_amount_xof?: string
  salesPoints: Array<string | TemplateSubscriptionSalesPoint>
  highlighted?: boolean
  selected?: boolean
  ctaLabel?: string
  ctaHref?: string
  onSelect?: () => void
}

export type TemplateSubscriptionColumnProps = TemplateSubscriptionColumn & {
  className?: string
}

export type TemplateSubscriptionCondition = {
  title: string
  paragraphs: string[]
}

export type TemplateSubscriptionComplementaryConditions = {
  title: string
  items: TemplateSubscriptionCondition[]
}

export type TemplateSubscriptionComplementaryConditionsProps =
  TemplateSubscriptionComplementaryConditions & {
    className?: string
  }

export type TemplateSubscriptionProps = {
  title: string
  subtitle: string
  columns: TemplateSubscriptionColumn[]
  complementaryConditions: TemplateSubscriptionComplementaryConditions
  selectedColumnId?: string
  onSelectColumn?: (columnId: string) => void
  footer?: ReactNode
  embedded?: boolean
  className?: string
}

export type PropertySeekersSubscriptionProps = Partial<TemplateSubscriptionProps> & {
  continueLabel?: string
  continueDisabled?: boolean
  onContinue?: () => void
}

export type LandlordSubscriptionProps = Partial<TemplateSubscriptionProps> & {
  continueLabel?: string
  continueDisabled?: boolean
  onContinue?: () => void
}

export type AgentMarketPlaceSubscriptionProps = Partial<TemplateSubscriptionProps> & {
  continueLabel?: string
  continueDisabled?: boolean
  onContinue?: () => void
}
