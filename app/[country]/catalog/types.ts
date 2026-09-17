export type CatalogSearchParam = string | string[] | undefined

export type CatalogQueryFilters = {
  usage?: CatalogSearchParam
  categorie?: CatalogSearchParam
  ville?: CatalogSearchParam
  quartier?: CatalogSearchParam
  offre?: CatalogSearchParam
  page?: CatalogSearchParam
}

export type CatalogRouteParams = {
  country: string
}

export type CatalogRoutePageProps = {
  params: Promise<CatalogRouteParams>
  searchParams: Promise<CatalogQueryFilters>
}

export type CatalogIdFilters = {
  usage?: number
  categorie?: number
  ville?: number
  quartier?: number
  offre?: number
}

export function firstCatalogSearchParam(value?: CatalogSearchParam) {
  const resolved = Array.isArray(value) ? value[0] : value
  return resolved?.trim() || undefined
}

export function parseCatalogId(value?: CatalogSearchParam) {
  const raw = firstCatalogSearchParam(value)
  if (!raw) {
    return undefined
  }

  const parsed = Number(raw)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
}

export function toCatalogIdFilters(
  searchParams: CatalogQueryFilters,
): CatalogIdFilters {
  return {
    usage: parseCatalogId(searchParams.usage),
    categorie: parseCatalogId(searchParams.categorie),
    ville: parseCatalogId(searchParams.ville),
    quartier: parseCatalogId(searchParams.quartier),
    offre: parseCatalogId(searchParams.offre),
  }
}

export function hasCatalogIdFilter(filters: CatalogIdFilters) {
  return Boolean(
    filters.usage ||
      filters.categorie ||
      filters.ville ||
      filters.quartier ||
      filters.offre,
  )
}
