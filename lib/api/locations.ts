import type {
  GetCitiesVariables,
  GetDistrictsVariables,
  GraphQLResponse,
  LocationApi,
  LocationRecord,
} from "./types"

const API_URL = "https://immoaskprodapi.omnisoft.africa/api/v2"

const GET_CITIES_QUERY = `
  query GetCities($countryCode: ID!) {
    getTownsByCountryCode(pays_id: $countryCode) {
      id
      denomination
      code
    }
  }
`

const GET_DISTRICTS_QUERY = `
  query GetDistricts($townId: ID!) {
    getDistrictsByTownId(ville_id: $townId) {
      id
      denomination
      code
    }
  }
`

function toLocationRecord(record: {
  id: string | number
  denomination?: string | null
  code?: string | null
}): LocationRecord {
  return {
    id: String(record.id),
    denomination: record.denomination ?? null,
    code: record.code ?? null,
  }
}

async function graphqlRequest<T>(
  payload: {
    query: string
    variables: GetCitiesVariables | GetDistrictsVariables
  },
  errorLabel: string,
): Promise<T | undefined> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    next: {
      revalidate: 3600,
    },
  })

  if (!response.ok) {
    throw new Error(`${errorLabel}: ${response.status}`)
  }

  const result = (await response.json()) as GraphQLResponse<T>

  if (result.errors?.length) {
    throw new Error(result.errors[0].message)
  }

  return result.data
}

async function getCities(
  countryCallingCode: number | string,
): Promise<LocationRecord[]> {
  const variables: GetCitiesVariables = {
    countryCode: String(countryCallingCode),
  }
  const data = await graphqlRequest<{
    getTownsByCountryCode: Array<{
      id: string | number
      denomination: string | null
      code: string | null
    }> | null
  }>(
    {
      query: GET_CITIES_QUERY,
      variables,
    },
    "Cities API request failed",
  )

  return (data?.getTownsByCountryCode ?? []).map(toLocationRecord)
}

async function getDistricts(
  townId: number | string,
): Promise<LocationRecord[]> {
  const variables: GetDistrictsVariables = {
    townId: String(townId),
  }
  const data = await graphqlRequest<{
    getDistrictsByTownId: Array<{
      id: string | number
      denomination: string | null
      code: string | null
    }> | null
  }>(
    {
      query: GET_DISTRICTS_QUERY,
      variables,
    },
    "Districts API request failed",
  )

  return (data?.getDistrictsByTownId ?? []).map(toLocationRecord)
}

export const locationApi: LocationApi = {
  getCities,
  getDistricts,
}

export { getCities, getDistricts }
