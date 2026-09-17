"use client"

import { createContext, useContext, type ReactNode } from "react"

import Button from "@/components/ui/Button"
import { useAccountSession } from "@/features/account/useAccountSession"
import { hasPaidPropertySeekersSubscription } from "@/lib/api/accounts"
import { cn } from "@/lib/cn"

const SubscriptionGateContext = createContext(false)

export default function PropertyDetailSubscriptionGate({
  children,
  ctaLabel = "Payer un abonnement pour voir tout",
  ctaHref = "/abonnements/chercheurs",
  className,
}: {
  children?: ReactNode
  ctaLabel?: string
  ctaHref?: string
  className?: string
}) {
  const nested = useContext(SubscriptionGateContext)
  const { session, ready } = useAccountSession()
  const unlocked = ready && hasPaidPropertySeekersSubscription(session)

  if (unlocked) {
    return children
  }

  const blurred = (
    <div
      className="pointer-events-none select-none blur-[10px]"
      aria-hidden="true"
      inert
    >
      {children}
    </div>
  )

  if (nested) {
    return (
      <div className={cn("overflow-hidden", className)}>{blurred}</div>
    )
  }

  return (
    <SubscriptionGateContext.Provider value={true}>
      <div className={cn("relative isolate overflow-hidden", className)}>
        {blurred}
        <div className="absolute inset-0 z-[1200] flex items-center justify-center bg-white/55 p-4">
          <Button
            href={ctaHref}
            pill
            className="h-auto max-w-full px-5 py-2.5 text-center whitespace-normal"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </SubscriptionGateContext.Provider>
  )
}

export { PropertyDetailSubscriptionGate }
