import type {
  GraphQLResponse,
  SaveVisitTourData,
  SaveVisitTourInput,
  SaveVisitTourResult,
  SaveVisitTourVariables,
  VisitApi,
  VisitTourProperty,
  VisitTourUser,
  VisiteInput,
} from "@/lib/api/types"

const VISIT_API_ORIGIN = "https://immoaskprodapi.omnisoft.africa/api/v2"
const VISIT_API_PROXY = "/immoask-api"

function visitApiUrl() {
  return typeof window === "undefined" ? VISIT_API_ORIGIN : VISIT_API_PROXY
}

const CREATE_VISITE_MUTATION = `
  mutation CreateVisite($input: VisiteInput!) {
    createVisite(input: $input) {
      id
      date_visite
      heure_visite
      statut
      email_visitor
      telephone_visitor
      fullname_visitor
      propriete {
        id
        nuo
        titre
      }
      visiteur {
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

function toVisiteInput(input: SaveVisitTourInput): VisiteInput {
  return {
    date_visite: input.date_visite,
    heure_visite: input.heure_visite,
    propriete_id: input.propriete_id,
    ...(input.proprietaire_id != null
      ? { proprietaire_id: input.proprietaire_id }
      : {}),
    ...(input.user_id != null ? { user_id: input.user_id } : {}),
    ...(input.email_visitor?.trim()
      ? { email_visitor: input.email_visitor.trim() }
      : {}),
    ...(input.telephone_visitor?.trim()
      ? { telephone_visitor: input.telephone_visitor.trim() }
      : {}),
    ...(input.fullname_visitor?.trim()
      ? { fullname_visitor: input.fullname_visitor.trim() }
      : {}),
  }
}

function toVisitTourUser(value: VisitTourUser | null | undefined): VisitTourUser | null {
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

function toVisitTourProperty(value: VisitTourProperty): VisitTourProperty {
  return {
    id: value.id,
    nuo: value.nuo ?? null,
    titre: value.titre ?? null,
  }
}

async function graphqlRequest<T>(
  payload: {
    query: string
    variables: SaveVisitTourVariables
  },
  errorLabel: string,
  accessToken?: string | null,
): Promise<T | undefined> {
  const response = await fetch(visitApiUrl(), {
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

async function saveVisitTour(
  input: SaveVisitTourInput,
  accessToken?: string | null,
): Promise<SaveVisitTourResult> {
  const variables: SaveVisitTourVariables = {
    input: toVisiteInput(input),
  }

  const data = await graphqlRequest<SaveVisitTourData>(
    {
      query: CREATE_VISITE_MUTATION,
      variables,
    },
    "Save visit tour API request failed",
    accessToken,
  )

  const payload = data?.createVisite

  if (!payload) {
    throw new Error("Save visit tour API returned an empty response")
  }

  return {
    id: payload.id,
    date_visite: payload.date_visite,
    heure_visite: payload.heure_visite,
    statut: payload.statut ?? null,
    email_visitor: payload.email_visitor ?? null,
    telephone_visitor: payload.telephone_visitor ?? null,
    fullname_visitor: payload.fullname_visitor ?? null,
    propriete: toVisitTourProperty(payload.propriete),
    visiteur: toVisitTourUser(payload.visiteur),
    proprietaire: toVisitTourUser(payload.proprietaire),
  }
}

export const visitApi: VisitApi = {
  saveVisitTour,
}

export { saveVisitTour }
