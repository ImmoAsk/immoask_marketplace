import { notFound } from "next/navigation"

const TRANSACTION_IDS: Record<string, number> = {
  "locations-immobilieres": 1,
  "ventes-immobilieres": 2,
  "baux-immobiliers": 3,
  "investissements-immobiliers": 4,
}

type CatalogRoute = {
  type: "catalog"
  country: string
  transaction: string
  offreId: number
  category?: string
  city?: string
  district?: string
}

type PropertyRoute = {
  type: "property"
  propertyNuo: number
}

export type ImmoAskRoute = | CatalogRoute | PropertyRoute

export function getTransactionId(
  transaction: string,
): number | null {
  return TRANSACTION_IDS[transaction] ?? null
}

export function isPropertyNuoSegment(segment?: string): boolean {
  if (!segment) {
    return false
  }

  const propertyNuo = Number(segment)
  return (
    Number.isInteger(propertyNuo) &&
    propertyNuo > 0 &&
    String(propertyNuo) === segment
  )
}

export async function resolveImmoAskRoute(params: {
  country: string
  transaction: string
  segments?: string[]
}): Promise<ImmoAskRoute> {
  const {
    country,
    transaction,
    segments = [],
  } = params

  /*
   * Resolve transaction slug → offre ID
   *
   * locations-immobilieres      → 1
   * ventes-immobilieres         → 2
   * baux-immobiliers            → 3
   * investissements-immobiliers→ 4
   */
  const offreId = getTransactionId(transaction)

  if (!offreId) {
    notFound()
  }

  /*
   * /tg/locations-immobilieres
   *
   * No filters.
   */
  if (segments.length === 0) {
    return {
      type: "catalog",
      country,
      transaction,
      offreId,
    }
  }

  /*
   * /tg/locations-immobilieres/appartement
   *
   * category only.
   */
  const lastSegment = segments[segments.length - 1]

  if (isPropertyNuoSegment(lastSegment)) {
    return {
      type: "property",
      propertyNuo: Number(lastSegment),
    }
  }

  const category = segments[0]

  /*
   * /tg/locations-immobilieres/appartement/lome
   *
   * category + city.
   */
  const city = segments[1]

  /*
   * /tg/locations-immobilieres/appartement/lome/agoe
   *
   * category + city + district.
   */
  const district = segments[2]

  /*
   * We support a maximum of:
   *
   * category
   * city
   * district
   *
   * Anything deeper is invalid.
   */
  if (segments.length > 3) {
    notFound()
  }

  return {
    type: "catalog",
    country,
    transaction,
    offreId,
    category,
    city,
    district,
  }
}