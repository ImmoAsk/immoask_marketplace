import { cn } from "@/lib/cn"
import type { CatalogFilteringFormSelectProps } from "../types"

export default function CatalogFilteringFormSelect({
  name,
  value,
  options,
  onChange,
  "aria-label": ariaLabel,
  className,
}: CatalogFilteringFormSelectProps) {
  return (
    <span className="relative block w-full">
      <select
        name={name}
        value={value}
        aria-label={ariaLabel}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-12 w-full appearance-none rounded-xl border border-border bg-white px-3.5 pr-10 text-sm font-medium text-navy",
          "transition-colors hover:border-primary/40",
          "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
      >
        {options.map((option) => (
          <option key={option.value || option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center text-subtle"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-4">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  )
}

export { CatalogFilteringFormSelect }
