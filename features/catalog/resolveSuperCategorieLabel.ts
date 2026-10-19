export const SUPER_CATEGORIES = [
  "Sejour",
  "Acquisition",
  "Logement",
  "Commercial",
] as const

export type SuperCategorie = (typeof SUPER_CATEGORIES)[number]

function normalizeSuperCategorieKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
}

const SUPER_CATEGORIE_BY_KEY: Record<string, SuperCategorie> = {
  sejour: "Sejour",
  acquisition: "Acquisition",
  logement: "Logement",
  commercial: "Commercial",
}

export function resolveSuperCategorieLabel(
  value?: string | null,
): SuperCategorie | "" {
  if (!value?.trim()) {
    return ""
  }

  return SUPER_CATEGORIE_BY_KEY[normalizeSuperCategorieKey(value)] ?? ""
}
