import Badge from "@/components/ui/Badge"
import Separator from "@/components/ui/Separator"
import { cn } from "@/lib/cn"
import type {
  PropertyDetailPricingExtra,
  PropertyDetailPricingProps,
} from "@/features/properties/types"

function CertifiedCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0 text-primary"
    >
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
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

function PricingExtraRow({ extra }: { extra: PropertyDetailPricingExtra }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3">
      <div className="flex min-w-0 items-start gap-2.5">
        <CertifiedCheckIcon />
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-navy">
            {extra.label}
          </span>
          {extra.subtitle ? (
            <span className="mt-0.5 block text-xs text-muted">
              {extra.subtitle}
            </span>
          ) : null}
        </span>
      </div>

      <p className="shrink-0 text-sm font-bold text-navy">{extra.amountLabel}</p>
    </div>
  )
}

export default function PropertyDetailPricing({
  periodLabel,
  amountLabel,
  unitLabel,
  certifiedLabel,
  note,
  extras,
  className,
}: PropertyDetailPricingProps) {
  return (
    <section
      className={cn(
        "rounded-2xl bg-white p-5 shadow-card sm:p-6",
        className,
      )}
      aria-label="Tarification"
    >
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        {periodLabel}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="text-3xl font-bold tracking-tight text-navy sm:text-[2rem]">
          {amountLabel}
          {unitLabel ? (
            <span className="ml-2 text-base font-semibold text-navy">
              {" "}
              {unitLabel}
            </span>
          ) : null}
        </p>

        {certifiedLabel ? (
          <Badge className="rounded-md px-2.5 py-1">{certifiedLabel}</Badge>
        ) : null}
      </div>

      {note ? (
        <p className="mt-2 text-sm text-muted">{note}</p>
      ) : null}

      {extras && extras.length > 0 ? (
        <>
          <Separator className="my-4" />

          <div className="flex flex-col gap-2">
            {extras.map((extra) => (
              <PricingExtraRow key={extra.label} extra={extra} />
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}

export { PropertyDetailPricing }
