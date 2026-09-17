import Container from "@/components/ui/Container"
import Skeleton from "@/components/ui/Skeleton"
import PropertyCardSkeleton from "@/features/catalog/components/PropertyCardSkeleton"

import { CATALOG_PAGE_SIZE } from "./buildCatalogPagination"

const FILTER_SECTIONS = 6

export default function CatalogPageSkeleton() {
  return (
    <main aria-busy="true" aria-live="polite">
      <span className="sr-only">Chargement du catalogue</span>
      <section className="bg-surface pb-16">
        <Container className="py-8 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <aside className="w-full shrink-0 rounded-2xl border border-border bg-white p-5 shadow-card lg:sticky lg:top-24 lg:w-80">
              {Array.from({ length: FILTER_SECTIONS }, (_, index) => (
                <section key={index} className={index === 0 ? undefined : "mt-6"}>
                  <Skeleton className="h-5 w-32" />
                  {index === 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Skeleton className="h-9 w-20 rounded-full" />
                      <Skeleton className="h-9 w-24 rounded-full" />
                      <Skeleton className="h-9 w-20 rounded-full" />
                    </div>
                  ) : index === 3 ? (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : (
                    <Skeleton className="mt-3 h-10 w-full" />
                  )}
                </section>
              ))}
              <Skeleton className="mt-6 h-10 w-28" />
            </aside>

            <div className="min-w-0 flex-1">
              <header className="flex flex-col gap-4 sm:gap-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-7 w-28 rounded-full" />
                </div>
                <Skeleton className="h-8 w-full max-w-xl sm:h-9" />
                <Skeleton className="h-4 w-full max-w-3xl" />
                <Skeleton className="h-4 w-2/3 max-w-xl" />
              </header>

              <div className="mt-6 flex flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <Skeleton className="h-6 w-64 sm:h-7 sm:w-80" />
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <Skeleton className="h-9 w-40 rounded-full" />
                    <Skeleton className="h-9 w-24 rounded-xl" />
                    <Skeleton className="h-9 w-28 rounded-xl" />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: CATALOG_PAGE_SIZE }, (_, index) => (
                    <PropertyCardSkeleton key={index} />
                  ))}
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-white px-5 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <Skeleton className="h-4 w-56" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-24 rounded-full" />
                    <Skeleton className="size-9 rounded-full" />
                    <Skeleton className="size-9 rounded-full" />
                    <Skeleton className="h-9 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

export { CatalogPageSkeleton }
