import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"

import { buildCatalogMetadata } from "@/features/catalog/components/buildCatalogMetadata"
import CatalogPage from "@/features/catalog/components/CatalogPage"
import CatalogPageSkeleton from "@/features/catalog/components/CatalogPageSkeleton"
import { buildPropertyDetailMetadata } from "@/features/properties/components/buildPropertyDetailMetadata"
import PropertyDetail from "@/features/properties/components/PropertyDetail"
import PropertyDetailSkeleton from "@/features/properties/components/PropertyDetailSkeleton"
import { getProperty } from "@/features/properties/queries/getProperty"
import { resolveImmoAskRoute } from "@/lib/routing/routes"

type DynamicPageProps = {
  params: Promise<{
    country: string
    transaction: string
    segments?: string[]
  }>
  searchParams: Promise<{
    page?: string | string[]
    chambres?: string | string[]
    bains?: string | string[]
    min?: string | string[]
    max?: string | string[]
    caution?: string | string[]
    garage?: string | string[]
  }>
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const route = await resolveImmoAskRoute(resolvedParams)

  if (route.type === "catalog") {
    return buildCatalogMetadata({
      country: route.country,
      transaction: route.transaction,
      segments: resolvedParams.segments ?? [],
    })
  }

  if (route.type !== "property") {
    return {}
  }

  const property = await getProperty(route.propertyNuo)

  if (!property) {
    return {}
  }

  return buildPropertyDetailMetadata({
    property,
    country: resolvedParams.country,
    transaction: resolvedParams.transaction,
    segments: resolvedParams.segments ?? [],
  })
}

export default async function DynamicPage({
  params,
  searchParams,
}: DynamicPageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const route = await resolveImmoAskRoute(resolvedParams)
  const rawPage = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page
  const page = Number(rawPage)

  function firstValue(value?: string | string[]) {
    const resolved = Array.isArray(value) ? value[0] : value
    return resolved?.trim() || undefined
  }

  switch (route.type) {
    case "catalog":
      return (
        <Suspense fallback={<CatalogPageSkeleton />}>
          <CatalogPage
            country={route.country}
            transaction={route.transaction}
            segments={resolvedParams.segments ?? []}
            page={Number.isInteger(page) && page > 0 ? page : 1}
            filterQuery={{
              bedrooms: firstValue(resolvedSearchParams.chambres),
              bathrooms: firstValue(resolvedSearchParams.bains),
              budgetMin: firstValue(resolvedSearchParams.min),
              budgetMax: firstValue(resolvedSearchParams.max),
              depositMonths: firstValue(resolvedSearchParams.caution),
              parking: firstValue(resolvedSearchParams.garage),
            }}
          />
        </Suspense>
      )

    case "property":
      return (
        <Suspense fallback={<PropertyDetailSkeleton />}>
          <PropertyDetail
            propertyNuo={route.propertyNuo}
            country={resolvedParams.country}
            transaction={resolvedParams.transaction}
            segments={resolvedParams.segments ?? []}
          />
        </Suspense>
      )

    default:
      notFound()
  }
}