import type { Property } from "@/features/catalog/types"
import type {
  PayFurnishedPropertyGuest,
  PayNowResult,
} from "@/features/payment/types"
import type {
  JsonObject,
  SendTemplateEmailInput,
  SendTemplateEmailResult,
} from "@/lib/api/types"

export type BookFurnishedPropertyProperty = Property & {
  roleName?: string | null
  proprietaireId?: number | null
}

export const BOOK_FURNISHED_PICKUP_PLACES = [
  "Bureau",
  "Sur place",
  "Aeroport",
] as const

export type BookFurnishedPickupPlace =
  (typeof BOOK_FURNISHED_PICKUP_PLACES)[number]

export const BOOK_FURNISHED_PICKUP_PLACE_OPTIONS: ReadonlyArray<{
  value: BookFurnishedPickupPlace
  label: string
}> = [
  { value: "Bureau", label: "Bureau" },
  { value: "Sur place", label: "Sur place" },
  { value: "Aeroport", label: "Aéroport" },
]

export const BOOK_FURNISHED_SERVICE_FEE_RATES = {
  Proprietaire: 0.1,
  "Agent immobilier": 0.15,
} as const

export type BookFurnishedFeeUserRole =
  keyof typeof BOOK_FURNISHED_SERVICE_FEE_RATES

export type BookFurnishedPropertyField =
  | "travelersNumber"
  | "pickUpPlace"
  | "checkIn"
  | "checkOut"

export type BookFurnishedPropertyAmounts = {
  nights: number
  nightlyPrice: number
  subtotal: number
  serviceFee: number
  serviceFeeRate: number
  totalAmount: number
}

export type BookFurnishedPropertyValues = BookFurnishedPropertyAmounts & {
  travelersNumber: number
  pickUpPlace: BookFurnishedPickupPlace
  checkIn: string
  checkOut: string
  userRole: string | null
  isFurnished: boolean
  propertyId: number
  nuo: number
}

export type BookFurnishedPropertyErrors = Partial<
  Record<BookFurnishedPropertyField, string>
>

export type BookFurnishedPropertyProps = {
  property: BookFurnishedPropertyProperty
  propertyHref: string
  userRole?: string | null
  title?: string
  travelersNumberLabel?: string
  pickUpPlaceLabel?: string
  checkInLabel?: string
  checkOutLabel?: string
  serviceFeeLabel?: string
  totalAmountLabel?: string
  defaultTravelersNumber?: number
  defaultPickUpPlace?: BookFurnishedPickupPlace
  defaultCheckIn?: string
  defaultCheckOut?: string
  minDate?: string
  submitLabel?: string
  pending?: boolean
  disabled?: boolean
  onSubmit?: (values: BookFurnishedPropertyValues) => Promise<void> | void
  className?: string
}

export type BookFurnishedPropertyStep = "book" | "pay" | "feedback"

export type BookFurnishedPropertyModalProps = {
  open: boolean
  onClose: () => void
  property: BookFurnishedPropertyProperty
  propertyHref: string
  userRole?: string | null
  guest?: PayFurnishedPropertyGuest | null
  submitLabel?: string
  onSubmit?: (values: BookFurnishedPropertyValues) => Promise<void> | void
  onPaid?: (
    result: PayNowResult,
    values: BookFurnishedPropertyValues,
  ) => Promise<void> | void
}

export type BookFurnishedEmailVariables = JsonObject

export type BookFurnishedSendTemplateEmailInput<
  TVariables extends BookFurnishedEmailVariables = BookFurnishedEmailVariables,
> = SendTemplateEmailInput<TVariables>

export type BookFurnishedSendTemplateEmailResult = SendTemplateEmailResult
