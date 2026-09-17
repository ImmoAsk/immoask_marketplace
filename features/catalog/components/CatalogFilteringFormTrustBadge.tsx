import { cn } from "@/lib/cn"
import type { CatalogFilteringFormTrustBadgeProps } from "../types"

function SealIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M12 3.5 19 6.5v5.2c0 4.6-3 7.6-7 8.8-4-1.2-7-4.2-7-8.8V6.5L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 12.1 11 14.3 15.3 10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CatalogFilteringFormTrustBadge({
  label,
  className,
}: CatalogFilteringFormTrustBadgeProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold text-warning",
        className,
      )}
    >
      <SealIcon />
      <span>{label}</span>
    </p>
  )
}

export { CatalogFilteringFormTrustBadge }
