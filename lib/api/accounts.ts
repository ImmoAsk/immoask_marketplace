import type {
  AccountApi,
  AccountSession,
  LoginAccountData,
  LoginAccountInput,
  LoginAccountResult,
  LoginAccountVariables,
  LoginInput,
  LogoutAccountData,
  LogoutAccountResult,
  RegisterAccountData,
  RegisterAccountInput,
  RegisterAccountResult,
  RegisterAccountVariables,
  RegisterInput,
} from "@/features/account/types"
import type { GraphQLResponse } from "@/lib/api/types"

export type UserRole = {
  id: number
  roleName: string
  code: number
  description: string
  statut: number
}

export const USER_ROLES = {
  locataire: {
    id: 151,
    roleName: "Locataire ou Acquérant",
    code: 10,
    description: "Locataire ou un acquérant cherchant à acquérir",
    statut: 1,
  },
  locataireMedium: {
    id: 152,
    roleName: "Locataire ou Acquérant Medium",
    code: 11,
    description:
      "Locataire ou un acquérant cherchant à acquérir avec un abonnement",
    statut: 1,
  },
  locatairePremium: {
    id: 153,
    roleName: "Locataire ou Acquérant Premium",
    code: 12,
    description:
      "Locataire ou un acquérant cherchant à acquérir avec un abonnement",
    statut: 1,
  },
} as const satisfies Record<string, UserRole>

export type UserRoleKey = keyof typeof USER_ROLES

export const PROPERTY_SEEKERS_PLAN_USER_ROLES = {
  standard: USER_ROLES.locataire,
  medium: USER_ROLES.locataireMedium,
  premium: USER_ROLES.locatairePremium,
} as const satisfies Record<string, UserRole>

export type PropertySeekersPlanUserRoleId =
  keyof typeof PROPERTY_SEEKERS_PLAN_USER_ROLES

export function isPropertySeekersPlanUserRoleId(
  value: string | null | undefined,
): value is PropertySeekersPlanUserRoleId {
  return value === "standard" || value === "medium" || value === "premium"
}

export function userRoleForPropertySeekersPlan(
  planId: string | null | undefined,
): UserRole {
  if (isPropertySeekersPlanUserRoleId(planId)) {
    return PROPERTY_SEEKERS_PLAN_USER_ROLES[planId]
  }

  return USER_ROLES.locataire
}

function roleMatches(role: { id?: unknown; code?: unknown } | null | undefined, target: UserRole) {
  const id = Number(role?.id)
  const code = Number(role?.code)

  return id === target.id || code === target.code
}

export function hasPaidPropertySeekersSubscription(
  session?: AccountSession | null,
) {
  if (!session?.accessToken) {
    return false
  }

  const role = session.user?.role ?? session.login?.user?.role

  return (
    roleMatches(role, USER_ROLES.locataireMedium) ||
    roleMatches(role, USER_ROLES.locatairePremium)
  )
}

const ACCOUNT_API_ORIGIN = "https://immoaskprodapi.omnisoft.africa/api/v2"
const ACCOUNT_API_PROXY = "/immoask-api"

function accountApiUrl() {
  return typeof window === "undefined" ? ACCOUNT_API_ORIGIN : ACCOUNT_API_PROXY
}

const REGISTER_ACCOUNT_MUTATION = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      status
      tokens {
        access_token
      }
    }
  }
`

const LOGIN_ACCOUNT_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      token_type
      expires_in
      refresh_token
      user {
        name
        id
        email
        phone
        avatar
        role {
          id
          description
          statut
          code
          roleName
        }
      }
    }
  }
`

const LOGOUT_ACCOUNT_MUTATION = `
  mutation Logout {
    logout {
      status
      message
    }
  }
`

function toRegisterInput(input: RegisterAccountInput): RegisterInput {
  return {
    name: input.name,
    email: input.email,
    phone: input.phone,
    password: input.password,
    password_confirmation: input.confirmPassword,
    role_id: Number(input.userRole),
  }
}

function toLoginInput(input: LoginAccountInput): LoginInput {
  return {
    username: input.username,
    password: input.password,
  }
}

async function graphqlRequest<T>(
  payload: {
    query: string
    variables?: RegisterAccountVariables | LoginAccountVariables
  },
  errorLabel: string,
  accessToken?: string | null,
): Promise<T | undefined> {
  const response = await fetch(accountApiUrl(), {
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

async function registerAccount(
  input: RegisterAccountInput,
): Promise<RegisterAccountResult> {
  const variables: RegisterAccountVariables = {
    input: toRegisterInput(input),
  }

  const data = await graphqlRequest<RegisterAccountData>(
    {
      query: REGISTER_ACCOUNT_MUTATION,
      variables,
    },
    "Register account API request failed",
  )

  const payload = data?.register

  if (!payload) {
    throw new Error("Register account API returned an empty response")
  }

  return {
    status: payload.status ?? null,
    tokens: payload.tokens
      ? {
          access_token: payload.tokens.access_token ?? null,
        }
      : null,
  }
}

async function loginAccount(
  input: LoginAccountInput,
): Promise<LoginAccountResult> {
  const data = await graphqlRequest<LoginAccountData>(
    {
      query: LOGIN_ACCOUNT_MUTATION,
      variables: { input: toLoginInput(input) },
    },
    "Login account API request failed",
  )

  const payload = data?.login

  if (!payload?.access_token) {
    throw new Error("Login account API returned an empty response")
  }

  return payload
}

async function logoutAccount(
  accessToken?: string | null,
): Promise<LogoutAccountResult> {
  const data = await graphqlRequest<LogoutAccountData>(
    {
      query: LOGOUT_ACCOUNT_MUTATION,
    },
    "Logout account API request failed",
    accessToken,
  )

  const payload = data?.logout

  if (!payload?.status) {
    throw new Error("Logout account API returned an empty response")
  }

  return {
    status: payload.status,
    message: payload.message ?? null,
  }
}

export const accountApi: AccountApi = {
  registerAccount,
  loginAccount,
  logoutAccount,
}

export {
  registerAccount,
  loginAccount,
  logoutAccount,
}
