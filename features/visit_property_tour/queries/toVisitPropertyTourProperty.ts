import type { Property } from "@/features/properties/types"
import type { VisitPropertyTourProperty } from "@/features/visit_property_tour/types"

const OFFER_LABELS: Record<string, string> = {
  vendre: "ACQUISITION",
  vente: "ACQUISITION",
  louer: "LOCATION",
  location: "LOCATION",
  bail: "BAIL",
  investir: "INVESTISSEMENT",
}

export function toVisitPropertyTourProperty(
  property: Property,
): VisitPropertyTourProperty {
  const salePrice = property.salePrice
  const monthlyPrice = property.monthlyPrice
  const nightlyPrice = property.nightlyPrice
  const price = salePrice ?? monthlyPrice ?? property.price
  const pricePeriod =
    salePrice != null
      ? "vie"
      : monthlyPrice != null
        ? "mois"
        : nightlyPrice != null
          ? "nuit"
          : null

  return {
    id: property.id,
    nuo: property.nuo ?? 0,
    country: property.countryCode ?? "",
    offreId: property.offreId ?? null,
    offreName: property.offreName ?? "",
    categorySlug: property.categorySlug ?? property.propertyType,
    citySlug: property.citySlug ?? "",
    districtSlug: property.districtSlug ?? "",
    title: property.title,
    price,
    pricePeriod,
    nightlyPrice,
    isFurnished: Boolean(property.isFurnished),
    description: property.description,
    location: property.location,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    parking: property.parking,
    area: property.area,
    propertyType: property.propertyType,
    offerLabel:
      OFFER_LABELS[property.offreName?.trim().toLowerCase() ?? ""] ?? "",
    badge: property.badges[0] ?? null,
    images: property.images,
    visitFee: property.visitFee,
    proprietaireId: property.agent?.id ?? null,
  }
}
