"use client"

import { usePathname } from "next/navigation"

import CatalogPageSkeleton from "@/features/catalog/components/CatalogPageSkeleton"
import PropertyDetailSkeleton from "@/features/properties/components/PropertyDetailSkeleton"
import { isPropertyNuoSegment } from "@/lib/routing/routes"

export default function Loading() {
  const pathname = usePathname()
  const lastSegment = pathname.split("/").filter(Boolean).at(-1)

  if (isPropertyNuoSegment(lastSegment)) {
    return <PropertyDetailSkeleton />
  }

  return <CatalogPageSkeleton />
}
