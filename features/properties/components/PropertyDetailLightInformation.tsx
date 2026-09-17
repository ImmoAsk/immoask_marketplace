import { cn } from "@/lib/cn"
import type { PropertyDetailLightInformationProps } from "@/features/properties/types"

import PropertyDetailLightInformationHighlight from "./PropertyDetailLightInformationHighlight"

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <rect
        x="4"
        y="5.5"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8 3.5v4M16 3.5v4M4 10.5h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function PropertyDetailLightInformation({
  title,
  categoryLabel,
  reference,
  availabilityLabel,
  availabilityTone = "available",
  address,
  constructionYearLabel,
  highlights = [],
  className,
}: PropertyDetailLightInformationProps) {
  const hasHeaderMeta = Boolean(categoryLabel || reference || availabilityLabel)
  const hasLocationMeta = Boolean(address || constructionYearLabel)

  return (
    <section
      className={cn(
        "rounded-2xl bg-white p-5 shadow-card sm:p-6",
        className,
      )}
      aria-labelledby="property-detail-light-information-title"
    >
      <div className="flex flex-col gap-4">
        {hasHeaderMeta ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {categoryLabel ? (
                <span className="inline-flex max-w-full items-center rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold tracking-wide text-primary uppercase">
                  {categoryLabel}
                </span>
              ) : null}

              {reference ? (
                <span className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-[11px] font-semibold tracking-wide text-muted uppercase">
                  {reference}
                </span>
              ) : null}
            </div>

            {availabilityLabel ? (
              <p
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-medium",
                  availabilityTone === "occupied"
                    ? "text-warning"
                    : "text-success",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    availabilityTone === "occupied"
                      ? "bg-warning"
                      : "bg-success",
                  )}
                />
                {availabilityLabel}
              </p>
            ) : null}
          </div>
        ) : null}

        <h1
          id="property-detail-light-information-title"
          className="text-2xl leading-snug font-bold tracking-tight text-navy sm:text-[1.75rem]"
        >
          {title}
        </h1>

        {hasLocationMeta ? (
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            {address ? (
              <span className="inline-flex min-w-0 items-center gap-1.5">
                <MapPinIcon />
                <span>{address}</span>
              </span>
            ) : null}

            {address && constructionYearLabel ? (
              <span aria-hidden="true" className="hidden text-subtle sm:inline">
                –
              </span>
            ) : null}

            {constructionYearLabel ? (
              <span className="inline-flex items-center gap-1.5">
                <CalendarIcon />
                <span>{constructionYearLabel}</span>
              </span>
            ) : null}
          </p>
        ) : null}

        {highlights.length > 0 ? (
          <div
            className="grid gap-3 md:grid-cols-3"
            aria-label="Garanties et certifications du bien"
          >
            {highlights.map((highlight) => (
              <PropertyDetailLightInformationHighlight
                key={`${highlight.icon}-${highlight.title}`}
                {...highlight}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export { PropertyDetailLightInformation }
