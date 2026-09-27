import type {
  GetCitiesVariables,
  GetDistrictsVariables,
  GetPlaceToVisitsVariables,
  GraphQLResponse,
  LocationApi,
  LocationRecord,
  PlaceToVisit,
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

const GET_PLACE_TO_VISITS_QUERY = `
  query PlaceToVisits($pays_id: Int) {
    placeToVisits(pays_id: $pays_id) {
      id
      place_name
      place_url
      pays_id
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
    variables:
      | GetCitiesVariables
      | GetDistrictsVariables
      | { pays_id?: number }
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

function toPlaceToVisit(record: {
  id: string | number
  place_name: string
  place_url: string
  pays_id: number | string
}): PlaceToVisit {
  return {
    id: String(record.id),
    placeName: record.place_name,
    placeUrl: record.place_url,
    paysId: Number(record.pays_id),
  }
}

async function getPlaceToVisits(paysId?: number): Promise<PlaceToVisit[]> {
  const variables: GetPlaceToVisitsVariables = {}

  if (paysId != null) {
    variables.paysId = paysId
  }

  const data = await graphqlRequest<{
    placeToVisits: Array<{
      id: string | number
      place_name: string
      place_url: string
      pays_id: number | string
    }> | null
  }>(
    {
      query: GET_PLACE_TO_VISITS_QUERY,
      variables: variables.paysId != null ? { pays_id: variables.paysId } : {},
    },
    "Places to visit API request failed",
  )

  return (data?.placeToVisits ?? []).map(toPlaceToVisit)
}

export const locationApi: LocationApi = {
  getCities,
  getDistricts,
  getPlaceToVisits,
}

export { getCities, getDistricts, getPlaceToVisits }
