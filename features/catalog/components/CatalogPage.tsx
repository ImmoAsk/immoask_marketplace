import JsonLd from "@/components/seo/JsonLd"
import Container from "@/components/ui/Container"
import { getFilteringProperties } from "@/features/catalog/queries/getProperties"
import type { CatalogPageProps } from "@/features/catalog/types"
import { getCities, getDistricts } from "@/lib/api/locations"
import { getCountryCallingCode } from "@/lib/routing/countries"
import { createPropertyLink, slugify } from "@/lib/utils/createPropertyLink"

import { buildCatalogFilteringInquiry } from "./buildCatalogFilteringInquiry"
import { buildCatalogHeader } from "./buildCatalogHeader"
import { buildCatalogJsonLd } from "./buildCatalogJsonLd"
import { buildCatalogCanonicalPath, buildCatalogDescription } from "./buildCatalogMetadata"
import { buildCatalogMapView } from "./buildCatalogMapView"
import {
  buildCatalogPagination,
  paginateItems,
  toIdFilterSearchParams,
} from "./buildCatalogPagination"
import {
  buildLeftSideCatalogFiltering,
  hasCatalogFilterQuery,
  toCatalogFilterSearchParams,
} from "./buildLeftSideCatalogFiltering"
import CatalogFilteringInquiry from "./CatalogFilteringInquiry"
import CatalogHeader from "./CatalogHeader"
import CatalogMapView from "./CatalogMapView"
import CatalogPagination from "./CatalogPagination"
import LeftSideCatalogFiltering from "./LeftSideCatalogFiltering"
import PropertyCard from "./PropertyCard"

export default async function CatalogPage({
  country,
  transaction,
  segments = [],
  page = 1,
  filterQuery,
  idFilters,
  basePath,
}: CatalogPageProps) {
  const extraFilters = hasCatalogFilterQuery(filterQuery)
  const callingCode = getCountryCallingCode(country)
  const citySlug = slugify(segments[1] ?? "")

  const propertiesPromise = idFilters
    ? getFilteringProperties({
        country,
        transaction,
        segments,
        idFilters,
      }).then((items) => [items, items] as const)
    : extraFilters
      ? Promise.all([
          getFilteringProperties({
            country,
            transaction,
            segments,
          }),
          getFilteringProperties({
            country,
            transaction,
            segments,
            filterQuery,
          }),
        ])
      : getFilteringProperties({
          country,
          transaction,
          segments,
        }).then((items) => [items, items] as const)

  const [propertyLists, cities] = await Promise.all([
    propertiesPromise,
    callingCode ? getCities(callingCode) : Promise.resolve([]),
  ])
  const [optionProperties, properties] = propertyLists
  const selectedCity = cities.find((city) =>
    idFilters?.ville
      ? String(city.id) === String(idFilters.ville)
      : slugify(city.denomination ?? city.code ?? "") === citySlug,
  )
  const districts = selectedCity ? await getDistricts(selectedCity.id) : []

  const header = buildCatalogHeader({
    country,
    transaction,
    segments,
    propertyCount: properties.length,
  })
  const inquiry = buildCatalogFilteringInquiry({
    country,
    transaction,
    segments,
    resultCount: properties.length,
  })
  const leftSideFiltering = buildLeftSideCatalogFiltering({
    country,
    transaction,
    segments,
    properties: optionProperties,
    cities,
    districts,
    query: filterQuery,
  })
  const mapView = buildCatalogMapView({ country })
  const paginationSearchParams = toCatalogFilterSearchParams(filterQuery)
  toIdFilterSearchParams(idFilters).forEach((value, key) => {
    paginationSearchParams.set(key, value)
  })
  const pagination = buildCatalogPagination({
    country,
    transaction,
    segments,
    totalItems: properties.length,
    currentPage: page,
    searchParams: paginationSearchParams,
    basePath,
  })
  const pagedProperties = paginateItems(properties, page)
  const catalogTitle = header.title ?? "Catalogue immobilier"
  const catalogDescription = buildCatalogDescription(catalogTitle)
  const catalogPath = buildCatalogCanonicalPath({
    country,
    transaction,
    segments,
  })

  return (
    <main>
      <JsonLd
        data={buildCatalogJsonLd({
          title: catalogTitle,
          description: catalogDescription,
          path: catalogPath,
          country,
          transaction,
          breadcrumbs: header.items,
          properties: pagedProperties,
        })}
      />
      <section className="bg-surface pb-16">
        <Container className="py-8 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <LeftSideCatalogFiltering
              className="w-full shrink-0 lg:sticky lg:top-24 lg:w-80"
              {...leftSideFiltering}
            />

            <div className="min-w-0 flex-1">
              <CatalogHeader {...header} />
              <CatalogFilteringInquiry
                className="mt-6"
                mapView={<CatalogMapView {...mapView} />}
                {...inquiry}
              >
                {pagedProperties.length > 0 ? (
                  <>
                    <div
                      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                      role="list"
                    >
                      {pagedProperties.map((property) => (
                        <div key={property.id} role="listitem">
                          <PropertyCard
                            href={createPropertyLink({
                              country: property.country || country,
                              transaction,
                              offreId: property.offreId,
                              offreName: property.offreName,
                              category: property.categorySlug,
                              city: property.citySlug,
                              district: property.districtSlug,
                              nuo: property.nuo,
                            })}
                            property={property}
                          />
                        </div>
                      ))}
                    </div>

                    {pagination ? (
                      <CatalogPagination className="mt-8" {...pagination} />
                    ) : null}
                  </>
                ) : (
                  <p className="rounded-xl border border-border bg-white px-6 py-12 text-center text-muted shadow-card">
                    Aucun bien immobilier trouvé.
                  </p>
                )}
              </CatalogFilteringInquiry>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
