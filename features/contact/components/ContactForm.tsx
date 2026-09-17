"use client"

import { useId, useState, type FormEvent } from "react"

import Alert from "@/components/ui/Alert"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Spinner from "@/components/ui/Spinner"
import Textarea from "@/components/ui/Textarea"
import AccountPhoneInput, {
  isAccountPhoneValid,
} from "@/features/account/components/AccountPhoneInput"
import { cn } from "@/lib/cn"
import {
  isContactObjectId,
  type ContactFormInput,
  type ContactFormProps,
  type ContactFormValues,
} from "@/features/contact/types"

import { DEFAULT_CONTACT_OBJECT_OPTIONS } from "./buildContactForm"
import { sendContactDemandeEmails } from "./buildContactNewDemandeEmail"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldClassName = cn(
  "h-11 rounded-xl shadow-none",
  "focus-visible:ring-offset-0",
)

function toOptionalPhone(value: string) {
  const trimmed = value.trim()

  if (!trimmed || /^\+\d{1,4}$/.test(trimmed)) {
    return ""
  }

  return trimmed
}

function validate(values: ContactFormValues) {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {}

  if (!values.contact_object) {
    errors.contact_object = "L'objet du contact est obligatoire"
  }

  if (!values.user_email.trim()) {
    errors.user_email = "L'email est obligatoire"
  } else if (!EMAIL_PATTERN.test(values.user_email.trim())) {
    errors.user_email = "Email invalide"
  }

  const phone = toOptionalPhone(values.user_phoneNumber)

  if (phone && !isAccountPhoneValid(phone)) {
    errors.user_phoneNumber = "Numéro de téléphone invalide"
  }

  if (!values.contact_description.trim()) {
    errors.contact_description = "La description est obligatoire"
  } else if (values.contact_description.trim().length < 20) {
    errors.contact_description =
      "Merci de décrire votre projet en au moins 20 caractères"
  }

  return errors
}

function isFormReady(values: ContactFormValues) {
  return Object.keys(validate(values)).length === 0
}

export default function ContactForm({
  title = "Formulaire de contact",
  subtitle,
  objectLabel = "Quel est l'objet du contact",
  descriptionLabel = "Description du contact",
  descriptionPlaceholder = "Décrivez votre projet, votre localisation, vos objectifs et toute information utile…",
  objectPlaceholder = "Choisir un objet",
  emailLabel = "Adresse email",
  phoneLabel = "Numéro de téléphone",
  emailPlaceholder = "vous@exemple.com",
  phonePlaceholder = "90 00 00 00",
  submitLabel = "Envoyer le message",
  objectOptions = DEFAULT_CONTACT_OBJECT_OPTIONS,
  defaultValues,
  onSuccess,
  onSubmit,
  className,
}: ContactFormProps) {
  const formId = useId()

  const [contactObject, setContactObject] = useState<
    ContactFormValues["contact_object"]
  >(defaultValues?.contact_object ?? "")
  const [userEmail, setUserEmail] = useState(defaultValues?.user_email ?? "")
  const [userPhoneNumber, setUserPhoneNumber] = useState(
    defaultValues?.user_phoneNumber ?? "",
  )
  const [contactDescription, setContactDescription] = useState(
    defaultValues?.contact_description ?? "",
  )
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({})
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const currentValues: ContactFormValues = {
    contact_object: isContactObjectId(contactObject) ? contactObject : "",
    contact_description: contactDescription,
    user_email: userEmail,
    user_phoneNumber: userPhoneNumber,
  }
  const canSubmit = isFormReady(currentValues)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    setSuccessMessage(null)

    const nextErrors = validate(currentValues)
    setErrors(nextErrors)

    if (
      Object.keys(nextErrors).length > 0 ||
      !isContactObjectId(currentValues.contact_object)
    ) {
      return
    }

    const phone = toOptionalPhone(currentValues.user_phoneNumber)
    const input: ContactFormInput = {
      contact_object: currentValues.contact_object,
      contact_description: currentValues.contact_description.trim(),
      user_email: currentValues.user_email.trim(),
      ...(phone ? { user_phoneNumber: phone } : {}),
    }

    setPending(true)

    try {
      if (onSubmit) {
        await onSubmit(input)
      } else {
        await sendContactDemandeEmails(input, objectOptions)
      }

      setSuccessMessage(
        "Votre message a bien été pris en compte. Notre équipe vous recontactera rapidement.",
      )
      setContactObject("")
      setUserEmail("")
      setUserPhoneNumber("")
      setContactDescription("")
      setErrors({})
      onSuccess?.(input)
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "L'envoi du message a échoué. Réessayez.",
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <section
      className={cn(
        "rounded-2xl bg-white p-5 shadow-card sm:p-6",
        className,
      )}
      aria-label={title || "Formulaire de contact"}
      aria-labelledby={title ? `${formId}-title` : undefined}
    >
      {title ? (
        <header>
          <h2
            id={`${formId}-title`}
            className="text-lg font-bold tracking-tight text-navy sm:text-xl"
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>
          ) : null}
        </header>
      ) : null}

      <form
        className={cn("flex flex-col gap-5", title && "mt-5")}
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label
            htmlFor={`${formId}-contact-object`}
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            {objectLabel}
          </label>
          <Select
            id={`${formId}-contact-object`}
            name="contact_object"
            value={contactObject}
            required
            disabled={pending}
            aria-invalid={Boolean(errors.contact_object)}
            onChange={(event) => {
              const value = event.target.value
              setContactObject(isContactObjectId(value) ? value : "")
            }}
            className={cn(
              fieldClassName,
              errors.contact_object && "border-danger",
            )}
          >
            <option value="" disabled>
              {objectPlaceholder}
            </option>
            {objectOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </Select>
          {errors.contact_object ? (
            <p className="mt-1 text-xs text-danger">{errors.contact_object}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-user-email`}
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            {emailLabel}
          </label>
          <Input
            id={`${formId}-user-email`}
            name="user_email"
            type="email"
            autoComplete="email"
            value={userEmail}
            required
            disabled={pending}
            placeholder={emailPlaceholder}
            aria-invalid={Boolean(errors.user_email)}
            onChange={(event) => setUserEmail(event.target.value)}
            className={cn(fieldClassName, errors.user_email && "border-danger")}
          />
          {errors.user_email ? (
            <p className="mt-1 text-xs text-danger">{errors.user_email}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-user-phone`}
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            {phoneLabel}{" "}
            <span className="font-normal text-muted">(optionnel)</span>
          </label>
          <AccountPhoneInput
            id={`${formId}-user-phone`}
            name="user_phoneNumber"
            value={userPhoneNumber}
            disabled={pending}
            invalid={Boolean(errors.user_phoneNumber)}
            placeholder={phonePlaceholder}
            onChange={setUserPhoneNumber}
          />
          {errors.user_phoneNumber ? (
            <p className="mt-1 text-xs text-danger">{errors.user_phoneNumber}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-contact-description`}
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            {descriptionLabel}
          </label>
          <Textarea
            id={`${formId}-contact-description`}
            name="contact_description"
            value={contactDescription}
            required
            disabled={pending}
            rows={6}
            placeholder={descriptionPlaceholder}
            aria-invalid={Boolean(errors.contact_description)}
            onChange={(event) => setContactDescription(event.target.value)}
            className={cn(
              "rounded-xl shadow-none focus-visible:ring-offset-0",
              errors.contact_description && "border-danger",
            )}
          />
          {errors.contact_description ? (
            <p className="mt-1 text-xs text-danger">
              {errors.contact_description}
            </p>
          ) : null}
        </div>

        {formError ? (
          <Alert variant="danger" title="Envoi impossible">
            {formError}
          </Alert>
        ) : null}

        {successMessage ? (
          <Alert variant="success" title="Message envoyé">
            {successMessage}
          </Alert>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={pending || !canSubmit}
          className="h-12 w-full rounded-xl"
        >
          {pending ? <Spinner size="sm" className="text-white" /> : null}
          {submitLabel}
        </Button>
      </form>
    </section>
  )
}

export { ContactForm }
