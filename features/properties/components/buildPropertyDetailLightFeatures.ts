import type {
  Property,
  PropertyDetailLightFeature,
  PropertyDetailLightFeatureIcon,
  PropertyDetailLightFeaturesProps,
} from "@/features/properties/types"

function isLandProperty(property: Property) {
  const haystack = [property.categorySlug, property.propertyType]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  return haystack.includes("terrain")
}

function pushFeature(
  features: PropertyDetailLightFeature[],
  icon: PropertyDetailLightFeatureIcon,
  value: number | null | undefined,
  label: string,
) {
  if (value == null) {
    return
  }

  features.push({ icon, value, label })
}

export function buildPropertyDetailLightFeatures(
  property: Property,
): PropertyDetailLightFeaturesProps {
  const features: PropertyDetailLightFeature[] = []

  pushFeature(features, "bedrooms", property.bedrooms, "Chambres")
  pushFeature(features, "bathrooms", property.bathrooms, "Salles d'eau")
  pushFeature(features, "livingRooms", property.livingRooms, "Salons XL")
  pushFeature(features, "garages", property.parking, "Garages Int.")

  if (isLandProperty(property)) {
    pushFeature(features, "landArea", property.area, "m² Terrain")
  } else {
    pushFeature(features, "livingArea", property.area, "m² Habitable")
    pushFeature(features, "landArea", property.landArea, "m² Terrain")
  }

  return { features }
}
