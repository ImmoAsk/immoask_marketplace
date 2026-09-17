import { cn } from "@/lib/cn"
import type {
  CatalogFilteringFormFieldIcon,
  CatalogFilteringFormFieldProps,
} from "../types"

function FieldIcon({ icon }: { icon: CatalogFilteringFormFieldIcon }) {
  if (icon === "map") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
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

  if (icon === "budget") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
        <rect
          x="2.5"
          y="6"
          width="19"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    )
  }

  if (icon === "bed") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
        <path
          d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9H21v9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 18h18M6 9V7.5A1.5 1.5 0 0 1 7.5 6h4A1.5 1.5 0 0 1 13 7.5V9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
      <path
        d="M5 20V7.5L12 4l7 3.5V20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-5h4v5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CatalogFilteringFormField({
  label,
  icon,
  children,
  className,
}: CatalogFilteringFormFieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy">
        <span className="text-primary">
          <FieldIcon icon={icon} />
        </span>
        {label}
      </p>
      {children}
    </div>
  )
}

export { CatalogFilteringFormField }
