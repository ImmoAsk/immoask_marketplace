import Link from "next/link"

import Card from "@/components/ui/Card"
import type { Property } from "../types"
import PropertyImage from "./PropertyImage"

type PropertyCardProps = {
  href: string
  property: Property
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0">
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function BanknoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0">
      <rect x="2.5" y="6" width="19" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6 10.5v3M18 10.5v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function BedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-[18px] shrink-0">
      <path
        d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9H21v9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 18h18M3 14h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M6 9V7.5A1.5 1.5 0 0 1 7.5 6h4A1.5 1.5 0 0 1 13 7.5V9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BathIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-[18px] shrink-0">
      <path
        d="M4 12h16v3.5A3.5 3.5 0 0 1 16.5 19h-9A3.5 3.5 0 0 1 4 15.5V12z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M6 12V7.5A2.5 2.5 0 0 1 8.5 5H11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M7 19.5v1M17 19.5v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-[18px] shrink-0">
      <path
        d="M4 16.5h16V13l-2.2-5.2A2 2 0 0 0 15.9 6.5H8.1a2 2 0 0 0-1.9 1.3L4 13v3.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M4 16.5v2M20 16.5v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="7.5" cy="16.5" r="1.2" fill="currentColor" />
      <circle cx="16.5" cy="16.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

function formatPrice(price: number, period: Property["pricePeriod"]) {
  const amount = new Intl.NumberFormat("fr-FR").format(price)
  return period ? `${amount} XOF/${period}` : `${amount} XOF`
}

function toCardPrice(property: Property) {
  if (property.isFurnished && property.nightlyPrice != null) {
    return {
      price: property.nightlyPrice,
      period: "nuit" as const,
    }
  }

  return {
    price: property.price,
    period: property.pricePeriod,
  }
}

const OFFER_PHRASES: Record<string, string> = {
  louer: "à louer",
  location: "à louer",
  vendre: "à vendre",
  vente: "à vendre",
  bail: "en bail",
  investir: "à investir",
}

function toTypeOfferLabel(property: Property) {
  const type = property.propertyType?.trim()
  const phrase = OFFER_PHRASES[property.offreName?.trim().toLowerCase()]

  if (type && phrase) {
    return `${type} ${phrase}`
  }

  return type || phrase || property.title.trim() || "Bien immobilier"
}

function formatTitle(property: Property) {
  const typeOffer = toTypeOfferLabel(property)
  const headline = property.nuo ? `N°${property.nuo} : ${typeOffer}` : typeOffer

  return property.area != null ? `${headline} | ${property.area}m²` : headline
}

export default function PropertyCard({ href, property }: PropertyCardProps) {
  const image = property.images?.[0]
  const title = formatTitle(property)
  const cardPrice = toCardPrice(property)

  return (
    <Link
      href={href}
      aria-label={title}
      className="block h-full text-inherit no-underline"
    >
      <Card
        as="article"
        interactive
        className="h-full overflow-hidden rounded-3xl border-transparent shadow-[0_10px_36px_rgb(11_31_58_/_0.08)] hover:border-transparent"
      >
        <div className="relative">
          {image ? (
            <PropertyImage src={image} alt={title} />
          ) : (
            <div
              className="flex aspect-[16/10] items-center justify-center bg-primary-soft text-sm font-medium text-primary"
              aria-hidden="true"
            >
              ImmoAsk
            </div>
          )}

          {property.badge ? (
            <span className="absolute left-4 top-4 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-white">
              {property.badge}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2.5 px-5 pb-0 pt-5">
          {property.offerLabel ? (
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {property.offerLabel}
            </p>
          ) : null}

          <h2 className="text-base font-semibold leading-snug text-navy">
            {title}
          </h2>

          {property.location ? (
            <p className="flex items-center gap-2 text-sm text-muted">
              <MapPinIcon />
              <span>{property.location}</span>
            </p>
          ) : null}

          {cardPrice.price != null ? (
            <p className="flex items-center gap-2 text-sm font-medium text-navy/80">
              <BanknoteIcon />
              <span>{formatPrice(cardPrice.price, cardPrice.period)}</span>
            </p>
          ) : null}

          <div className="mt-1.5 flex items-center justify-evenly border-t border-border py-3.5 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              {property.bedrooms ?? 0}
              <BedIcon />
            </span>
            <span className="inline-flex items-center gap-1.5">
              {property.bathrooms ?? 0}
              <BathIcon />
            </span>
            <span className="inline-flex items-center gap-1.5">
              {property.parking ?? 0}
              <CarIcon />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
