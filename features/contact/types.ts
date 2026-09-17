export const CONTACT_OBJECT_IDS = [
  "investissement-grande-envergure",
  "exploitation-terrains-titres",
  "construction-hotels",
  "promotion-immobiliere",
] as const

export type ContactObjectId = (typeof CONTACT_OBJECT_IDS)[number]

export type ContactObjectOption = {
  id: ContactObjectId
  label: string
}

export type ContactFormValues = {
  contact_object: ContactObjectId | ""
  contact_description: string
  user_email: string
  user_phoneNumber: string
}

export type ContactFormInput = {
  contact_object: ContactObjectId
  contact_description: string
  user_email: string
  user_phoneNumber?: string
}

export type ContactFormProps = {
  title?: string
  subtitle?: string
  objectLabel?: string
  descriptionLabel?: string
  descriptionPlaceholder?: string
  objectPlaceholder?: string
  emailLabel?: string
  phoneLabel?: string
  emailPlaceholder?: string
  phonePlaceholder?: string
  submitLabel?: string
  objectOptions?: ContactObjectOption[]
  defaultValues?: Partial<ContactFormValues>
  onSuccess?: (input: ContactFormInput) => void
  onSubmit?: (
    input: ContactFormInput,
  ) => Promise<void | ContactFormInput> | void | ContactFormInput
  className?: string
}

export function isContactObjectId(
  value: string | null | undefined,
): value is ContactObjectId {
  return (
    value === "investissement-grande-envergure" ||
    value === "exploitation-terrains-titres" ||
    value === "construction-hotels" ||
    value === "promotion-immobiliere"
  )
}
