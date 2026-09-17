import type {
  CatalogIdFilters,
  CatalogPaginationItem,
  CatalogPaginationProps,
} from "../types"

export const CATALOG_PAGE_SIZE = 6

export function toIdFilterSearchParams(idFilters?: CatalogIdFilters) {
  const params = new URLSearchParams()

  if (!idFilters) {
    return params
  }

  if (idFilters.usage) {
    params.set("usage", String(idFilters.usage))
  }

  if (idFilters.categorie) {
    params.set("categorie", String(idFilters.categorie))
  }

  if (idFilters.ville) {
    params.set("ville", String(idFilters.ville))
  }

  if (idFilters.quartier) {
    params.set("quartier", String(idFilters.quartier))
  }

  if (idFilters.offre) {
    params.set("offre", String(idFilters.offre))
  }

  return params
}

function catalogPath(
  country: string,
  transaction?: string,
  segments: string[] = [],
) {
  return `/${[country, transaction, ...segments].filter(Boolean).join("/")}`
}

function pageHref(
  path: string,
  page: number,
  searchParams?: URLSearchParams,
) {
  const params = new URLSearchParams(searchParams)

  if (page <= 1) {
    params.delete("page")
  } else {
    params.set("page", String(page))
  }

  const query = params.toString()
  return query ? `${path}?${query}` : path
}

function toPaginationItems(
  currentPage: number,
  totalPages: number,
  path: string,
  searchParams?: URLSearchParams,
): CatalogPaginationItem[] {
  if (totalPages <= 1) {
    return [
      {
        type: "page",
        page: 1,
        href: pageHref(path, 1, searchParams),
        current: true,
      },
    ]
  }

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1

      return {
        type: "page" as const,
        page,
        href: pageHref(path, page, searchParams),
        current: page === currentPage,
      }
    })
  }

  const items: CatalogPaginationItem[] = [
    {
      type: "page",
      page: 1,
      href: pageHref(path, 1, searchParams),
      current: currentPage === 1,
    },
  ]

  if (currentPage <= 3) {
    items.push(
      {
        type: "page",
        page: 2,
        href: pageHref(path, 2, searchParams),
        current: currentPage === 2,
      },
      {
        type: "page",
        page: 3,
        href: pageHref(path, 3, searchParams),
        current: currentPage === 3,
      },
      { type: "ellipsis", key: "end" },
      {
        type: "page",
        page: totalPages,
        href: pageHref(path, totalPages, searchParams),
        current: false,
      },
    )

    return items
  }

  if (currentPage >= totalPages - 2) {
    items.push(
      { type: "ellipsis", key: "start" },
      {
        type: "page",
        page: totalPages - 2,
        href: pageHref(path, totalPages - 2, searchParams),
        current: currentPage === totalPages - 2,
      },
      {
        type: "page",
        page: totalPages - 1,
        href: pageHref(path, totalPages - 1, searchParams),
        current: currentPage === totalPages - 1,
      },
      {
        type: "page",
        page: totalPages,
        href: pageHref(path, totalPages, searchParams),
        current: currentPage === totalPages,
      },
    )

    return items
  }

  items.push(
    { type: "ellipsis", key: "start" },
    {
      type: "page",
      page: currentPage - 1,
      href: pageHref(path, currentPage - 1, searchParams),
      current: false,
    },
    {
      type: "page",
      page: currentPage,
      href: pageHref(path, currentPage, searchParams),
      current: true,
    },
    {
      type: "page",
      page: currentPage + 1,
      href: pageHref(path, currentPage + 1, searchParams),
      current: false,
    },
    { type: "ellipsis", key: "end" },
    {
      type: "page",
      page: totalPages,
      href: pageHref(path, totalPages, searchParams),
      current: false,
    },
  )

  return items
}

export function buildCatalogPagination({
  country,
  transaction,
  segments,
  totalItems,
  currentPage = 1,
  itemsPerPage = CATALOG_PAGE_SIZE,
  searchParams,
  basePath,
}: {
  country: string
  transaction?: string
  segments: string[]
  totalItems: number
  currentPage?: number
  itemsPerPage?: number
  searchParams?: URLSearchParams
  basePath?: string
}): CatalogPaginationProps | null {
  if (totalItems <= 0) {
    return null
  }

  const pageSize = Math.max(1, itemsPerPage)
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const page = Math.min(Math.max(currentPage, 1), totalPages)
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)
  const path = basePath ?? catalogPath(country, transaction, segments)

  return {
    from,
    to,
    total: totalItems,
    items: toPaginationItems(page, totalPages, path, searchParams),
    previousHref: page > 1 ? pageHref(path, page - 1, searchParams) : undefined,
    nextHref: page < totalPages ? pageHref(path, page + 1, searchParams) : undefined,
  }
}

export function paginateItems<T>(
  items: T[],
  currentPage = 1,
  itemsPerPage = CATALOG_PAGE_SIZE,
) {
  const pageSize = Math.max(1, itemsPerPage)
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const page = Math.min(Math.max(currentPage, 1), totalPages)
  const start = (page - 1) * pageSize

  return items.slice(start, start + pageSize)
}
