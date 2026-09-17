"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useId, useState, type FormEvent } from "react"

import Button from "@/components/ui/Button"
import Checkbox from "@/components/ui/Checkbox"
import Input from "@/components/ui/Input"
import Radio, { RadioGroup } from "@/components/ui/Radio"
import Spinner from "@/components/ui/Spinner"
import { accountApi } from "@/lib/api/accounts"
import { cn } from "@/lib/cn"
import { AUTH_SIGNIN_PATH } from "@/lib/routing/auth"
import {
  ACCOUNT_ROLE_IDS,
  type AccountCreationFormProps,
  type AccountRoleOption,
  type RegisterAccountInput,
} from "@/features/account/types"
import { saveAccountSession, sessionFromRegister } from "@/features/account/session"

import AccountAuthShell, { ErrorIcon, EyeIcon } from "./AccountAuthShell"
import AccountPhoneInput, { isAccountPhoneValid } from "./AccountPhoneInput"

const DEFAULT_ROLES: AccountRoleOption[] = [
  {
    id: ACCOUNT_ROLE_IDS.locataire,
    label: "Futur(e) locataire ou futur(e) propriétaire",
  },
  {
    id: ACCOUNT_ROLE_IDS.proprietaire,
    label: "Propriétaire de biens immobiliers",
  },
  {
    id: ACCOUNT_ROLE_IDS.professionnel,
    label: "Professionnel(le) immobilier(e)",
  },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldClassName = cn(
  "h-11 rounded-xl shadow-none",
  "focus-visible:ring-offset-0",
)

function CreateAccountIllustration() {
  return (
    <svg viewBox="0 0 280 240" fill="none" aria-hidden="true" className="mx-auto h-auto w-full">
      <ellipse cx="168" cy="178" rx="78" ry="18" fill="#e6f4fa" />
      <path
        d="M198 188c18-28 8-62-18-74"
        stroke="#b8d4e6"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="168" cy="58" r="22" fill="#0b1f3a" />
      <path
        d="M146 86c6-16 14-22 22-22s16 6 22 22"
        fill="#0b1f3a"
      />
      <rect x="132" y="84" width="72" height="86" rx="18" fill="#1a3a5c" />
      <circle cx="168" cy="108" r="10" fill="#e6f4fa" />
      <rect x="118" y="118" width="100" height="108" rx="16" fill="white" stroke="#d4e6f0" strokeWidth="2" />
      <circle cx="118" cy="126" r="14" fill="#0096d6" />
      <path d="M118 120v12M112 126h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <rect x="134" y="138" width="32" height="14" rx="4" fill="#e6f4fa" />
      <rect x="170" y="138" width="32" height="14" rx="4" fill="#e6f4fa" />
      <rect x="134" y="158" width="68" height="14" rx="4" fill="#e6f4fa" />
      <rect x="134" y="178" width="68" height="14" rx="4" fill="#e6f4fa" />
      <rect x="134" y="198" width="68" height="16" rx="8" fill="#0096d6" />
    </svg>
  )
}

function validate(values: {
  userRole: string
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  acceptedTerms: boolean
}) {
  const errors: Partial<Record<keyof typeof values, string>> = {}

  if (!values.userRole) {
    errors.userRole = "Le rôle est obligatoire"
  }

  if (!values.name.trim()) {
    errors.name = "Le nom et prénom sont obligatoires"
  }

  if (!values.email.trim()) {
    errors.email = "Email est obligatoire"
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Email invalide"
  }

  if (!values.phone.trim()) {
    errors.phone = "Le numéro de téléphone est obligatoire"
  } else if (!isAccountPhoneValid(values.phone)) {
    errors.phone = "Numéro de téléphone invalide"
  }

  if (!values.password) {
    errors.password = "Le mot de passe est obligatoire"
  } else if (values.password.length < 8) {
    errors.password = "Le mot de passe doit contenir au moins 8 caractères"
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Les mots de passe ne correspondent pas"
  }

  if (!values.acceptedTerms) {
    errors.acceptedTerms = "Veuillez accepter les conditions"
  }

  return errors
}

export default function AccountCreationForm({
  roles = DEFAULT_ROLES,
  defaultCountry = "TG",
  loginHref = AUTH_SIGNIN_PATH,
  backHref = "/",
  termsHref = "/toc",
  privacyHref = "/privacy",
  redirectTo = "/",
  submitLabel = "Créer mon compte",
  redirectOnSuccess = true,
  registerOnSubmit = true,
  onUserRoleChange,
  onContinue,
  onSuccess,
  onSubmit,
  className,
}: AccountCreationFormProps) {
  const router = useRouter()
  const formId = useId()
  const [userRole, setUserRole] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const canContinue =
    Object.keys(
      validate({
        userRole,
        name,
        email,
        phone,
        password,
        confirmPassword,
        acceptedTerms,
      }),
    ).length === 0

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const nextErrors = validate({
      userRole,
      name,
      email,
      phone,
      password,
      confirmPassword,
      acceptedTerms,
    })

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const input: RegisterAccountInput = {
      name: name.trim(),
      email: email.trim(),
      phone,
      password,
      confirmPassword,
      userRole,
    }

    if (!registerOnSubmit) {
      onContinue?.(input)
      return
    }

    setPending(true)

    try {
      const result =
        (await onSubmit?.(input)) ?? (await accountApi.registerAccount(input))

      if (result) {
        const session = sessionFromRegister(result, input)
        if (session) {
          saveAccountSession(session)
        }
        onSuccess?.(result, input)
      }

      if (redirectOnSuccess) {
        router.push(redirectTo)
      }
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "La création du compte a échoué. Réessayez.",
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <AccountAuthShell
      backHref={backHref}
      formTitle="Créer votre compte"
      headline={
        <>
          Chez vous, c&apos;est ici.
          <br />
          Faire l&apos;immobilier que vous voulez:
        </>
      }
      illustration={<CreateAccountIllustration />}
      footer={
        <>
          Vous avez déjà un compte?{" "}
          <Link href={loginHref} className="font-medium text-primary hover:underline">
            Se connecter
          </Link>
        </>
      }
      className={className}
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <RadioGroup
          legend="Sélectionnez votre rôle"
          className="text-sm"
        >
          {roles.map((role) => (
            <Radio
              key={String(role.id)}
              name={`${formId}-role`}
              value={String(role.id)}
              checked={userRole === String(role.id)}
              onChange={() => {
                const nextRole = String(role.id)
                setUserRole(nextRole)
                onUserRoleChange?.(nextRole)
              }}
              label={role.label}
            />
          ))}
          {errors.userRole ? (
            <p className="text-xs text-danger">{errors.userRole}</p>
          ) : null}
        </RadioGroup>

        <div>
          <label htmlFor={`${formId}-name`} className="mb-1.5 block text-sm font-medium text-navy">
            Nom et prénom
          </label>
          <div className="relative">
            <Input
              id={`${formId}-name`}
              name="name"
              autoComplete="name"
              placeholder="Entrer votre nom et prenom"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={Boolean(errors.name)}
              className={cn(fieldClassName, errors.name && "border-danger pr-10")}
            />
            {errors.name ? (
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <ErrorIcon />
              </span>
            ) : null}
          </div>
          {errors.name ? (
            <p className="mt-1 text-xs text-danger">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-medium text-navy">
            Adresse email
          </label>
          <div className="relative">
            <Input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Entrer votre adresse email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
              className={cn(fieldClassName, errors.email && "border-danger pr-10")}
            />
            {errors.email ? (
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <ErrorIcon />
              </span>
            ) : null}
          </div>
          {errors.email ? (
            <p className="mt-1 text-xs text-danger">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-sm font-medium text-navy">
            Numéro de téléphone
          </label>
          <AccountPhoneInput
            id={`${formId}-phone`}
            name="phone"
            value={phone}
            onChange={setPhone}
            defaultCountry={defaultCountry}
            disabled={pending}
            invalid={Boolean(errors.phone)}
            placeholder="90 00 00 00"
            autoComplete="tel"
          />
          {errors.phone ? (
            <p className="mt-1 text-xs text-danger">{errors.phone}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-password`} className="mb-1.5 block text-sm font-medium text-navy">
            Mot de passe{" "}
            <span className="font-normal text-subtle">min. 8 caracteres</span>
          </label>
          <div className="relative">
            <Input
              id={`${formId}-password`}
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
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

        <div>
          <label
            htmlFor={`${formId}-confirm-password`}
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Confirmation de mot de passe
          </label>
          <div className="relative">
            <Input
              id={`${formId}-confirm-password`}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              aria-invalid={Boolean(errors.confirmPassword)}
              className={cn(
                fieldClassName,
                "pr-11",
                errors.confirmPassword && "border-danger",
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((current) => !current)}
              className="absolute inset-y-0 right-2 inline-flex items-center px-1 text-subtle hover:text-navy"
              aria-label={
                showConfirmPassword
                  ? "Masquer la confirmation"
                  : "Afficher la confirmation"
              }
            >
              <EyeIcon off={showConfirmPassword} />
            </button>
          </div>
          {errors.confirmPassword ? (
            <p className="mt-1 text-xs text-danger">{errors.confirmPassword}</p>
          ) : null}
        </div>

        <div>
          <Checkbox
            id={`${formId}-terms`}
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            label={
              <span>
                En créant votre compte, vous acceptez{" "}
                <Link href={termsHref} className="text-primary hover:underline">
                  Termes et Conditions
                </Link>{" "}
                et{" "}
                <Link href={privacyHref} className="text-primary hover:underline">
                  Politique de confidentialité
                </Link>
              </span>
            }
          />
          {errors.acceptedTerms ? (
            <p className="mt-1 text-xs text-danger">{errors.acceptedTerms}</p>
          ) : null}
        </div>

        {formError ? (
          <p className="text-sm text-danger">{formError}</p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={pending || !canContinue}
          className="mt-1 h-12 w-full rounded-xl"
        >
          {pending ? <Spinner size="sm" className="text-white" /> : null}
          {submitLabel}
        </Button>
      </form>
    </AccountAuthShell>
  )
}

export { AccountCreationForm }
