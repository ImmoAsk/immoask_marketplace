"use client"

import { useState } from "react"

import { cn } from "@/lib/cn"
import type { MarketplaceSubscriptionProps } from "@/features/properties/types"

import { DEFAULT_MARKETPLACE_SUBSCRIPTION_FEATURES } from "./buildMarketplaceSubscription"
import MarketplaceSubscriptionFeature from "./MarketplaceSubscriptionFeature"
import MarketplaceSubscriptionModal from "./MarketplaceSubscriptionModal"

function DiamondIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="size-3.5 shrink-0 text-navy"
    >
      <path
        d="M8 2.2 13.6 8 8 13.8 2.4 8 8 2.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0"
    >
      <path
        d="M5 12h12.5M13.5 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShieldCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0 text-primary"
    >
      <path
        d="M12 3.5 5.5 6.2v5.2c0 4.1 2.7 7.3 6.5 8.6 3.8-1.3 6.5-4.5 6.5-8.6V6.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 12.1 11.2 14l3.5-4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function MarketplaceSubscription({
  badgeLabel = "Service sur-mesure & Conciergerie",
  title = "Une demande immobilière très personnalisée ?",
  description = "Bénéficiez d'une force de recherche exclusive sur Lomé avec notre conciergerie active 7j/7.",
  features = DEFAULT_MARKETPLACE_SUBSCRIPTION_FEATURES,
  ctaLabel = "Lancer ma demande personnalisée",
  reassuranceLabel = "Sans engagement • Réponse garantie en moins d'1h",
  callbackUrl,
  className,
  onInquirySuccess,
  onPaid,
}: MarketplaceSubscriptionProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section
        className={cn(
          "relative rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6",
          className,
        )}
        aria-labelledby="marketplace-subscription-title"
      >
        <span
          aria-hidden="true"
          className="absolute top-5 right-5 size-2 rounded-full bg-navy sm:top-6 sm:right-6"
        />

        {badgeLabel ? (
          <p className="inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold tracking-wide text-navy uppercase">
            <DiamondIcon />
            <span className="truncate">{badgeLabel}</span>
          </p>
        ) : null}

        <h2
          id="marketplace-subscription-title"
          className="mt-4 text-xl font-bold tracking-tight text-navy sm:text-2xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        ) : null}

        {features.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-3">
            {features.map((feature) => (
              <MarketplaceSubscriptionFeature
                key={`${feature.icon}-${feature.title}`}
                {...feature}
              />
            ))}
          </ul>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white",
            "transition-colors hover:bg-navy/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
        >
          {ctaLabel}
          <ArrowIcon />
        </button>

        {reassuranceLabel ? (
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
            <ShieldCheckIcon />
            <span>{reassuranceLabel}</span>
          </p>
        ) : null}
      </section>

      <MarketplaceSubscriptionModal
        open={open}
        onClose={() => setOpen(false)}
        callbackUrl={callbackUrl}
        onInquirySuccess={onInquirySuccess}
        onPaid={onPaid}
      />
    </>
  )
}

export { MarketplaceSubscription }
