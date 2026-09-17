import type {
  PropertyInquiryCategoryGroup,
  PropertyInquiryCategoryOption,
  PropertyInquiryCategoryParts,
} from "@/features/inquiry/types"

const CATEGORY_GROUP_LABELS: Record<string, string> = {
  Logement: "Logement",
  Bail: "Bail",
  Sejour: "Séjour",
  Achat: "Achat",
}

export function parseInquiryCategoryValue(
  value: string,
): PropertyInquiryCategoryParts {
  const separator = value.indexOf(",")
  if (separator < 0) {
    return {
      category_inquiry: value.trim(),
      project_name: "",
    }
  }

  return {
    category_inquiry: value.slice(0, separator).trim(),
    project_name: value.slice(separator + 1).trim(),
  }
}

function toCategoryOption(
  value: string,
  label: string,
): PropertyInquiryCategoryOption {
  return {
    value,
    label,
    ...parseInquiryCategoryValue(value),
  }
}

export const DEFAULT_PROPERTY_INQUIRY_CATEGORIES: PropertyInquiryCategoryOption[] =
  [
    toCategoryOption(
      "Logement,Location d'appartement",
      "Location d'appartement",
    ),
    toCategoryOption("Logement,Location de villa", "Location de villa"),
    toCategoryOption("Bail,Location de bureau", "Location de bureau"),
    toCategoryOption("Bail,Location de magasin", "Location de magasin"),
    toCategoryOption("Bail,Location de boutique", "Location de boutique"),
    toCategoryOption(
      "Bail,Location de Salle de Conference",
      "Location de salle de conférence",
    ),
    toCategoryOption("Bail,Location de terrain", "Location de terrain"),
    toCategoryOption(
      "Sejour,Reservation de sejour",
      "Réservation de séjour meublé",
    ),
    toCategoryOption("Achat,Terrain rural", "Achat d'un terrain rural"),
    toCategoryOption("Achat,Terrain urbain", "Achat d'un terrain urbain"),
    toCategoryOption("Achat,Achat de Villa", "Achat de villa"),
    toCategoryOption("Achat,Achat d'appartement", "Achat d'appartement"),
  ]

export function groupPropertyInquiryCategories(
  options: PropertyInquiryCategoryOption[] = DEFAULT_PROPERTY_INQUIRY_CATEGORIES,
): PropertyInquiryCategoryGroup[] {
  const groups: PropertyInquiryCategoryGroup[] = []
  const indexByCategory = new Map<string, number>()

  for (const option of options) {
    const existingIndex = indexByCategory.get(option.category_inquiry)

    if (existingIndex != null) {
      groups[existingIndex].options.push(option)
      continue
    }

    indexByCategory.set(option.category_inquiry, groups.length)
    groups.push({
      category_inquiry: option.category_inquiry,
      label:
        CATEGORY_GROUP_LABELS[option.category_inquiry] ??
        option.category_inquiry,
      options: [option],
    })
  }

  return groups
}

export function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
