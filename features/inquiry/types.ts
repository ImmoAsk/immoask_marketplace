import type { SendPropertyInquiryResult } from "@/lib/api/types"

export type {
  PropertySeekersPlanUserRoleId,
  UserRole,
  UserRoleKey,
} from "@/lib/api/accounts"

export {
  PROPERTY_SEEKERS_PLAN_USER_ROLES,
  USER_ROLES,
  isPropertySeekersPlanUserRoleId,
  userRoleForPropertySeekersPlan,
} from "@/lib/api/accounts"

export type PropertyInquiryCategoryOption = {
  value: string
  label: string
  category_inquiry: string
  project_name: string
}

export type PropertyInquiryCategoryGroup = {
  category_inquiry: string
  label: string
  options: PropertyInquiryCategoryOption[]
}

export type PropertyInquiryCategoryParts = {
  category_inquiry: string
  project_name: string
}

export type PropertyInquiryFormInput = {
  category_inquiry: string
  project_name: string
  final_date: string
  description: string
  illustration: File | null
}

export type PropertyInquiryFormValues = {
  categoryValue: string
  final_date: string
  description: string
}

export type PropertyInquiryFormProps = {
  categories?: PropertyInquiryCategoryOption[]
  title?: string
  submitLabel?: string
  defaultValues?: Partial<PropertyInquiryFormValues>
  onSuccess?: (
    result: SendPropertyInquiryResult,
    input: PropertyInquiryFormInput,
  ) => void
  onSubmit?: (
    input: PropertyInquiryFormInput,
  ) =>
    | Promise<SendPropertyInquiryResult | void>
    | SendPropertyInquiryResult
    | void
  className?: string
}
