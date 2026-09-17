"use client"

import Button from "@/components/ui/Button"
import { cn } from "@/lib/cn"
import type {
  TemplateSubscriptionColumnProps,
  TemplateSubscriptionSalesPoint,
} from "@/features/subscriptions/types"

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0 text-primary"
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
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

function toSalesPoint(
  item: string | TemplateSubscriptionSalesPoint,
): TemplateSubscriptionSalesPoint {
  return typeof item === "string" ? { label: item } : item
}

export default function TemplateSubscriptionColumn({
  lightTitle,
  namePricing,
  subscription_amount,
  subscription_amount_xof,
  salesPoints,
  highlighted = false,
  selected = false,
  ctaLabel,
  ctaHref,
  onSelect,
  className,
}: TemplateSubscriptionColumnProps) {
  const points = salesPoints.map(toSalesPoint)
  const isActive = selected || highlighted

  return (
    <article
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-pressed={onSelect ? selected : undefined}
      onClick={onSelect}
      onKeyDown={
        onSelect
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onSelect()
              }
            }
          : undefined
      }
      className={cn(
        "flex h-full flex-col rounded-2xl border bg-white p-5 shadow-card sm:p-6",
        isActive ? "border-primary ring-1 ring-primary/20" : "border-border",
        onSelect && "cursor-pointer",
        className,
      )}
    >
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        {lightTitle}
      </p>
      <p className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
        {subscription_amount}
      </p>
      {subscription_amount_xof ? (
        <p className="mt-1 text-sm font-semibold text-muted">
          {subscription_amount_xof}
        </p>
      ) : null}
      <p className="mt-2 text-sm leading-relaxed text-muted">{namePricing}</p>

      {points.length > 0 ? (
        <ul className="mt-5 flex flex-col gap-3">
          {points.map((point) => {
            const variant = point.variant ?? "point"
            const key = `${variant}-${point.label}`

            if (variant === "intro") {
              return (
                <li
                  key={key}
                  className="text-sm leading-relaxed font-medium text-navy"
                >
                  {point.label}
                </li>
              )
            }

            if (variant === "heading") {
              return (
                <li
                  key={key}
                  className="pt-2 text-xs font-semibold tracking-wide text-navy uppercase"
                >
                  {point.label}
                </li>
              )
            }

            if (variant === "note") {
              return (
                <li key={key} className="text-xs leading-relaxed text-muted">
                  {point.label}
                </li>
              )
            }

            return (
              <li
                key={key}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-navy"
              >
                <CheckIcon />
                <span>{point.label}</span>
              </li>
            )
          })}
        </ul>
      ) : null}

      {ctaLabel && (ctaHref || onSelect) ? (
        <div className="mt-auto pt-6">
          {ctaHref ? (
            <Button href={ctaHref} className="w-full">
              {ctaLabel}
            </Button>
          ) : (
            <Button
              type="button"
              className="w-full"
              onClick={(event) => {
                event.stopPropagation()
                onSelect?.()
              }}
            >
              {ctaLabel}
            </Button>
          )}
        </div>
      ) : null}
    </article>
  )
}

export { TemplateSubscriptionColumn }
