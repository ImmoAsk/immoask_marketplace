import type {
  FurnishedBookingProperty,
  FurnishedBookingUser,
  GraphQLResponse,
  ReservationApi,
  ReservationInput,
  SaveFurnishedBookingData,
  SaveFurnishedBookingInput,
  SaveFurnishedBookingResult,
  SaveFurnishedBookingVariables,
} from "@/lib/api/types"

const RESERVATION_API_ORIGIN = "https://immoaskprodapi.omnisoft.africa/api/v2"
const RESERVATION_API_PROXY = "/immoask-api"

function reservationApiUrl() {
  return typeof window === "undefined"
    ? RESERVATION_API_ORIGIN
    : RESERVATION_API_PROXY
}

const CREATE_RESERVATION_MUTATION = `
  mutation CreateReservation($input: ReservationInput!) {
    createReservation(input: $input) {
      id
      date_arrive
      date_depart
      pickup_place
      email_reservateur
      phone_reservateur
      fullname_reservateur
      statut
      adulte
      enfant
      propriete {
        id
        nuo
        titre
      }
      client {
        id
        name
        email
        phone
      }
      proprietaire {
        id
        name
        email
        phone
      }
    }
  }
`

function toReservationInput(input: SaveFurnishedBookingInput): ReservationInput {
  return {
    date_arrive: input.date_arrive,
    date_depart: input.date_depart,
    propriete_id: input.propriete_id,
    proprietaire_id: input.proprietaire_id,
    ...(input.user_id != null ? { user_id: input.user_id } : {}),
    ...(input.adulte != null ? { adulte: input.adulte } : {}),
    ...(input.enfant != null ? { enfant: input.enfant } : {}),
    ...(input.statut != null ? { statut: input.statut } : {}),
    ...(input.pickup_place?.trim()
      ? { pickup_place: input.pickup_place.trim() }
      : {}),
    ...(input.email_reservateur?.trim()
      ? { email_reservateur: input.email_reservateur.trim() }
      : {}),
    ...(input.phone_reservateur?.trim()
      ? { phone_reservateur: input.phone_reservateur.trim() }
      : {}),
    ...(input.fullname_reservateur?.trim()
      ? { fullname_reservateur: input.fullname_reservateur.trim() }
      : {}),
  }
}

function toFurnishedBookingUser(
  value: FurnishedBookingUser | null | undefined,
): FurnishedBookingUser | null {
  if (!value) {
    return null
  }

  return {
    id: value.id ?? null,
    name: value.name ?? null,
    email: value.email ?? null,
    phone: value.phone ?? null,
  }
}

function toFurnishedBookingProperty(
  value: FurnishedBookingProperty,
): FurnishedBookingProperty {
  return {
    id: value.id,
    nuo: value.nuo ?? null,
    titre: value.titre ?? null,
  }
}

async function graphqlRequest<T>(
  payload: {
    query: string
    variables: SaveFurnishedBookingVariables
  },
  errorLabel: string,
  accessToken?: string | null,
): Promise<T | undefined> {
  const response = await fetch(reservationApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(payload),
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

async function saveFurnishedBooking(
  input: SaveFurnishedBookingInput,
  accessToken?: string | null,
): Promise<SaveFurnishedBookingResult> {
  const variables: SaveFurnishedBookingVariables = {
    input: toReservationInput(input),
  }

  const data = await graphqlRequest<SaveFurnishedBookingData>(
    {
      query: CREATE_RESERVATION_MUTATION,
      variables,
    },
    "Save furnished booking API request failed",
    accessToken,
  )

  const payload = data?.createReservation

  if (!payload) {
    throw new Error("Save furnished booking API returned an empty response")
  }

  return {
    id: payload.id,
    date_arrive: payload.date_arrive,
    date_depart: payload.date_depart,
    pickup_place: payload.pickup_place ?? null,
    email_reservateur: payload.email_reservateur ?? null,
    phone_reservateur: payload.phone_reservateur ?? null,
    fullname_reservateur: payload.fullname_reservateur ?? null,
    statut: payload.statut ?? null,
    adulte: payload.adulte ?? null,
    enfant: payload.enfant ?? null,
    propriete: toFurnishedBookingProperty(payload.propriete),
    client: toFurnishedBookingUser(payload.client),
    proprietaire: toFurnishedBookingUser(payload.proprietaire),
  }
}

export const reservationApi: ReservationApi = {
  saveFurnishedBooking,
}

export { saveFurnishedBooking }
