import { slugify } from "@/lib/utils/createPropertyLink"

import type { CatalogIdFilters, CatalogMoreButtonProps } from "../types"

export function toCatalogFilterHref(
  country: string,
  filters: CatalogIdFilters = {},
) {
  const params = new URLSearchParams()

  if (filters.usage) {
    params.set("usage", String(filters.usage))
  }

  if (filters.categorie) {
    params.set("categorie", String(filters.categorie))
  }

  if (filters.ville) {
    params.set("ville", String(filters.ville))
  }

  if (filters.quartier) {
    params.set("quartier", String(filters.quartier))
  }

  if (filters.offre) {
    params.set("offre", String(filters.offre))
  }

  const query = params.toString()
  return `/${slugify(country)}/catalog${query ? `?${query}` : ""}`
}

export function buildCatalogMoreButton({
  country,
  label,
  usage,
  categorie,
  ville,
  quartier,
  offre,
}: {
  country: string
  label: string
} & CatalogIdFilters): CatalogMoreButtonProps {
  return {
    href: toCatalogFilterHref(country, {
      usage,
      categorie,
      ville,
      quartier,
      offre,
    }),
    label,
  }
}
