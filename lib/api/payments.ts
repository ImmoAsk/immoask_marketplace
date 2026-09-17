import type {
  GraphQLResponse,
  JsonObject,
  PayWithFedaPayData,
  PayWithFedaPayInput,
  PayWithFedaPayResult,
  PayWithFedaPayVariables,
  PaymentApi,
} from "@/lib/api/types"

const PAYMENT_API_ORIGIN = "https://immoaskprodapi.omnisoft.africa/api/v2"
const PAYMENT_API_PROXY = "/immoask-api"

function paymentApiUrl() {
  return typeof window === "undefined" ? PAYMENT_API_ORIGIN : PAYMENT_API_PROXY
}

const PAY_WITH_FEDAPAY_MUTATION = `
  mutation PayWithFedaPay($input: PayWithFedaPayInput!) {
    payWithFedaPay(input: $input) {
      transaction_id
      success
      message
      payment_url
      raw_response
    }
  }
`

function toPayWithFedaPayInput(input: PayWithFedaPayInput): PayWithFedaPayInput {
  return {
    description: input.description,
    amount: input.amount,
    firstname: input.firstname,
    lastname: input.lastname,
    phone: input.phone,
    callback_url: input.callback_url,
    email: input.email,
    ...(input.country_code ? { country_code: input.country_code } : {}),
    ...(input.currency ? { currency: input.currency } : {}),
  }
}

function toRawResponse(
  value: PayWithFedaPayResult["raw_response"] | undefined,
): JsonObject | string | null {
  if (value == null) {
    return null
  }

  if (typeof value === "string") {
    return value
  }

  return value
}

async function graphqlRequest<T>(
  payload: {
    query: string
    variables: PayWithFedaPayVariables
  },
  errorLabel: string,
): Promise<T | undefined> {
  const response = await fetch(paymentApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
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

async function payWithFedaPay(
  input: PayWithFedaPayInput,
): Promise<PayWithFedaPayResult> {
  const variables: PayWithFedaPayVariables = {
    input: toPayWithFedaPayInput(input),
  }

  const data = await graphqlRequest<PayWithFedaPayData>(
    {
      query: PAY_WITH_FEDAPAY_MUTATION,
      variables,
    },
    "Pay with FedaPay API request failed",
  )

  const payload = data?.payWithFedaPay

  if (!payload) {
    throw new Error("Pay with FedaPay API returned an empty response")
  }

  return {
    transaction_id: payload.transaction_id ?? null,
    success: Boolean(payload.success),
    message: payload.message ?? null,
    payment_url: payload.payment_url ?? null,
    raw_response: toRawResponse(payload.raw_response),
  }
}

export const paymentApi: PaymentApi = {
  payWithFedaPay,
}

export { payWithFedaPay }
