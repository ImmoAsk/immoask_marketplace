import { cn } from "@/lib/cn"
import type { CatalogFilteringFormOfferTabsProps } from "../types"

export default function CatalogFilteringFormOfferTabs({
  items,
  value,
  onChange,
  className,
}: CatalogFilteringFormOfferTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Type d'offre"
      className={cn(
        "flex flex-wrap gap-1.5 rounded-full bg-white/80 p-1",
        className,
      )}
    >
      {items.map((item) => {
        const selected = item.id === value

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(item.id)}
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selected
                ? "bg-primary text-white"
                : "text-navy hover:bg-white hover:text-primary",
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export { CatalogFilteringFormOfferTabs }
