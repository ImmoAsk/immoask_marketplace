import type {
  GraphQLResponse,
  InquiryApi,
  ProjectInput,
  PropertyInquiryUser,
  SendPropertyInquiryData,
  SendPropertyInquiryInput,
  SendPropertyInquiryResult,
  SendPropertyInquiryVariables,
} from "@/lib/api/types"

const INQUIRY_API_ORIGIN = "https://immoaskprodapi.omnisoft.africa/api/v2"
const INQUIRY_API_PROXY = "/immoask-api"

function inquiryApiUrl() {
  return typeof window === "undefined" ? INQUIRY_API_ORIGIN : INQUIRY_API_PROXY
}

const CREATE_PROJECT_MUTATION = `
  mutation CreateProject($input: ProjectInput!) {
    createProject(input: $input) {
      id
      user {
        id
        name
        email
        phone
      }
      final_date
      start_date
      statut
      description
      project_name
      project_category
      project_document
    }
  }
`

function toIsoDate(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function toProjectInput(input: SendPropertyInquiryInput): ProjectInput {
  return {
    final_date: input.final_date,
    start_date: input.start_date?.trim() || toIsoDate(),
    description: input.description,
    project_category: input.project_category,
    ...(input.user_id != null ? { user_id: input.user_id } : {}),
    ...(input.statut != null ? { statut: input.statut } : {}),
    ...(input.project_name?.trim()
      ? { project_name: input.project_name.trim() }
      : {}),
    ...(input.project_document?.trim()
      ? { project_document: input.project_document.trim() }
      : {}),
  }
}

function toPropertyInquiryUser(
  value: PropertyInquiryUser | null | undefined,
): PropertyInquiryUser | null {
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

async function graphqlRequest<T>(
  payload: {
    query: string
    variables: SendPropertyInquiryVariables
  },
  errorLabel: string,
  accessToken?: string | null,
): Promise<T | undefined> {
  const response = await fetch(inquiryApiUrl(), {
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

async function sendPropertyInquiry(
  input: SendPropertyInquiryInput,
  accessToken?: string | null,
): Promise<SendPropertyInquiryResult> {
  const variables: SendPropertyInquiryVariables = {
    input: toProjectInput(input),
  }

  const data = await graphqlRequest<SendPropertyInquiryData>(
    {
      query: CREATE_PROJECT_MUTATION,
      variables,
    },
    "Send property inquiry API request failed",
    accessToken,
  )

  const payload = data?.createProject

  if (!payload) {
    throw new Error("Send property inquiry API returned an empty response")
  }

  return {
    id: payload.id,
    user: toPropertyInquiryUser(payload.user),
    final_date: payload.final_date ?? null,
    start_date: payload.start_date ?? null,
    statut: payload.statut ?? null,
    description: payload.description ?? null,
    project_name: payload.project_name ?? null,
    project_category: payload.project_category ?? null,
    project_document: payload.project_document ?? null,
  }
}

export const inquiryApi: InquiryApi = {
  sendPropertyInquiry,
}

export { sendPropertyInquiry }
