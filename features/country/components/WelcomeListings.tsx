"use client"

import { useRef, useState } from "react"

import CatalogMoreButton from "@/features/catalog/components/CatalogMoreButton"
import { buildCatalogMoreButton } from "@/features/catalog/components/buildCatalogMoreButton"
import PropertyCard from "@/features/catalog/components/PropertyCard"
import PropertyCardSkeleton from "@/features/catalog/components/PropertyCardSkeleton"
import { getLatestProperties } from "@/features/catalog/queries/getLatestProperties"
import type { Property } from "@/features/catalog/types"
import SuperCategorieTabs from "@/features/super_categorie_tabs/components/SuperCategorieTabs"
import {
  getSuperCategorieTab,
} from "@/features/super_categorie_tabs/components/buildSuperCategorieTabs"
import { createPropertyLink } from "@/lib/utils/createPropertyLink"

type WelcomeListingsProps = {
  country: string
  initialTabId: string
  initialProperties: Property[]
}

export default function WelcomeListings({
  country,
  initialTabId,
  initialProperties,
}: WelcomeListingsProps) {
  const [tabId, setTabId] = useState(initialTabId)
  const [properties, setProperties] = useState(initialProperties)
  const [loading, setLoading] = useState(false)
  const requestId = useRef(0)
  const tab = getSuperCategorieTab(tabId)
  const moreButton = buildCatalogMoreButton({
    country,
    usage: tab.usage,
    label: tab.moreLabel,
  })

  async function handleTabChange(id: string) {
    if (id === tabId) {
      return
    }

    const nextTab = getSuperCategorieTab(id)
    const currentRequest = ++requestId.current

    setTabId(id)
    setLoading(true)

    try {
      const items = await getLatestProperties({
        usage: nextTab.usage,
        limit: 9,
      })

      if (currentRequest === requestId.current) {
        setProperties(items)
      }
    } catch {
      if (currentRequest === requestId.current) {
        setProperties([])
      }
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false)
      }
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <SuperCategorieTabs value={tabId} onChange={handleTabChange} />

      {loading ? (
        <div
          aria-busy="true"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {Array.from({ length: 9 }, (_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              href={createPropertyLink({
                country: property.country || country,
                offreId: property.offreId,
                offreName: property.offreName,
                category: property.categorySlug,
                city: property.citySlug,
                district: property.districtSlug,
                nuo: property.nuo,
              })}
              property={property}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-[22px] bg-white px-5 py-10 text-center text-sm text-muted shadow-[0_8px_28px_rgb(11_31_58_/_0.08)]">
          Aucun bien immobilier trouvé.
        </p>
      )}

      <CatalogMoreButton {...moreButton} />
    </div>
  )
}
