const TRANSACTION_BY_OFFRE_ID: Record<number, string> = {
  1: "locations-immobilieres",
  2: "ventes-immobilieres",
  3: "baux-immobiliers",
  4: "investissements-immobiliers",
}

const TRANSACTION_BY_OFFRE_NAME: Record<string, string> = {
  louer: "locations-immobilieres",
  location: "locations-immobilieres",
  vendre: "ventes-immobilieres",
  vente: "ventes-immobilieres",
  bail: "baux-immobiliers",
  investir: "investissements-immobiliers",
}

export type PropertyLinkInput = {
  country: string
  nuo: number
  category: string
  city: string
  district: string
  transaction?: string
  offreId?: number | null
  offreName?: string | null
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getTransactionSlug({
  transaction,
  offreId,
  offreName,
}: Pick<PropertyLinkInput, "transaction" | "offreId" | "offreName">) {
  if (offreId != null && TRANSACTION_BY_OFFRE_ID[Number(offreId)]) {
    return TRANSACTION_BY_OFFRE_ID[Number(offreId)]
  }

  if (offreName) {
    return TRANSACTION_BY_OFFRE_NAME[offreName.toLowerCase()] ?? slugify(offreName)
  }

  if (transaction) {
    return slugify(transaction)
  }

  return ""
}

export function createPropertyLink({
  country,
  nuo,
  category,
  city,
  district,
  transaction,
  offreId,
  offreName,
}: PropertyLinkInput) {
  const parts = [
    slugify(country),
    getTransactionSlug({ transaction, offreId, offreName }),
    slugify(category),
    slugify(city),
    slugify(district),
    String(nuo),
  ].filter(Boolean)

  return `/${parts.join("/")}`
}
