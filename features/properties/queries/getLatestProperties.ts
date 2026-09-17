import { propertyApi } from "@/lib/api/properties"

import type { Property } from "../types"

export async function getLatestProperties(): Promise<
  Property[]
> {
  const properties = await propertyApi.getLatestProperties()

  return properties.map((property): Property => ({
  id: property.id,

  title: property.titre ?? "",

  description: property.descriptif ?? "",

  propertyType:
    property.categorie_propriete?.denomination ??
    property.usage ??
    "",

  location: [
    property.quartier?.denomination,
    property.ville?.denomination,
  ]
    .filter(
      (value): value is string =>
        Boolean(value),
    )
    .join(", "),

  price:
    property.cout_mensuel ??
    property.cout_vente ??
    property.nuitee ??
    null,

  monthlyPrice: property.cout_mensuel ?? null,

  salePrice: property.cout_vente ?? null,

  nightlyPrice: property.nuitee ?? null,

  visitFee: property.cout_visite ?? null,

  depositMonths: null,

  bedrooms: property.piece,

  bathrooms: property.wc_douche_interne,

  livingRooms: property.salon ?? null,

  parking: property.garage ?? null,

  area: property.surface,

  images:
    property.visuels
      ?.slice()
      .sort(
        (a, b) =>
          (a.position ?? 0) -
          (b.position ?? 0),
      )
      .map((image) => image.uri)
      .filter(
        (uri): uri is string =>
          Boolean(uri),
      ) ?? [],
  badges: [],
  latitude: null,
  longitude: null,
}))
}