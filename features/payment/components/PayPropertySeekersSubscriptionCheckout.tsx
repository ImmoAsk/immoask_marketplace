"use client"

import Container from "@/components/ui/Container"
import { useAccountSession } from "@/features/account/useAccountSession"
import PayPropertySeekersSubscriptionPlan from "@/features/payment/components/PayPropertySeekersSubscriptionPlan"
import { toPayVisitFeeVisitor } from "@/features/payment/components/toPayVisitFeeVisitor"
import type { PayPropertySeekersSubscriptionCheckoutProps } from "@/features/payment/types"
import { toAbsoluteUrl } from "@/lib/seo/site"
import { cn } from "@/lib/cn"

export default function PayPropertySeekersSubscriptionCheckout({
  plan,
  embedded = false,
  callbackUrl,
  changePlanHref = "/abonnements/chercheurs",
  className,
  onChangePlan,
  onPay,
  onPaid,
  onError,
}: PayPropertySeekersSubscriptionCheckoutProps) {
  const { session } = useAccountSession()
  const subscriber = toPayVisitFeeVisitor(session)

  const checkout = (
    <PayPropertySeekersSubscriptionPlan
      plan={plan}
      subscriber={subscriber}
      callbackUrl={callbackUrl ?? toAbsoluteUrl("/abonnements/chercheurs")}
      changePlanHref={changePlanHref}
      className={embedded ? "p-0 shadow-none" : undefined}
      onChangePlan={onChangePlan}
      onPay={onPay}
      onPaid={onPaid}
      onError={onError}
    />
  )

  if (embedded) {
    return <div className={className}>{checkout}</div>
  }

  return (
    <div className={cn("bg-surface py-10 sm:py-14", className)}>
      <Container className="max-w-2xl">{checkout}</Container>
    </div>
  )
}

export { PayPropertySeekersSubscriptionCheckout }
