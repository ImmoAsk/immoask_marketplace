import type { BookFurnishedPropertyProperty } from "@/features/book_property/types"
import { resolveSuperCategorieLabel } from "@/features/catalog/resolveSuperCategorieLabel"
import type { Property } from "@/features/properties/types"

export function toBookFurnishedProperty(
  property: Property,
): BookFurnishedPropertyProperty {
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
    offerLabel: resolveSuperCategorieLabel(property.superCategory),
    badge: property.badges[0] ?? null,
    images: property.images,
    roleName: property.agent?.roleName ?? null,
    proprietaireId: property.agent?.id ?? null,
  }
}
