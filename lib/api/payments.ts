import type {
  GraphQLResponse,
  JsonObject,
  PaymentApi,
  PaymentTransactionContract,
  PaymentTransactionInput,
  PaymentTransactionProperty,
  PaymentTransactionUser,
  PayWithFedaPayData,
  PayWithFedaPayInput,
  PayWithFedaPayResult,
  PayWithFedaPayVariables,
  SavePaymentTransactionData,
  SavePaymentTransactionInput,
  SavePaymentTransactionResult,
  SavePaymentTransactionVariables,
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

const CREATE_PAYMENT_TRANSACTION_MUTATION = `
  mutation CreatePaymentTransaction($input: Payment_transactionInput!) {
    createPaymentTransaction(input: $input) {
      id
      statut
      email_visitor
      telephone_visitor
      fullname_visitor
      montant
      description
      type_transaction
      date_transaction
      transaction_id
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
      contrat {
        id
      }
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

function toPaymentTransactionInput(
  input: SavePaymentTransactionInput,
): PaymentTransactionInput {
  return {
    user_id: input.user_id,
    description: input.description,
    type_transaction: input.type_transaction,
    montant: input.montant,
    // DB column is NOT NULL with no default; deferred payments use 0.
    transaction_id: input.transaction_id ?? 0,
    ...(input.propriete_id != null ? { propriete_id: input.propriete_id } : {}),
    ...(input.proprietaire_id != null
      ? { proprietaire_id: input.proprietaire_id }
      : {}),
    ...(input.contrat_id != null ? { contrat_id: input.contrat_id } : {}),
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

function toPaymentTransactionUser(
  value: PaymentTransactionUser | null | undefined,
): PaymentTransactionUser | null {
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

function toPaymentTransactionProperty(
  value: PaymentTransactionProperty | null | undefined,
): PaymentTransactionProperty | null {
  if (!value) {
    return null
  }

  return {
    id: value.id,
    nuo: value.nuo ?? null,
    titre: value.titre ?? null,
  }
}

function toPaymentTransactionContract(
  value: PaymentTransactionContract | null | undefined,
): PaymentTransactionContract | null {
  if (!value?.id) {
    return null
  }

  return {
    id: value.id,
  }
}

async function graphqlRequest<T>(
  payload: {
    query: string
    variables: PayWithFedaPayVariables | SavePaymentTransactionVariables
  },
  errorLabel: string,
  accessToken?: string | null,
): Promise<T | undefined> {
  const response = await fetch(paymentApiUrl(), {
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
    const first = result.errors[0]
    const debugMessage =
      typeof first.extensions?.debugMessage === "string"
        ? first.extensions.debugMessage
        : null
    throw new Error(debugMessage || first.message)
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

async function savePaymentTransaction(
  input: SavePaymentTransactionInput,
  accessToken?: string | null,
): Promise<SavePaymentTransactionResult> {
  const variables: SavePaymentTransactionVariables = {
    input: toPaymentTransactionInput(input),
  }

  const data = await graphqlRequest<SavePaymentTransactionData>(
    {
      query: CREATE_PAYMENT_TRANSACTION_MUTATION,
      variables,
    },
    "Save payment transaction API request failed",
    accessToken,
  )

  const payload = data?.createPaymentTransaction

  if (!payload) {
    throw new Error("Save payment transaction API returned an empty response")
  }

  return {
    id: payload.id,
    statut: payload.statut ?? null,
    email_visitor: payload.email_visitor ?? null,
    telephone_visitor: payload.telephone_visitor ?? null,
    fullname_visitor: payload.fullname_visitor ?? null,
    montant: payload.montant,
    description: payload.description ?? null,
    type_transaction: payload.type_transaction ?? null,
    date_transaction: payload.date_transaction ?? null,
    transaction_id: payload.transaction_id ?? null,
    propriete: toPaymentTransactionProperty(payload.propriete),
    client: toPaymentTransactionUser(payload.client),
    proprietaire: toPaymentTransactionUser(payload.proprietaire),
    contrat: toPaymentTransactionContract(payload.contrat),
  }
}

export const paymentApi: PaymentApi = {
  payWithFedaPay,
  savePaymentTransaction,
}

export { payWithFedaPay, savePaymentTransaction }
