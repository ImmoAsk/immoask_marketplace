"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useId, useState, type FormEvent } from "react"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Spinner from "@/components/ui/Spinner"
import { accountApi } from "@/lib/api/accounts"
import { cn } from "@/lib/cn"
import { AUTH_SIGNIN_PATH, AUTH_SIGNUP_PATH } from "@/lib/routing/auth"
import type { AccountLoginProps, LoginAccountInput } from "@/features/account/types"
import { sessionFromLogin, saveAccountSession } from "@/features/account/session"

import AccountAuthShell, { ErrorIcon, EyeIcon } from "./AccountAuthShell"
import AccountPhoneInput, { isAccountPhoneValid } from "./AccountPhoneInput"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldClassName = cn(
  "h-11 rounded-xl shadow-none",
  "focus-visible:ring-offset-0",
)

function LoginIllustration() {
  return (
    <svg viewBox="0 0 280 240" fill="none" aria-hidden="true" className="mx-auto h-auto w-full">
      <ellipse cx="148" cy="214" rx="108" ry="16" fill="#e6f4fa" />
      <circle cx="36" cy="46" r="26" fill="#e6f4fa" />
      <circle cx="248" cy="34" r="18" fill="#f5f8fb" />

      <path
        d="M58 150 L140 64 L222 150"
        stroke="#1aa0e0"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="178" y="72" width="14" height="30" rx="4" fill="#a19fa0" />

      <rect x="82" y="128" width="116" height="76" rx="10" fill="#0b1f3a" />
      <rect x="96" y="142" width="22" height="22" rx="5" fill="#1aa0e0" />
      <rect x="124" y="142" width="22" height="22" rx="5" fill="#1aa0e0" />
      <rect x="96" y="170" width="22" height="22" rx="5" fill="#1aa0e0" />
      <rect x="124" y="170" width="22" height="22" rx="5" fill="#0096d6" />
      <rect x="160" y="158" width="24" height="46" rx="4" fill="#e6f4fa" />
      <circle cx="178" cy="182" r="2.2" fill="#0096d6" />

      <circle cx="214" cy="108" r="24" fill="#0096d6" />
      <rect x="206" y="102" width="16" height="16" rx="3.5" fill="white" />
      <path
        d="M209 102v-4a5 5 0 0 1 10 0v4"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <ellipse cx="58" cy="206" rx="26" ry="7" fill="#f5f8fb" />
      <circle cx="58" cy="150" r="15" fill="#0b1f3a" />
      <path d="M42 204c2-30 10-44 16-44s14 14 16 44" fill="#1aa0e0" />
      <path d="M48 172h20" stroke="#0b1f3a" strokeWidth="6" strokeLinecap="round" />
      <path d="M50 204v-20M70 204v-20" stroke="#0b1f3a" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

function looksLikeEmail(value: string) {
  return value.includes("@")
}

function validate(values: { identifier: string; password: string; useEmail: boolean }) {
  const errors: Partial<Record<"identifier" | "password", string>> = {}
  const identifier = values.identifier.trim()

  if (!identifier) {
    errors.identifier = values.useEmail
      ? "Email est obligatoire"
      : "Le numéro de téléphone est obligatoire"
  } else if (values.useEmail || looksLikeEmail(identifier)) {
    if (!EMAIL_PATTERN.test(identifier)) {
      errors.identifier = "Email invalide"
    }
  } else if (!isAccountPhoneValid(identifier)) {
    errors.identifier = "Numéro de téléphone invalide"
  }

  if (!values.password) {
    errors.password = "Le mot de passe est obligatoire"
  }

  return errors
}

export default function AccountLogin({
  registerHref = AUTH_SIGNUP_PATH,
  backHref = "/",
  forgotPasswordHref = AUTH_SIGNIN_PATH,
  redirectTo = "/",
  submitLabel = "Se connecter",
  defaultCountry = "TG",
  onSuccess,
  onSubmit,
  className,
}: AccountLoginProps) {
  const router = useRouter()
  const formId = useId()
  const [useEmail, setUseEmail] = useState(false)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const nextErrors = validate({ identifier, password, useEmail })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const input: LoginAccountInput = {
      username: identifier.trim(),
      password,
    }

    setPending(true)

    try {
      const result =
        (await onSubmit?.(input)) ?? (await accountApi.loginAccount(input))

      if (!result?.access_token) {
        throw new Error("La connexion a échoué. Vérifiez vos identifiants.")
      }

      saveAccountSession(sessionFromLogin(result, input.username))
      onSuccess?.(result)
      router.push(redirectTo)
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "La connexion a échoué. Vérifiez vos identifiants.",
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <AccountAuthShell
      backHref={backHref}
      headline={
        <>
          Chez vous, c&apos;est ici !
          <br />
          Bon retour chez vous.
        </>
      }
      illustration={<LoginIllustration />}
      footer={
        <>
          Vous n&apos;avez pas de compte?{" "}
          <Link href={registerHref} className="font-medium text-primary hover:underline">
            Créez-en un ici
          </Link>
        </>
      }
      className={className}
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor={`${formId}-identifier`} className="mb-1.5 block text-sm font-medium text-navy">
            {useEmail ? "Adresse e-mail" : "Numéro de téléphone"}
          </label>
          {useEmail ? (
            <div className="relative">
              <Input
                id={`${formId}-identifier`}
                name="identifier"
                type="email"
                autoComplete="username"
                placeholder="Votre email"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                aria-invalid={Boolean(errors.identifier)}
                className={cn(fieldClassName, errors.identifier && "border-danger pr-10")}
              />
              {errors.identifier ? (
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <ErrorIcon />
                </span>
              ) : null}
            </div>
          ) : (
            <AccountPhoneInput
              id={`${formId}-identifier`}
              name="identifier"
              value={identifier}
              onChange={setIdentifier}
              defaultCountry={defaultCountry}
              disabled={pending}
              invalid={Boolean(errors.identifier)}
              placeholder="90 00 00 00"
              autoComplete="tel"
            />
          )}
          {errors.identifier ? (
            <p className="mt-1 text-xs text-danger">{errors.identifier}</p>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setUseEmail((current) => !current)
              setIdentifier("")
              setErrors((current) => {
                const next = { ...current }
                delete next.identifier
                return next
              })
            }}
            className="mt-2 text-xs font-medium text-primary hover:underline"
          >
            {useEmail ? "Utiliser un numéro de téléphone" : "Utiliser un e-mail"}
          </button>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <label htmlFor={`${formId}-password`} className="text-sm font-medium text-navy">
              Mot de passe
            </label>
            <Link
              href={forgotPasswordHref}
              className="text-xs text-muted underline-offset-2 hover:text-navy hover:underline"
            >
              Mot de passe oublié?
            </Link>
          </div>
          <div className="relative">
            <Input
              id={`${formId}-password`}
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(errors.password)}
              className={cn(fieldClassName, "pr-11", errors.password && "border-danger")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute inset-y-0 right-2 inline-flex items-center px-1 text-subtle hover:text-navy"
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              <EyeIcon off={showPassword} />
            </button>
          </div>
          {errors.password ? (
            <p className="mt-1 text-xs text-danger">{errors.password}</p>
          ) : null}
        </div>

        {formError ? (
          <p className="text-sm text-danger">{formError}</p>
        ) : null}

        <Button type="submit" size="lg" disabled={pending} className="h-12 w-full rounded-xl">
          {pending ? <Spinner size="sm" className="text-white" /> : null}
          {submitLabel}
        </Button>
      </form>
    </AccountAuthShell>
  )
}

export { AccountLogin }
