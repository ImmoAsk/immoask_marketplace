import type {
  GraphQLResponse,
  PropertyApi,
  PropertyApiResponse,
  PropertyFilteringFilters,
  PropertyFilteringVariables,
  PropertyListFilters,
  PropertyStatistic,
} from "./types"

const API_URL = "https://immoaskprodapi.omnisoft.africa/api/v2"

const GET_PROPERTY_QUERY = `
  query GetProperty($nuo: Int!) {
    propriete(nuo: $nuo) {
      id
      statut
      super_categorie
      nuo
      titre
      descriptif
      surface
      usage
      cuisine
      salon
      piece
      garage
      wc_douche_interne
      cout_mensuel
      nuitee
      cout_vente
      cout_visite
      caution_avance
      est_disponible
      est_meuble
      lat_long
      papier_propriete

      offre {
        denomination
        id
      }

      categorie_propriete {
        denomination
        minus_denomination
        id
      }

      pays {
        code
        id
      }

      ville {
        denomination
        minus_denonimation
        id
      }

      quartier {
        denomination
        minus_denomination
        id
      }

      adresse {
        libelle
      }

      infrastructures {
        id
        denomination
        type
        icone
        lat_long
      }

      visuels {
        uri
        position
      }

      user {
        id
        name
        avatar
        role {
          roleName
        }
        organisation {
          name_organisation
          logo
        }
      }

      badge_propriete {
        badge {
          badge_name
          badge_image
        }
      }
    }
  }
`

const PROPERTY_LIST_FIELDS = `
      id
      surface
      nuitee
      lat_long
      nuo
      usage
      piece
      titre
      garage
      cout_mensuel
      wc_douche_interne
      cout_vente
      est_meuble
      papier_propriete

      offre {
        denomination
        id
      }

      categorie_propriete {
        denomination
        minus_denomination
        id
      }

      pays {
        code
        id
      }

      ville {
        denomination
        minus_denonimation
        id
      }

      quartier {
        denomination
        minus_denomination
        id
      }

      visuels {
        uri
        position
      }

      badge_propriete {
        badge {
          badge_name
          badge_image
        }
      }
`

function appendFilteringVariable<K extends keyof PropertyFilteringVariables>(
  variableDefs: string[],
  args: string[],
  variables: PropertyFilteringVariables,
  name: K,
  graphqlArg: string,
  graphqlType: string,
  value: PropertyFilteringVariables[K],
) {
  if (value === undefined || value === "") {
    return
  }

  variableDefs.push(`$${name}: ${graphqlType}`)
  args.push(`${graphqlArg}: $${name}`)
  variables[name] = value
}

function toOptionalId(value?: number | string) {
  if (value == null || value === "") {
    return undefined
  }

  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
}

function toFilteringVariables(
  filters: PropertyFilteringFilters,
  ids: {
    villeId?: number
    quartierId?: number
    categorieId?: number
  },
): PropertyFilteringVariables {
  const variables: PropertyFilteringVariables = {
    limit: filters.limit ?? 100,
  }

  if (filters.offreId) {
    variables.offreId = String(filters.offreId)
  }

  const usage = toOptionalId(filters.usage)
  if (usage) {
    variables.usage = usage
  }

  if (ids.categorieId) {
    variables.categorieId = String(ids.categorieId)
  }

  if (ids.villeId) {
    variables.villeId = String(ids.villeId)
  }

  if (ids.quartierId) {
    variables.quartierId = String(ids.quartierId)
  }

  if (filters.bedrooms != null) {
    variables.piece = filters.bedrooms
  }

  if (filters.bathrooms != null && filters.bathrooms !== "") {
    variables.wcDoucheInterne = String(filters.bathrooms)
  }

  if (filters.surfaceMin != null) {
    variables.surfaceMin = filters.surfaceMin
  }

  if (filters.surfaceMax != null) {
    variables.surfaceMax = filters.surfaceMax
  }

  if (filters.budgetMin != null || filters.budgetMax != null) {
    const usesSaleBudget = filters.offreId === 2 || filters.offreId === 4

    if (usesSaleBudget) {
      if (filters.budgetMin != null) {
        variables.buyMin = filters.budgetMin
      }

      if (filters.budgetMax != null) {
        variables.buyMax = filters.budgetMax
      }
    } else {
      if (filters.budgetMin != null) {
        variables.rentMin = filters.budgetMin
      }

      if (filters.budgetMax != null) {
        variables.rentMax = filters.budgetMax
      }
    }
  }

  if (filters.depositMonths != null && filters.depositMonths !== "") {
    variables.cautionAvance = String(filters.depositMonths)
  }

  if (filters.parking != null) {
    variables.garage = filters.parking
  }

  return variables
}

function buildGetFilteringPropertiesQuery(variables: PropertyFilteringVariables) {
  const variableDefs = ["$limit: Int!"]
  const args = [
    "limit: $limit",
    "orderBy: { column: NUO, order: DESC }",
  ]
  const graphqlVariables: PropertyFilteringVariables = {
    limit: variables.limit,
  }

  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "offreId",
    "offre_id",
    "String!",
    variables.offreId,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "usage",
    "usage",
    "Int",
    variables.usage,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "categorieId",
    "categorie_id",
    "String!",
    variables.categorieId,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "villeId",
    "ville_id",
    "String!",
    variables.villeId,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "quartierId",
    "quartier_id",
    "String!",
    variables.quartierId,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "piece",
    "piece",
    "Int",
    variables.piece,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "wcDoucheInterne",
    "wc_douche_interne",
    "String",
    variables.wcDoucheInterne,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "surfaceMin",
    "surface_min",
    "Float",
    variables.surfaceMin,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "surfaceMax",
    "surface_max",
    "Float",
    variables.surfaceMax,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "rentMin",
    "rentMin",
    "Float",
    variables.rentMin,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "rentMax",
    "rentMax",
    "Float",
    variables.rentMax,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "buyMin",
    "buyMin",
    "Float",
    variables.buyMin,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "buyMax",
    "buyMax",
    "Float",
    variables.buyMax,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "cautionAvance",
    "caution_avance",
    "String",
    variables.cautionAvance,
  )
  appendFilteringVariable(
    variableDefs,
    args,
    graphqlVariables,
    "garage",
    "garage",
    "Int",
    variables.garage,
  )

  return {
    query: `
      query GetFilteringProperties(${variableDefs.join(", ")}) {
        getPropertiesByKeyWords(
          ${args.join("\n          ")}
        ) {
          ${PROPERTY_LIST_FIELDS}
        }
      }
    `,
    variables: graphqlVariables,
  }
}

function buildResolveLocationQuery({
  cityName,
  districtName,
  categoryName,
}: {
  cityName?: string
  districtName?: string
  categoryName?: string
}) {
  const variableDefs: string[] = []
  const fields: string[] = []
  const variables: Record<string, string> = {}

  if (categoryName) {
    variableDefs.push("$categoryName: String!")
    fields.push(`
      category: getCategoryIdByCategorieName(
        minus_denomination: $categoryName
      ) {
        denomination
        id
        code
      }
    `)
    variables.categoryName = categoryName.toLowerCase()
  }

  if (cityName) {
    variableDefs.push("$cityName: String!")
    fields.push(`
      town: getTownIdByTownName(
        minus_denomination: $cityName
      ) {
        denomination
        id
        code
      }
    `)
    variables.cityName = cityName.toLowerCase()
  }

  if (districtName) {
    variableDefs.push("$districtName: String!")
    fields.push(`
      district: getDistrictIdByDistrictName(
        minus_denomination: $districtName
      ) {
        denomination
        minus_denomination
        id
        code
      }
    `)
    variables.districtName = districtName.toLowerCase()
  }

  if (fields.length === 0) {
    return null
  }

  return {
    query: `
      query ResolvePropertyFilters(${variableDefs.join(", ")}) {
        ${fields.join("\n")}
      }
    `,
    variables,
  }
}

const LATEST_PROPERTIES_FIELDS = `
      id
      surface
      nuitee
      nuo
      usage
      piece
      titre
      descriptif
      garage
      cout_mensuel
      wc_douche_interne
      cout_vente
      est_meuble

      offre {
        denomination
        id
      }

      categorie_propriete {
        denomination
        minus_denomination
      }

      pays {
        code
      }

      ville {
        denomination
        minus_denonimation
      }

      quartier {
        denomination
        minus_denomination
      }

      visuels {
        uri
        position
      }

      badge_propriete {
        badge {
          badge_name
          badge_image
        }
      }
`

function buildGetLatestPropertiesQuery(limit: number) {
  return {
    query: `
      query GetLatestProperties($limit: Int) {
        get5Properties(
          limit: $limit
          orderBy: { column: NUO, order: DESC }
        ) {
          ${LATEST_PROPERTIES_FIELDS}
        }
      }
    `,
    variables: { limit },
  }
}

const GET_PROPERTY_STATISTICS_QUERY = `
  query GetPropertyStatistics {
    propertyStatistics {
      id
      denomination
      total
    }
  }
`

async function graphqlRequest<T>(
  payload: {
    query: string
    variables?: Record<string, string | number | undefined>
  },
  errorLabel: string,
  revalidate?: number | false,
): Promise<T | undefined> {
  const init: RequestInit & { next?: { revalidate: number } } = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  }

  if (revalidate === false) {
    init.cache = "no-store"
  } else if (typeof revalidate === "number") {
    init.next = { revalidate }
  }

  const response = await fetch(API_URL, init)

  if (!response.ok) {
    throw new Error(`${errorLabel}: ${response.status}`)
  }

  const result = (await response.json()) as GraphQLResponse<T>

  if (result.errors?.length) {
    throw new Error(result.errors[0].message)
  }

  return result.data
}

type ResolvedFilterIds = {
  town: { id: number } | null
  district: { id: number } | null
  category: { id: number } | null
}

async function getProperty(
  nuo: number,
): Promise<PropertyApiResponse | null> {
  const data = await graphqlRequest<{
    propriete: PropertyApiResponse | null
  }>(
    {
      query: GET_PROPERTY_QUERY,
      variables: { nuo },
    },
    "Property API request failed",
    false,
  )

  return data?.propriete ?? null
}

async function resolveFilteringIds(filters: PropertyFilteringFilters) {
  const directIds = {
    villeId: toOptionalId(filters.villeId),
    quartierId: toOptionalId(filters.quartierId),
    categorieId: toOptionalId(filters.categorieId),
  }

  const categoryName = directIds.categorieId
    ? undefined
    : filters.categoryName
  const cityName = directIds.villeId ? undefined : filters.cityName
  const districtName = directIds.quartierId
    ? undefined
    : filters.districtName

  const resolveQuery = buildResolveLocationQuery({
    cityName,
    districtName,
    categoryName,
  })

  if (!resolveQuery) {
    return directIds
  }

  const resolved = await graphqlRequest<ResolvedFilterIds>(
    resolveQuery,
    "Property filter resolution failed",
    3600,
  )

  const villeId = directIds.villeId ?? resolved?.town?.id
  const quartierId = directIds.quartierId ?? resolved?.district?.id
  const categorieId = directIds.categorieId ?? resolved?.category?.id

  if (cityName && !villeId) {
    return null
  }

  if (districtName && !quartierId) {
    return null
  }

  if (categoryName && !categorieId) {
    return null
  }

  return { villeId, quartierId, categorieId }
}

async function getFilteringProperties(
  filters: PropertyFilteringFilters,
): Promise<PropertyApiResponse[]> {
  const ids = await resolveFilteringIds(filters)

  if (!ids) {
    return []
  }

  const payload = buildGetFilteringPropertiesQuery(
    toFilteringVariables(filters, ids),
  )
  const data = await graphqlRequest<{
    getPropertiesByKeyWords: PropertyApiResponse[] | null
  }>(payload, "Filtering properties API request failed", 60)

  return data?.getPropertiesByKeyWords ?? []
}

async function getProperties(
  filters: PropertyListFilters,
): Promise<PropertyApiResponse[]> {
  return getFilteringProperties({
    ...filters,
    limit: filters.limit ?? 24,
  })
}

async function getLatestProperties(
  options: { limit?: number; usage?: number } = {},
): Promise<PropertyApiResponse[]> {
  const limit = options.limit ?? 9

  if (options.usage) {
    return getFilteringProperties({
      usage: options.usage,
      limit,
    })
  }

  const data = await graphqlRequest<{
    get5Properties: PropertyApiResponse[] | null
  }>(
    buildGetLatestPropertiesQuery(limit),
    "Latest properties API request failed",
    60,
  )

  return data?.get5Properties ?? []
}

async function getPropertyStatistics(): Promise<PropertyStatistic[]> {
  const data = await graphqlRequest<{
    propertyStatistics: Array<{
      id: number | string
      denomination: string | null
      total: number | string | null
    }> | null
  }>(
    {
      query: GET_PROPERTY_STATISTICS_QUERY,
      variables: {},
    },
    "Property statistics API request failed",
    3600,
  )

  return (data?.propertyStatistics ?? []).map((statistic) => ({
    id: Number(statistic.id),
    denomination: statistic.denomination ?? null,
    total: Number(statistic.total) || 0,
  }))
}

export const propertyApi: PropertyApi = {
  getProperty,
  getProperties,
  getFilteringProperties,
  getLatestProperties,
  getPropertyStatistics,
}

export { getFilteringProperties }