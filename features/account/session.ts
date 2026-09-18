import type {
  AccountSession,
  LoginAccountRole,
  LoginAccountResult,
  RegisterAccountInput,
  RegisterAccountResult,
} from "@/features/account/types"

export const ACCOUNT_SESSION_STORAGE_KEY = "immoask.account.session"
export const ACCOUNT_SESSION_EVENT = "immoask-account-session"

const AVATARS_BASE = "https://immoaskprodapi.omnisoft.africa/storage/uploads/visuels/avatars/"

export function resolveAccountAvatar(avatar?: string | null) {
  const value = avatar?.trim()

  if (!value || value === "default.png") {
    return null
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value
  }

  return `${AVATARS_BASE}${value}`
}

function looksLikeEmail(value: string) {
  return value.includes("@")
}

function toOptionalPositiveId(value: string | number | null | undefined) {
  if (value == null || value === "") {
    return undefined
  }

  const id = typeof value === "number" ? value : Number(value)

  return Number.isInteger(id) && id > 0 ? id : undefined
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const segment = token.split(".")[1]

  if (!segment) {
    return null
  }

  try {
    const normalized = segment.replace(/-/g, "+").replace(/_/g, "/")
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=")

    return JSON.parse(atob(padded)) as Record<string, unknown>
  } catch {
    return null
  }
}

export function resolveSessionUserId(session?: AccountSession | null) {
  const fromUser = toOptionalPositiveId(session?.user.id)

  if (fromUser != null) {
    return fromUser
  }

  const fromLogin = toOptionalPositiveId(session?.login?.user?.id)

  if (fromLogin != null) {
    return fromLogin
  }

  const token = session?.accessToken?.trim()

  if (!token) {
    return undefined
  }

  const payload = decodeJwtPayload(token)

  return toOptionalPositiveId(
    (payload?.sub ?? payload?.user_id ?? payload?.id) as
      | string
      | number
      | null
      | undefined,
  )
}

const ROLE_NAME_BY_CODE: Record<string, string> = {
  AGENT: "Agent immobilier",
  AGENT_IMMOBILIER: "Agent immobilier",
  PROPRIETAIRE: "Proprietaire",
  OWNER: "Proprietaire",
  SUPER_ADMIN: "Super administrateur",
  SUPERADMIN: "Super administrateur",
  ADMIN: "Super administrateur",
}

export function resolveAccountRoleName(role?: LoginAccountRole | null) {
  const fromApi = role?.roleName?.trim() || role?.description?.trim()

  if (fromApi) {
    return fromApi
  }

  const code = role?.code?.trim().toUpperCase().replace(/[\s-]+/g, "_")

  if (code && ROLE_NAME_BY_CODE[code]) {
    return ROLE_NAME_BY_CODE[code]
  }

  return null
}

export function readAccountSession(): AccountSession | null {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const raw = window.localStorage.getItem(ACCOUNT_SESSION_STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw) as AccountSession
    if (!parsed?.user || !parsed.accessToken) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function saveAccountSession(session: AccountSession) {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(ACCOUNT_SESSION_STORAGE_KEY, JSON.stringify(session))
  window.dispatchEvent(new Event(ACCOUNT_SESSION_EVENT))
}

export function clearAccountSession() {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.removeItem(ACCOUNT_SESSION_STORAGE_KEY)
  window.dispatchEvent(new Event(ACCOUNT_SESSION_EVENT))
}

export function sessionFromLogin(
  result: LoginAccountResult,
  username: string,
): AccountSession {
  const phone =
    result.user?.phone?.trim() ||
    (looksLikeEmail(username) ? null : username)

  return {
    accessToken: result.access_token,
    refreshToken: result.refresh_token,
    tokenType: result.token_type,
    expiresIn: result.expires_in,
    user: {
      id: result.user?.id != null ? String(result.user.id) : null,
      name: result.user?.name ?? null,
      email: result.user?.email ?? (looksLikeEmail(username) ? username : null),
      phone,
      avatar: result.user?.avatar ?? null,
      avatarUrl: resolveAccountAvatar(result.user?.avatar),
      role: result.user?.role
        ? {
            id: result.user.role.id ?? null,
            roleName: result.user.role.roleName ?? null,
            description: result.user.role.description ?? null,
            statut: result.user.role.statut ?? null,
            code: result.user.role.code ?? null,
          }
        : null,
    },
    login: result,
  }
}

export function sessionFromRegister(
  result: RegisterAccountResult,
  input: RegisterAccountInput,
): AccountSession | null {
  if (!result.tokens?.access_token) {
    return null
  }

  const tokenUserId = resolveSessionUserId({
    accessToken: result.tokens.access_token,
    refreshToken: null,
    tokenType: null,
    expiresIn: null,
    user: {
      id: null,
      name: input.name,
      email: input.email,
      phone: input.phone,
      avatar: null,
      avatarUrl: null,
      role: null,
    },
    login: {
      access_token: result.tokens.access_token,
      token_type: null,
      expires_in: null,
      refresh_token: null,
      user: null,
    },
  })

  const login: LoginAccountResult = {
    access_token: result.tokens.access_token,
    token_type: null,
    expires_in: null,
    refresh_token: null,
    user: {
      name: input.name,
      id: tokenUserId ?? null,
      email: input.email,
      phone: input.phone,
      avatar: null,
      role: null,
    },
  }

  return sessionFromLogin(login, input.email)
}
