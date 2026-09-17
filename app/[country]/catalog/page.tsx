import { Suspense } from "react"
import { notFound } from "next/navigation"

import CatalogPage from "@/features/catalog/components/CatalogPage"
import CatalogPageSkeleton from "@/features/catalog/components/CatalogPageSkeleton"
import { getCountry } from "@/lib/routing/countries"

import {
  parseCatalogId,
  toCatalogIdFilters,
  type CatalogRoutePageProps,
} from "./types"

export default async function Page({
  params,
  searchParams,
}: CatalogRoutePageProps) {
  const { country } = await params
  const query = await searchParams
  const resolvedCountry = getCountry(country)

  if (!resolvedCountry) {
    notFound()
  }

  return (
    <Suspense fallback={<CatalogPageSkeleton />}>
      <CatalogPage
        country={resolvedCountry.code}
        page={parseCatalogId(query.page) ?? 1}
        idFilters={toCatalogIdFilters(query)}
        basePath={`/${resolvedCountry.code}/catalog`}
      />
    </Suspense>
  )
}
