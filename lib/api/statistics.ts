import type {
  GetTopRealEstateAgentsData,
  GetTopRealEstateAgentsOptions,
  GraphQLResponse,
  StatisticsApi,
  TopRealEstateAgent,
  TopRealEstateAgentApiItem,
  TopRealEstateAgentDistrict,
  TopRealEstateAgentDistrictApiItem,
} from "./types"

const STATISTICS_API_ORIGIN = "https://immoaskprodapi.omnisoft.africa/api/v2"
const STATISTICS_API_PROXY = "/immoask-api"
const DEFAULT_TOP_AGENTS_LIMIT = 40

function statisticsApiUrl() {
  return typeof window === "undefined"
    ? STATISTICS_API_ORIGIN
    : STATISTICS_API_PROXY
}

const GET_TOP_REAL_ESTATE_AGENTS_QUERY = `
  query GetTopRealEstateAgents($limit: Int) {
    topRealEstateAgents(limit: $limit) {
      id
      name
      avatar
      nombre_biens
      quartiers_couverts {
        id
        denomination
        nombre_biens
      }
    }
  }
`

function toNombreBiens(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

function toTopRealEstateAgentDistrict(
  district: TopRealEstateAgentDistrictApiItem,
): TopRealEstateAgentDistrict {
  return {
    id: String(district.id),
    denomination: district.denomination ?? null,
    nombre_biens: toNombreBiens(district.nombre_biens),
  }
}

function toTopRealEstateAgent(
  agent: TopRealEstateAgentApiItem,
): TopRealEstateAgent {
  return {
    id: String(agent.id),
    name: agent.name ?? null,
    avatar: agent.avatar ?? null,
    nombre_biens: toNombreBiens(agent.nombre_biens),
    quartiers_couverts: (agent.quartiers_couverts ?? []).map(
      toTopRealEstateAgentDistrict,
    ),
  }
}

async function graphqlRequest<T>(
  payload: {
    query: string
    variables?: Record<string, string | number | undefined>
  },
  errorLabel: string,
): Promise<T | undefined> {
  const init: RequestInit & { next?: { revalidate: number } } = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  }

  if (typeof window === "undefined") {
    init.next = { revalidate: 3600 }
  }

  const response = await fetch(statisticsApiUrl(), init)

  if (!response.ok) {
    throw new Error(`${errorLabel}: ${response.status}`)
  }

  const result = (await response.json()) as GraphQLResponse<T>

  if (result.errors?.length) {
    throw new Error(result.errors[0].message)
  }

  return result.data
}

async function getTopRealEstateAgents(
  options: GetTopRealEstateAgentsOptions = {},
): Promise<TopRealEstateAgent[]> {
  const limit = options.limit ?? DEFAULT_TOP_AGENTS_LIMIT

  const data = await graphqlRequest<GetTopRealEstateAgentsData>(
    {
      query: GET_TOP_REAL_ESTATE_AGENTS_QUERY,
      variables: { limit },
    },
    "Top real estate agents API request failed",
  )

  return (data?.topRealEstateAgents ?? []).map(toTopRealEstateAgent)
}

export const statisticsApi: StatisticsApi = {
  getTopRealEstateAgents,
}

export { getTopRealEstateAgents, DEFAULT_TOP_AGENTS_LIMIT }
