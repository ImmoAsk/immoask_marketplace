import { cn } from "@/lib/cn"
import type { CatalogFilteringFormBedroomsProps } from "../types"

function SlidersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4"
    >
      <path
        d="M4 7h16M7 12h10M9.5 17h5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="9" cy="7" r="1.6" fill="currentColor" />
      <circle cx="15" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="17" r="1.6" fill="currentColor" />
    </svg>
  )
}

export default function CatalogFilteringFormBedrooms({
  options,
  value,
  onChange,
  advancedLabel = "Filtres avancés",
  onAdvancedClick,
  className,
}: CatalogFilteringFormBedroomsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex min-w-0 flex-1 overflow-hidden rounded-xl border border-border bg-white">
        {options.map((option) => {
          const selected = value === option

          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(selected ? null : option)}
              className={cn(
                "h-12 flex-1 text-sm font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                selected
                  ? "bg-primary-soft text-primary"
                  : "text-navy hover:bg-surface",
              )}
            >
              {option}+
            </button>
          )
        })}
      </div>

      <button
        type="button"
        aria-label={advancedLabel}
        onClick={onAdvancedClick}
        className={cn(
          "inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-navy",
          "transition-colors hover:border-primary/40 hover:bg-primary-soft",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
      >
        <SlidersIcon />
      </button>
    </div>
  )
}

export { CatalogFilteringFormBedrooms }
