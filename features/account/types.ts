import type { ReactNode } from "react"

export type RegisterAccountInput = {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  userRole: number | string
}

export type RegisterInput = {
  name: string
  email: string
  phone: string
  password: string
  password_confirmation: string
  role_id: number
}

export type RegisterAccountVariables = {
  input: RegisterInput
}

export type RegisterAccountTokens = {
  access_token: string | null
}

export type RegisterAccountResult = {
  status: string | number | boolean | null
  tokens: RegisterAccountTokens | null
}

export type RegisterAccountData = {
  register: RegisterAccountResult | null
}

export type LoginAccountInput = {
  username: string
  password: string
}

export type LoginInput = {
  username: string
  password: string
}

export type LoginAccountVariables = {
  input: LoginInput
}

export type LoginAccountRole = {
  id: number | string | null
  roleName: string | null
  description: string | null
  statut: string | number | boolean | null
  code: string | null
}

export type LoginAccountUser = {
  name: string | null
  id: number | string | null
  email: string | null
  phone: string | null
  avatar: string | null
  role: LoginAccountRole | null
}

export type LoginAccountResult = {
  access_token: string | null
  token_type: string | null
  expires_in: number | null
  refresh_token: string | null
  user: LoginAccountUser | null
}

export type LoginAccountData = {
  login: LoginAccountResult | null
}

export type LogoutResponse = {
  status: string
  message: string | null
}

export type LogoutAccountResult = LogoutResponse

export type LogoutAccountData = {
  logout: LogoutResponse | null
}

export interface AccountApi {
  registerAccount(input: RegisterAccountInput): Promise<RegisterAccountResult>
  loginAccount(input: LoginAccountInput): Promise<LoginAccountResult>
  logoutAccount(accessToken?: string | null): Promise<LogoutAccountResult>
}

export const ACCOUNT_ROLE_IDS = {
  locataire: 151,
  proprietaire: 1230,
  professionnel: 1232,
} as const

export type AccountRoleId =
  (typeof ACCOUNT_ROLE_IDS)[keyof typeof ACCOUNT_ROLE_IDS]

export type AccountRoleOption = {
  id: number | string
  label: string
}

export type AccountPhoneInputProps = {
  id?: string
  name?: string
  value?: string
  onChange: (value: string) => void
  defaultCountry?: string
  disabled?: boolean
  invalid?: boolean
  placeholder?: string
  autoComplete?: string
  className?: string
}

export type AccountCreationFormProps = {
  roles?: AccountRoleOption[]
  defaultCountry?: string
  loginHref?: string
  backHref?: string
  termsHref?: string
  privacyHref?: string
  redirectTo?: string
  submitLabel?: string
  redirectOnSuccess?: boolean
  registerOnSubmit?: boolean
  onUserRoleChange?: (userRole: string) => void
  onContinue?: (input: RegisterAccountInput) => void
  onSuccess?: (
    result: RegisterAccountResult,
    input: RegisterAccountInput,
  ) => void
  onSubmit?: (
    input: RegisterAccountInput,
  ) => Promise<RegisterAccountResult | void> | RegisterAccountResult | void
  className?: string
}

export type AccountLoginProps = {
  registerHref?: string
  backHref?: string
  forgotPasswordHref?: string
  redirectTo?: string
  submitLabel?: string
  defaultCountry?: string
  onSuccess?: (result: LoginAccountResult) => void
  onSubmit?: (
    input: LoginAccountInput,
  ) => Promise<LoginAccountResult | void> | LoginAccountResult | void
  className?: string
}

export type AccountSessionUser = {
  id: string | null
  name: string | null
  email: string | null
  phone: string | null
  avatar: string | null
  avatarUrl: string | null
  role: LoginAccountRole | null
}

export type AccountSession = {
  accessToken: string | null
  refreshToken: string | null
  tokenType: string | null
  expiresIn: number | null
  user: AccountSessionUser
  login: LoginAccountResult
}

export type AccountAuthenticatedProps = {
  variant?: "icon" | "nav"
  className?: string
  children?: ReactNode
}

export type AccountAuthShellProps = {
  backHref?: string
  backLabel?: string
  formTitle?: string
  headline: ReactNode
  illustration: ReactNode
  footer: ReactNode
  children: ReactNode
  className?: string
}
