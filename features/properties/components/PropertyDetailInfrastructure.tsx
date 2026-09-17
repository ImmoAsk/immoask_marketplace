import { cn } from "@/lib/cn"
import type { PropertyDetailInfrastructureProps } from "@/features/properties/types"

import PropertyDetailInfrastructureItem from "./PropertyDetailInfrastructureItem"
import PropertyDetailSubscriptionGate from "./PropertyDetailSubscriptionGate"

export default function PropertyDetailInfrastructure({
  items,
  className,
}: PropertyDetailInfrastructureProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <PropertyDetailSubscriptionGate className="min-h-[6.5rem] rounded-2xl">
      <ul
        className={cn(
          "grid grid-cols-1 gap-3 sm:grid-cols-2",
          items.length >= 4 && "lg:grid-cols-4",
          items.length === 3 && "lg:grid-cols-3",
          className,
        )}
      >
        {items.map((item) => (
          <PropertyDetailInfrastructureItem
            key={`${item.icon}-${item.title}`}
            {...item}
          />
        ))}
      </ul>
    </PropertyDetailSubscriptionGate>
  )
}

export { PropertyDetailInfrastructure }
