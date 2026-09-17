import Avatar from "@/components/ui/Avatar"
import { cn } from "@/lib/cn"
import type { PropertyDetailRealEstateAgencyProps } from "@/features/properties/types"

import PropertyDetailSubscriptionGate from "./PropertyDetailSubscriptionGate"

function VerifiedBadge() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <circle cx="10" cy="10" r="8" fill="currentColor" className="text-primary" />
      <path
        d="M6.6 10.2 8.8 12.4 13.4 7.7"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0 text-warning"
    >
      <path
        d="M10 2.8 12.1 7l4.7.7-3.4 3.3.8 4.7L10 13.5 5.8 15.7l.8-4.7L3.2 7.7 7.9 7 10 2.8Z"
        fill="currentColor"
      />
    </svg>
  )
}

function formatRating(value: number) {
  return value.toFixed(1)
}

export default function PropertyDetailRealEstateAgency({
  label = "Mis en location par un agent immobilier",
  name,
  title,
  location,
  avatarSrc,
  verified = true,
  rating,
  reviewCount,
  mandatesCount,
  className,
}: PropertyDetailRealEstateAgencyProps) {
  const subtitle = [title, location].filter(Boolean).join(" • ")
  const hasStats = rating != null || reviewCount != null || mandatesCount != null

  return (
    <section
      className={cn("rounded-2xl bg-surface p-5 shadow-card sm:p-6", className)}
      aria-label={label}
    >
      <p className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
        {label}
      </p>

      <PropertyDetailSubscriptionGate className="mt-4 min-h-[7.5rem]">
        <div className="flex items-center gap-3">
          <Avatar src={avatarSrc} name={name} size="lg" />

          <div className="min-w-0">
            <p className="flex min-w-0 items-center gap-1.5 text-base font-bold tracking-tight text-navy">
              <span className="truncate">{name}</span>
              {verified ? (
                <span className="inline-flex" title="Vérifié">
                  <VerifiedBadge />
                  <span className="sr-only">Vérifié</span>
                </span>
              ) : null}
            </p>

            {subtitle ? (
              <p className="mt-0.5 truncate text-sm text-muted">{subtitle}</p>
            ) : null}
          </div>
        </div>

        {hasStats ? (
          <div className="mt-4 flex items-center justify-between gap-3 text-sm">
            {rating != null || reviewCount != null ? (
              <p className="flex min-w-0 items-center gap-1.5">
                {rating != null ? <StarIcon /> : null}
                {rating != null ? (
                  <span className="font-bold text-navy">{formatRating(rating)}</span>
                ) : null}
                {reviewCount != null ? (
                  <span className="text-muted">
                    ({reviewCount} avis vérifiés)
                  </span>
                ) : null}
              </p>
            ) : null}

            {mandatesCount != null ? (
              <p className="shrink-0">
                <span className="font-bold text-navy">{mandatesCount}</span>
                <span className="text-muted"> mandats conclus</span>
              </p>
            ) : null}
          </div>
        ) : null}
      </PropertyDetailSubscriptionGate>
    </section>
  )
}

export { PropertyDetailRealEstateAgency }
