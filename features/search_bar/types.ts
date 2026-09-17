import type { LeftSideCatalogFilteringProps } from "@/features/properties/types"

export type SearchBarProps = {
  name?: string
  action?: string
  placeholder?: string
  defaultValue?: string
  filterCount?: number
  country?: string
  transaction?: string
  filtering?: LeftSideCatalogFilteringProps
  className?: string
  onSearch?: (query: string) => void
  onFiltersClick?: () => void
}
