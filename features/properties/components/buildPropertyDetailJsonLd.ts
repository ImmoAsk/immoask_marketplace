import type {
  Property,
  PropertyDetailBreadcrumbItem,
} from "@/features/properties/types"
import { getCountry } from "@/lib/routing/countries"
import {
  IMMOASK_COVER_IMAGE,
  IMMOASK_SITE_URL,
  immoAskOrganizationJsonLd,
  immoAskWebSiteJsonLd,
  toAbsoluteUrl,
} from "@/lib/seo/site"

type PropertyDetailJsonLdInput = {
  property: Property
  title: string
  description: string
  path: string
  country: string
  breadcrumbs: PropertyDetailBreadcrumbItem[]
}

function toAccommodationType(propertyType?: string) {
  const value = propertyType
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase() ?? ""

  if (value.includes("terrain")) {
    return "Place"
  }

  if (value.includes("bureau") || value.includes("magasin")) {
    return "Place"
  }

  if (
    value.includes("appartement") ||
    value.includes("studio") ||
    value.includes("chambre")
  ) {
    return "Apartment"
  }

  if (
    value.includes("villa") ||
    value.includes("maison") ||
    value.includes("duplex")
  ) {
    return "House"
  }

  return "Accommodation"
}

function toBusinessFunction(offreName?: string) {
  const value = offreName?.trim().toLowerCase() ?? ""

  if (value === "vendre" || value === "vente" || value === "investir") {
    return "https://schema.org/SellAction"
  }

  return "https://schema.org/RentAction"
}

function toOffer(property: Property) {
  const price =
    property.salePrice ??
    property.monthlyPrice ??
    property.nightlyPrice ??
    property.price

  if (price == null) {
    return undefined
  }

  const unitCode =
    property.salePrice != null
      ? undefined
      : property.monthlyPrice != null
        ? "MON"
        : property.nightlyPrice != null
          ? "DAY"
          : undefined

  return {
    "@type": "Offer",
    price,
    priceCurrency: "XOF",
    availability:
      property.isAvailable === false
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
    businessFunction: toBusinessFunction(property.offreName),
    ...(unitCode
      ? {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price,
            priceCurrency: "XOF",
            unitCode,
          },
        }
      : {}),
  }
}

function toBreadcrumbList(items: PropertyDetailBreadcrumbItem[]) {
  const elements = items
    .map((item, index) => {
      if (!item.label) {
        return null
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...(item.href ? { item: toAbsoluteUrl(item.href) } : {}),
      }
    })
    .filter(Boolean)

  if (elements.length === 0) {
    return null
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: elements,
  }
}

export function buildPropertyDetailJsonLd({
  property,
  title,
  description,
  path,
  country,
  breadcrumbs,
}: PropertyDetailJsonLdInput) {
  const url = toAbsoluteUrl(path)
  const countryName =
    getCountry(property.countryCode ?? country)?.name ?? country.toUpperCase()
  const images = (property.images ?? [])
    .filter(Boolean)
    .map((src) => toAbsoluteUrl(src))
  const offer = toOffer(property)
  const breadcrumb = toBreadcrumbList(breadcrumbs)
  const accommodationType = toAccommodationType(property.propertyType)

  return {
    "@context": "https://schema.org",
    "@graph": [
      immoAskOrganizationJsonLd(),
      immoAskWebSiteJsonLd(),
      {
        "@type": ["RealEstateListing", accommodationType],
        "@id": `${url}#listing`,
        name: title,
        headline: title,
        description,
        url,
        inLanguage: "fr",
        identifier: property.nuo ? `REF-IMMO-${property.nuo}` : String(property.id),
        sku: property.nuo ? String(property.nuo) : undefined,
        category: property.propertyType || "Bien immobilier",
        image: images.length > 0 ? images : [toAbsoluteUrl(IMMOASK_COVER_IMAGE)],
        isPartOf: { "@id": `${IMMOASK_SITE_URL}/#website` },
        publisher: { "@id": `${IMMOASK_SITE_URL}/#organization` },
        address: {
          "@type": "PostalAddress",
          streetAddress: property.addressLabel || property.location || undefined,
          addressLocality: property.cityName || undefined,
          addressRegion: property.districtName || undefined,
          addressCountry: countryName,
        },
        ...(property.latitude != null && property.longitude != null
          ? {
              geo: {
                "@type": "GeoCoordinates",
                latitude: property.latitude,
                longitude: property.longitude,
              },
            }
          : {}),
        ...(property.bedrooms != null
          ? { numberOfRooms: property.bedrooms, numberOfBedrooms: property.bedrooms }
          : {}),
        ...(property.bathrooms != null
          ? { numberOfBathroomsTotal: property.bathrooms }
          : {}),
        ...(property.area != null
          ? {
              floorSize: {
                "@type": "QuantitativeValue",
                value: property.area,
                unitCode: "MTK",
              },
            }
          : {}),
        ...(property.agent?.name
          ? {
              seller: {
                "@type": "RealEstateAgent",
                name: property.agent.name,
                jobTitle: property.agent.roleName || property.agent.title,
              },
            }
          : {}),
        ...(offer ? { offers: offer } : {}),
        ...(breadcrumb ? { breadcrumb } : {}),
      },
    ],
  }
}
