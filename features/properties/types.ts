import type {
  BookFurnishedPropertyProperty,
  BookFurnishedPropertyValues,
} from "@/features/book_property/types"
import type { PropertyInquiryFormInput } from "@/features/inquiry/types"
import type { PayNowResult } from "@/features/payment/types"
import type {
  VisitPropertyTourProperty,
  VisitPropertyTourValues,
} from "@/features/visit_property_tour/types"
import type { SendPropertyInquiryResult } from "@/lib/api/types"

export interface Property {
  id: number
  nuo?: number
  title: string
  description: string
  propertyType: string
  location: string
  price: number | null
  monthlyPrice: number | null
  salePrice: number | null
  nightlyPrice: number | null
  visitFee: number | null
  isFurnished?: boolean
  depositMonths: number | null
  bedrooms: number | null
  bathrooms: number | null
  livingRooms: number | null
  parking: number | null
  area: number | null
  landArea?: number | null
  images: string[]
  badges: string[]
  countryCode?: string
  offreId?: number | null
  offreName?: string
  categorySlug?: string
  cityName?: string
  citySlug?: string
  districtName?: string
  districtSlug?: string
  superCategory?: string
  status?: number | null
  isAvailable?: boolean
  constructionYear?: number | null
  papierPropriete?: string | null
  latitude: number | null
  longitude: number | null
  addressLabel?: string
  infrastructures?: PropertyInfrastructure[]
  agent?: PropertyAgent
}

export type PropertyInfrastructure = {
  name: string
  type?: string | null
  iconName?: string | null
  latitude?: number | null
  longitude?: number | null
}

export type PropertyAgent = {
  id?: number | null
  name: string
  avatarUrl?: string
  title?: string
  organisationName?: string
  roleName?: string
}

export type PropertyDetailProps = {
  propertyNuo: number
  country: string
  transaction: string
  segments: string[]
}

export type PropertyDetailBreadcrumbItem = {
  label: string
  href?: string
}

export type PropertyDetailBreadcrumbProps = {
  items: PropertyDetailBreadcrumbItem[]
  whatsappHref: string
  whatsappLabel?: string
  saveLabel?: string
  saved?: boolean
  onSave?: () => void
  pdfLabel?: string
  onPrintPdf?: () => void
  className?: string
}

export type PropertyGalleryImage = {
  src: string
  alt: string
  label?: string
}

export type PropertyGalleryBadgeVariant = "verified" | "exclusive" | "default"

export type PropertyGalleryBadge = {
  label: string
  variant?: PropertyGalleryBadgeVariant
}

export type PropertyDetailGalleryProps = {
  images: PropertyGalleryImage[]
  title?: string
  address?: string
  caption?: string
  badges?: PropertyGalleryBadge[]
  totalCount?: number
  viewAllLabel?: string
  onImageClick?: (index: number) => void
  onViewAll?: () => void
  className?: string
}

export type PropertyDetailLightInformationHighlightIcon =
  | "shield"
  | "verified"
  | "certified"

export type PropertyDetailLightInformationHighlight = {
  icon: PropertyDetailLightInformationHighlightIcon
  title: string
  subtitle: string
}

export type PropertyDetailLightInformationHighlightProps =
  PropertyDetailLightInformationHighlight & {
    className?: string
  }

export type PropertyDetailAvailabilityTone = "available" | "occupied"

export type PropertyDetailLightInformationProps = {
  title: string
  categoryLabel?: string
  reference?: string
  availabilityLabel?: string
  availabilityTone?: PropertyDetailAvailabilityTone
  address?: string
  constructionYearLabel?: string
  highlights?: PropertyDetailLightInformationHighlight[]
  className?: string
}

export type PropertyDetailLightFeatureIcon =
  | "bedrooms"
  | "bathrooms"
  | "livingRooms"
  | "garages"
  | "livingArea"
  | "landArea"

export type PropertyDetailLightFeature = {
  icon: PropertyDetailLightFeatureIcon
  value: string | number
  label: string
}

export type PropertyDetailLightFeatureProps = PropertyDetailLightFeature & {
  className?: string
}

export type PropertyDetailLightFeaturesProps = {
  features: PropertyDetailLightFeature[]
  className?: string
}

export type PropertyDetailDescriptionCalloutIcon = "bolt"

export type PropertyDetailDescriptionCallout = {
  icon?: PropertyDetailDescriptionCalloutIcon
  title: string
  description: string
}

export type PropertyDetailDescriptionCalloutProps =
  PropertyDetailDescriptionCallout & {
    className?: string
  }

export type PropertyDetailDescriptionProps = {
  title?: string
  paragraphs: string[]
  callout?: PropertyDetailDescriptionCallout
  className?: string
}

export type PropertyDetailPricingExtra = {
  label: string
  subtitle?: string
  amountLabel: string
}

export type PropertyDetailPricingProps = {
  periodLabel: string
  amountLabel: string
  unitLabel?: string
  certifiedLabel?: string
  note?: string
  extras?: PropertyDetailPricingExtra[]
  className?: string
}

export type PropertyDetailConditionItem = {
  label: string
  value: string
  emphasized?: boolean
}

export type PropertyDetailConditionProps = {
  title?: string
  items: PropertyDetailConditionItem[]
  className?: string
}

export type PropertyDetailEquipmentIcon =
  | "pool"
  | "ac"
  | "wifi"
  | "garage"
  | "solar"
  | "well"
  | "security"
  | "annex"

export type PropertyDetailEquipmentItem = {
  icon: PropertyDetailEquipmentIcon
  label: string
}

export type PropertyDetailEquipmentItemProps = PropertyDetailEquipmentItem & {
  className?: string
}

export type PropertyDetailEquipmentProps = {
  title?: string
  countLabel?: string
  items: PropertyDetailEquipmentItem[]
  className?: string
}

export type PropertyDetailLocationCoordinates = {
  latitude: number
  longitude: number
}

export type PropertyDetailLocationLandmark = {
  title?: string
  description: string
}

export type PropertyDetailLocationLandmarkProps =
  PropertyDetailLocationLandmark & {
    className?: string
  }

export type PropertyDetailLocationMapProps = {
  latitude: number
  longitude: number
  zoom?: number
  className?: string
}

export type PropertyDetailLocationProps = {
  title?: string
  subtitle?: string
  accessLabel?: string
  coordinates?: PropertyDetailLocationCoordinates
  zoom?: number
  landmark?: PropertyDetailLocationLandmark
  className?: string
}

export type PropertyDetailInfrastructureIcon =
  | "schools"
  | "airport"
  | "supermarket"
  | "clinic"
  | "place"

export type PropertyDetailInfrastructureItem = {
  icon: PropertyDetailInfrastructureIcon
  title: string
  description: string
}

export type PropertyDetailInfrastructureItemProps =
  PropertyDetailInfrastructureItem & {
    className?: string
  }

export type PropertyDetailInfrastructureProps = {
  items: PropertyDetailInfrastructureItem[]
  className?: string
}

export type PropertyDetailVisitTourProps = {
  property: VisitPropertyTourProperty
  propertyHref: string
  title?: string
  note?: string
  submitLabel?: string
  disabled?: boolean
  onSubmit?: (values: VisitPropertyTourValues) => Promise<void> | void
  className?: string
}

export type PropertyDetailBookFurnishedPropertyProps = {
  property: BookFurnishedPropertyProperty
  propertyHref: string
  title?: string
  note?: string
  submitLabel?: string
  disabled?: boolean
  userRole?: string | null
  onSubmit?: (values: BookFurnishedPropertyValues) => Promise<void> | void
  className?: string
}

export type PropertyDetailRealEstateAgencyProps = {
  label?: string
  name: string
  title?: string
  location?: string
  avatarSrc?: string
  verified?: boolean
  rating?: number
  reviewCount?: number
  mandatesCount?: number
  className?: string
}

export type MarketplaceSubscriptionFeatureIcon = "agents" | "assistant" | "vip"

export type MarketplaceSubscriptionFeature = {
  icon: MarketplaceSubscriptionFeatureIcon
  title: string
  description: string
}

export type MarketplaceSubscriptionFeatureProps =
  MarketplaceSubscriptionFeature & {
    className?: string
  }

export type MarketplaceSubscriptionPlan = {
  id: string
  name: string
  priceLabel: string
  periodLabel?: string
  description?: string
  highlighted?: boolean
}

export type MarketplaceSubscriptionPurchase = {
  planId: string
  name: string
  email: string
  phone: string
}

export type MarketplaceSubscriptionModalStep =
  | "inquiry"
  | "plan"
  | "pay"
  | "feedback"

export type MarketplaceSubscriptionModalProps = {
  open: boolean
  onClose: () => void
  callbackUrl?: string
  className?: string
  onInquirySuccess?: (
    result: SendPropertyInquiryResult,
    input: PropertyInquiryFormInput,
  ) => void
  onPaid?: (result: PayNowResult) => void
}

export type MarketplaceSubscriptionProps = {
  badgeLabel?: string
  title?: string
  description?: string
  features?: MarketplaceSubscriptionFeature[]
  ctaLabel?: string
  reassuranceLabel?: string
  plans?: MarketplaceSubscriptionPlan[]
  modalTitle?: string
  modalDescription?: string
  callbackUrl?: string
  className?: string
  onInquirySuccess?: MarketplaceSubscriptionModalProps["onInquirySuccess"]
  onPaid?: (result: PayNowResult) => void
}

export type CatalogHeaderBreadcrumbItem = {
  label: string
  href?: string
}

export type CatalogHeaderProps = {
  items: CatalogHeaderBreadcrumbItem[]
  title?: string
  subtitle?: string
  countLabel?: string
  className?: string
}

export type CatalogFilteringInquiryChip = {
  id: string
  label: string
  href?: string
}

export type CatalogFilteringInquirySortOption = {
  value: string
  label: string
}

export type CatalogFilteringInquiryView = "grid" | "map"

export type CatalogFilteringInquiryProps = {
  title?: string
  resultCount?: number
  countLabel?: string
  filtersLabel?: string
  chips?: CatalogFilteringInquiryChip[]
  clearAllLabel?: string
  clearAllHref?: string
  sortLabel?: string
  sortValue?: string
  sortOptions?: CatalogFilteringInquirySortOption[]
  view?: CatalogFilteringInquiryView
  gridLabel?: string
  mapLabel?: string
  onRemoveChip?: (id: string) => void
  onClearAll?: () => void
  onSortChange?: (value: string) => void
  onViewChange?: (view: CatalogFilteringInquiryView) => void
  className?: string
}

export type CatalogMapViewProps = {
  latitude?: number
  longitude?: number
  zoom?: number
  message?: string
  className?: string
}

export type LeftSideCatalogFilteringDemand = "rent" | "sale" | "lease"

export type LeftSideCatalogFilteringOption = {
  value: string
  label: string
}

export type LeftSideCatalogFilteringCityOption =
  LeftSideCatalogFilteringOption & {
    id?: string
  }

export type LeftSideCatalogFilteringDistrictOption =
  LeftSideCatalogFilteringOption & {
    city: string
    id?: string
  }

export type LeftSideCatalogFilteringDemandOption = {
  id: LeftSideCatalogFilteringDemand
  label: string
}

export type LeftSideCatalogFilteringValues = {
  demand: LeftSideCatalogFilteringDemand
  city: string
  district: string
  propertyType: string
  bedrooms: string
  bathrooms: string
  budgetMin: string
  budgetMax: string
  depositMonths: string
  parking: string
}

export type LeftSideCatalogFilteringProps = {
  country?: string
  transaction?: string
  demandTitle?: string
  demandOptions?: LeftSideCatalogFilteringDemandOption[]
  geographyTitle?: string
  cityLabel?: string
  cityPlaceholder?: string
  cityOptions: LeftSideCatalogFilteringCityOption[]
  districtLabel?: string
  districtPlaceholder?: string
  districtOptions: LeftSideCatalogFilteringDistrictOption[]
  propertyTypeTitle?: string
  propertyTypePlaceholder?: string
  propertyTypeOptions: LeftSideCatalogFilteringOption[]
  roomsTitle?: string
  bedroomsPlaceholder?: string
  bathroomsPlaceholder?: string
  budgetTitle?: string
  budgetMinPlaceholder?: string
  budgetMaxPlaceholder?: string
  depositTitle?: string
  depositPlaceholder?: string
  parkingTitle?: string
  parkingPlaceholder?: string
  submitLabel?: string
  defaultValues?: Partial<LeftSideCatalogFilteringValues>
  values?: LeftSideCatalogFilteringValues
  onSubmit?: (values: LeftSideCatalogFilteringValues) => void
  className?: string
}
