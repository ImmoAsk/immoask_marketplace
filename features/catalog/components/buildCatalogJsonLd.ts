import type { Property } from "@/features/catalog/types"
import type { CatalogHeaderBreadcrumbItem } from "@/features/properties/types"
import {
  IMMOASK_SITE_URL,
  immoAskOrganizationJsonLd,
  immoAskWebSiteJsonLd,
  toAbsoluteUrl,
} from "@/lib/seo/site"
import { createPropertyLink } from "@/lib/utils/createPropertyLink"

type CatalogJsonLdInput = {
  title: string
  description: string
  path: string
  country: string
  transaction?: string
  breadcrumbs: CatalogHeaderBreadcrumbItem[]
  properties: Property[]
}

function toBreadcrumbList(items: CatalogHeaderBreadcrumbItem[]) {
  const elements = items
    .map((item, index) => {
      if (!item.label) {
        return null
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...(item.href ? { item: toAbsoluteUrl(item.href) } : {}),
      }
    })
    .filter(Boolean)

  if (elements.length === 0) {
    return null
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: elements,
  }
}

export function buildCatalogJsonLd({
  title,
  description,
  path,
  country,
  transaction,
  breadcrumbs,
  properties,
}: CatalogJsonLdInput) {
  const url = toAbsoluteUrl(path)
  const breadcrumb = toBreadcrumbList(breadcrumbs)
  const itemListElement = properties.map((property, index) => {
    const href = createPropertyLink({
      country: property.country || country,
      transaction,
      offreId: property.offreId,
      offreName: property.offreName,
      category: property.categorySlug,
      city: property.citySlug,
      district: property.districtSlug,
      nuo: property.nuo,
    })

    return {
      "@type": "ListItem",
      position: index + 1,
      url: toAbsoluteUrl(href),
      name: property.title || `Bien N°${property.nuo}`,
    }
  })

  return {
    "@context": "https://schema.org",
    "@graph": [
      immoAskOrganizationJsonLd(),
      immoAskWebSiteJsonLd(),
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: title,
        headline: title,
        description,
        url,
        inLanguage: "fr",
        isPartOf: { "@id": `${IMMOASK_SITE_URL}/#website` },
        publisher: { "@id": `${IMMOASK_SITE_URL}/#organization` },
        about: {
          "@type": "Thing",
          name: "Immobilier",
          description: title,
        },
        mainEntity: {
          "@type": "ItemList",
          name: title,
          numberOfItems: itemListElement.length,
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          itemListElement,
        },
        ...(breadcrumb ? { breadcrumb } : {}),
      },
    ],
  }
}
