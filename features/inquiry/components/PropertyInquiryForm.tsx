"use client"

import { useId, useState, type FormEvent } from "react"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Spinner from "@/components/ui/Spinner"
import Textarea from "@/components/ui/Textarea"
import { useAccountSession } from "@/features/account/useAccountSession"
import { resolveSessionUserId } from "@/features/account/session"
import { cn } from "@/lib/cn"
import { inquiryApi } from "@/lib/api/inquiries"
import type { SendPropertyInquiryInput } from "@/lib/api/types"
import type {
  PropertyInquiryFormInput,
  PropertyInquiryFormProps,
} from "@/features/inquiry/types"

import {
  DEFAULT_PROPERTY_INQUIRY_CATEGORIES,
  groupPropertyInquiryCategories,
  parseInquiryCategoryValue,
  toIsoDate,
} from "./buildPropertyInquiryForm"

const fieldClassName = cn(
  "h-11 rounded-xl shadow-none",
  "focus-visible:ring-offset-0",
)

function toUserId(value: string | number | null | undefined) {
  if (value == null || value === "") {
    return undefined
  }

  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : undefined
}

function toSendPropertyInquiryInput(
  input: PropertyInquiryFormInput,
  userId?: number,
): SendPropertyInquiryInput {
  return {
    final_date: input.final_date,
    start_date: toIsoDate(new Date()),
    description: input.description,
    project_category: input.category_inquiry,
    ...(userId != null ? { user_id: userId } : {}),
    ...(input.project_name.trim() ? { project_name: input.project_name } : {}),
    ...(input.illustration
      ? { project_document: input.illustration.name }
      : {}),
  }
}

function validate(values: {
  categoryValue: string
  final_date: string
  description: string
}) {
  const errors: Partial<Record<keyof typeof values, string>> = {}

  if (!values.categoryValue) {
    errors.categoryValue = "La catégorie est obligatoire"
  }

  if (!values.final_date) {
    errors.final_date = "La date de livraison est obligatoire"
  }

  if (!values.description.trim()) {
    errors.description = "La description est obligatoire"
  }

  return errors
}

export default function PropertyInquiryForm({
  categories = DEFAULT_PROPERTY_INQUIRY_CATEGORIES,
  title = "Exprimer une demande immobilière",
  submitLabel = "Envoyer la demande",
  defaultValues,
  onSuccess,
  onSubmit,
  className,
}: PropertyInquiryFormProps) {
  const formId = useId()
  const { session } = useAccountSession()
  const groups = groupPropertyInquiryCategories(categories)
  const minDate = toIsoDate(new Date())

  const [categoryValue, setCategoryValue] = useState(
    defaultValues?.categoryValue ?? "",
  )
  const [finalDate, setFinalDate] = useState(defaultValues?.final_date ?? "")
  const [description, setDescription] = useState(
    defaultValues?.description ?? "",
  )
  const [illustration, setIllustration] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const nextErrors = validate({
      categoryValue,
      final_date: finalDate,
      description,
    })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const { category_inquiry, project_name } =
      parseInquiryCategoryValue(categoryValue)

    const input: PropertyInquiryFormInput = {
      category_inquiry,
      project_name,
      final_date: finalDate,
      description: description.trim(),
      illustration,
    }

    setPending(true)

    try {
      if (onSubmit) {
        const result = await onSubmit(input)

        if (result) {
          onSuccess?.(result, input)
        }

        return
      }

      const result = await inquiryApi.sendPropertyInquiry(
        toSendPropertyInquiryInput(input, resolveSessionUserId(session)),
        session?.accessToken,
      )

      if (result) {
        onSuccess?.(result, input)
      }
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "L'envoi de la demande a échoué. Réessayez.",
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
      aria-label={title || "Demande immobilière"}
      aria-labelledby={title ? `${formId}-title` : undefined}
    >
      {title ? (
        <h2
          id={`${formId}-title`}
          className="text-lg font-bold tracking-tight text-navy"
        >
          {title}
        </h2>
      ) : null}

      <form
        className={cn("flex flex-col gap-5", title && "mt-5")}
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label
            htmlFor={`${formId}-category`}
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Catégorie de la demande
          </label>
          <Select
            id={`${formId}-category`}
            name="category"
            value={categoryValue}
            required
            disabled={pending}
            aria-invalid={Boolean(errors.categoryValue)}
            onChange={(event) => setCategoryValue(event.target.value)}
            className={cn(
              fieldClassName,
              errors.categoryValue && "border-danger",
            )}
          >
            <option value="" disabled>
              Choisir une catégorie
            </option>
            {groups.map((group) => (
              <optgroup key={group.category_inquiry} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </Select>
          {errors.categoryValue ? (
            <p className="mt-1 text-xs text-danger">{errors.categoryValue}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-delivery-date`}
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Date de livraison
          </label>
          <Input
            id={`${formId}-delivery-date`}
            name="final_date"
            type="date"
            value={finalDate}
            min={minDate}
            required
            disabled={pending}
            aria-invalid={Boolean(errors.final_date)}
            onChange={(event) => setFinalDate(event.target.value)}
            className={cn(
              fieldClassName,
              "[color-scheme:light]",
              errors.final_date && "border-danger",
            )}
          />
          {errors.final_date ? (
            <p className="mt-1 text-xs text-danger">{errors.final_date}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-description`}
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Description
          </label>
          <Textarea
            id={`${formId}-description`}
            name="description"
            value={description}
            required
            disabled={pending}
            rows={5}
            placeholder="Décrivez le bien recherché, le quartier, le budget..."
            aria-invalid={Boolean(errors.description)}
            onChange={(event) => setDescription(event.target.value)}
            className={cn(
              "rounded-xl shadow-none focus-visible:ring-offset-0",
              errors.description && "border-danger",
            )}
          />
          {errors.description ? (
            <p className="mt-1 text-xs text-danger">{errors.description}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-illustration`}
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Illustration{" "}
            <span className="font-normal text-muted">(optionnel)</span>
          </label>
          <Input
            id={`${formId}-illustration`}
            name="illustration"
            type="file"
            accept="image/*"
            required={false}
            disabled={pending}
            onChange={(event) =>
              setIllustration(event.target.files?.[0] ?? null)
            }
            className={cn(fieldClassName, "py-2 file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-navy")}
          />
          {illustration ? (
            <p className="mt-1 text-xs text-muted">{illustration.name}</p>
          ) : null}
        </div>

        {formError ? <p className="text-sm text-danger">{formError}</p> : null}

        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="h-12 w-full rounded-xl"
        >
          {pending ? <Spinner size="sm" className="text-white" /> : null}
          {submitLabel}
        </Button>
      </form>
    </section>
  )
}

export { PropertyInquiryForm, toSendPropertyInquiryInput, toUserId }
