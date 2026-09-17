import type { Property } from "@/features/catalog/types"

import {
  BOOK_FURNISHED_PICKUP_PLACES,
  BOOK_FURNISHED_SERVICE_FEE_RATES,
  type BookFurnishedPickupPlace,
  type BookFurnishedPropertyAmounts,
} from "./types"

export function isBookFurnishedPickupPlace(
  value: string,
): value is BookFurnishedPickupPlace {
  return (BOOK_FURNISHED_PICKUP_PLACES as readonly string[]).includes(value)
}

export function todayIsoDate() {
  return toIsoDate(new Date())
}

export function addDaysIso(value: string, days: number) {
  const date = parseIsoDate(value)

  if (!date) {
    return value
  }

  date.setDate(date.getDate() + days)
  return toIsoDate(date)
}

export function countNights(checkIn: string, checkOut: string) {
  const start = parseIsoDate(checkIn)
  const end = parseIsoDate(checkOut)

  if (!start || !end) {
    return 0
  }

  const nights = Math.round((end.getTime() - start.getTime()) / 86_400_000)
  return nights > 0 ? nights : 0
}

export function getBookFurnishedNightlyPrice(property: Property) {
  if (property.nightlyPrice != null && property.nightlyPrice > 0) {
    return property.nightlyPrice
  }

  if (property.pricePeriod === "nuit" && property.price != null && property.price > 0) {
    return property.price
  }

  return 0
}

export function getBookFurnishedServiceFeeRate(
  isFurnished: boolean,
  userRole?: string | null,
) {
  if (!isFurnished) {
    return 0
  }

  const role = normalizeRoleName(userRole)

  if (role === "proprietaire") {
    return BOOK_FURNISHED_SERVICE_FEE_RATES.Proprietaire
  }

  if (role === "agent immobilier") {
    return BOOK_FURNISHED_SERVICE_FEE_RATES["Agent immobilier"]
  }

  return 0
}

export function computeBookFurnishedAmounts({
  property,
  checkIn,
  checkOut,
  userRole,
}: {
  property: Property
  checkIn: string
  checkOut: string
  userRole?: string | null
}): BookFurnishedPropertyAmounts {
  const nights = countNights(checkIn, checkOut)
  const nightlyPrice = getBookFurnishedNightlyPrice(property)
  const subtotal = nights * nightlyPrice
  const serviceFeeRate = getBookFurnishedServiceFeeRate(
    property.isFurnished,
    userRole,
  )
  const serviceFee = Math.round(subtotal * serviceFeeRate)
  const totalAmount = subtotal + serviceFee

  return {
    nights,
    nightlyPrice,
    subtotal,
    serviceFee,
    serviceFeeRate,
    totalAmount,
  }
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function parseIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null
  }

  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

function normalizeRoleName(role?: string | null) {
  return (
    role
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase() ?? ""
  )
}
