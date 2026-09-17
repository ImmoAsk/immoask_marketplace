import { cn } from "@/lib/cn"
import type { PropertyDetailEquipmentProps } from "@/features/properties/types"

import PropertyDetailEquipmentItem from "./PropertyDetailEquipmentItem"

function GridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0 text-primary"
    >
      {[4.5, 10, 15.5].flatMap((y) =>
        [4.5, 10, 15.5].map((x) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="4"
            height="4"
            rx="0.8"
            fill="currentColor"
          />
        )),
      )}
    </svg>
  )
}

export default function PropertyDetailEquipment({
  title = "Équipements & Commodités inclus",
  countLabel,
  items,
  className,
}: PropertyDetailEquipmentProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section
      className={cn(
        "rounded-2xl bg-white p-5 shadow-card sm:p-6",
        className,
      )}
      aria-labelledby="property-detail-equipment-title"
    >
      <div className="flex items-start justify-between gap-3">
        <h2
          id="property-detail-equipment-title"
          className="flex min-w-0 items-center gap-2.5 text-lg font-bold tracking-tight text-navy"
        >
          <GridIcon />
          <span>{title}</span>
        </h2>

        {countLabel ? (
          <p className="shrink-0 pt-0.5 text-sm font-medium text-primary">
            {countLabel}
          </p>
        ) : null}
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <PropertyDetailEquipmentItem
            key={`${item.icon}-${item.label}`}
            {...item}
          />
        ))}
      </ul>
    </section>
  )
}

export { PropertyDetailEquipment }
