import Checkbox from "@/components/ui/Checkbox"
import { cn } from "@/lib/cn"
import type { CatalogFilteringFormAmenitiesProps } from "../types"

export default function CatalogFilteringFormAmenities({
  items,
  value,
  onChange,
  className,
}: CatalogFilteringFormAmenitiesProps) {
  function toggle(id: string) {
    if (value.includes(id)) {
      onChange(value.filter((item) => item !== id))
      return
    }

    onChange([...value, id])
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-2",
        className,
      )}
    >
      {items.map((item) => (
        <Checkbox
          key={item.id}
          name="amenities"
          value={item.id}
          checked={value.includes(item.id)}
          onChange={() => toggle(item.id)}
          label={item.label}
        />
      ))}
    </div>
  )
}

export { CatalogFilteringFormAmenities }
