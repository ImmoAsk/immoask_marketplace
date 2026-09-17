import type { CatalogMapViewProps } from "@/features/properties/types"
import { slugify } from "@/lib/utils/createPropertyLink"

const COUNTRY_CENTERS: Record<string, { latitude: number; longitude: number }> =
  {
    tg: { latitude: 6.1319, longitude: 1.2228 },
    bj: { latitude: 6.3654, longitude: 2.4183 },
  }

const DEFAULT_CENTER = COUNTRY_CENTERS.tg

export function buildCatalogMapView({
  country,
}: {
  country: string
}): CatalogMapViewProps {
  const center = COUNTRY_CENTERS[slugify(country)] ?? DEFAULT_CENTER

  return {
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 12,
    message: "La vue carte et split arrive bientôt",
  }
}
