import type { ReactNode } from "react"

export type CatalogIdFilters = {
  usage?: number
  categorie?: number
  ville?: number
  quartier?: number
  offre?: number
}

export type CatalogFilterQuery = {
  bedrooms?: string
  bathrooms?: string
  budgetMin?: string
  budgetMax?: string
  depositMonths?: string
  parking?: string
}

export type CatalogPageProps = {
  country: string
  transaction?: string
  segments?: string[]
  page?: number
  filterQuery?: CatalogFilterQuery
  idFilters?: CatalogIdFilters
  basePath?: string
}

export type CatalogMetadataProps = {
  country: string
  transaction?: string
  segments?: string[]
}

export type PricePeriod = "vie" | "mois" | "nuit"

export type Property = {
  id: number
  nuo: number
  country: string
  offreId: number | null
  offreName: string
  categorySlug: string
  citySlug: string
  districtSlug: string
  title: string
  price: number | null
  pricePeriod: PricePeriod | null
  nightlyPrice: number | null
  isFurnished: boolean
  description: string
  location: string
  bedrooms: number | null
  bathrooms: number | null
  parking: number | null
  area: number | null
  propertyType: string
  offerLabel: string
  badge: string | null
  images: string[] | null
}

export type CatalogFilteringFormOffer = "all" | "rent" | "sale" | "furnished"

export type CatalogFilteringFormOption = {
  value: string
  label: string
}

export type CatalogFilteringFormAmenity = {
  id: string
  label: string
}

export type CatalogFilteringFormValues = {
  offer: CatalogFilteringFormOffer
  propertyType: string
  location: string
  budget: string
  minBedrooms: number | null
  amenities: string[]
}

export type CatalogFilteringFormOfferTab = {
  id: CatalogFilteringFormOffer
  label: string
}

export type CatalogFilteringFormOfferTabsProps = {
  items: CatalogFilteringFormOfferTab[]
  value: CatalogFilteringFormOffer
  onChange: (id: CatalogFilteringFormOffer) => void
  className?: string
}

export type CatalogFilteringFormTrustBadgeProps = {
  label: string
  className?: string
}

export type CatalogFilteringFormFieldIcon =
  | "building"
  | "map"
  | "budget"
  | "bed"

export type CatalogFilteringFormFieldProps = {
  label: string
  icon: CatalogFilteringFormFieldIcon
  children: ReactNode
  className?: string
}

export type CatalogFilteringFormSelectProps = {
  name: string
  value: string
  options: CatalogFilteringFormOption[]
  onChange: (value: string) => void
  "aria-label"?: string
  className?: string
}

export type CatalogFilteringFormBedroomsProps = {
  options: number[]
  value: number | null
  onChange: (value: number | null) => void
  advancedLabel?: string
  onAdvancedClick?: () => void
  className?: string
}

export type CatalogFilteringFormAmenitiesProps = {
  items: CatalogFilteringFormAmenity[]
  value: string[]
  onChange: (value: string[]) => void
  className?: string
}

export type CatalogFilteringFormProps = {
  country?: string
  transaction?: string
  offerTabs: CatalogFilteringFormOfferTab[]
  propertyTypeOptions: CatalogFilteringFormOption[]
  locationOptions: CatalogFilteringFormOption[]
  budgetOptions: CatalogFilteringFormOption[]
  bedroomOptions?: number[]
  amenities: CatalogFilteringFormAmenity[]
  defaultValues?: Partial<CatalogFilteringFormValues>
  values?: CatalogFilteringFormValues
  resultCount?: number
  searchLabel?: string
  trustBadgeLabel?: string
  propertyTypeLabel?: string
  locationLabel?: string
  budgetLabel?: string
  bedroomsLabel?: string
  advancedLabel?: string
  onSubmit?: (values: CatalogFilteringFormValues) => void
  onAdvancedClick?: () => void
  className?: string
}

export type CatalogPaginationItem =
  | {
      type: "page"
      page: number
      href: string
      current?: boolean
    }
  | {
      type: "ellipsis"
      key: string
    }

export type CatalogPaginationProps = {
  from: number
  to: number
  total: number
  items: CatalogPaginationItem[]
  previousHref?: string
  nextHref?: string
  previousLabel?: string
  nextLabel?: string
  className?: string
}

export type CatalogMoreButtonProps = {
  href: string
  label: string
  className?: string
}