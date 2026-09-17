import Container from "@/components/ui/Container"
import Skeleton from "@/components/ui/Skeleton"
import PropertyCardSkeleton from "@/features/catalog/components/PropertyCardSkeleton"

const STATISTIC_PLACEHOLDERS = 9
const LISTING_PLACEHOLDERS = 9
const SERVICE_PLACEHOLDERS = 7
const TAB_PLACEHOLDERS = 4
const AGENT_PLACEHOLDERS = 4

export default function CountryWelcomeSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Chargement de la page d&apos;accueil</span>

      <section className="hero-wash">
        <Container className="flex flex-col items-center pt-4 pb-3 text-center sm:pt-6 sm:pb-4">
          <Skeleton className="h-9 w-64 sm:h-12 sm:w-96 lg:h-14 lg:w-[28rem]" />
          <Skeleton className="mt-5 h-4 w-full max-w-md sm:h-5" />
          <Skeleton className="mt-2 h-4 w-3/4 max-w-sm sm:h-5" />

          <div className="mt-8 flex w-full flex-col gap-3 rounded-[28px] border border-primary/10 bg-hero-search p-3 md:w-1/2 sm:flex-row sm:items-center sm:rounded-full sm:py-2 sm:pl-5 sm:pr-2">
            <Skeleton className="h-11 w-full rounded-full sm:h-10" />
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
              <Skeleton className="h-11 flex-1 rounded-full sm:h-10 sm:w-36 sm:flex-none" />
              <Skeleton className="h-11 flex-1 rounded-full sm:h-10 sm:w-24 sm:flex-none" />
              <Skeleton className="h-11 flex-1 rounded-full sm:h-11 sm:w-32 sm:flex-none" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface pt-2 pb-16 sm:pt-3 sm:pb-20">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-4 lg:gap-6">
            <aside className="order-2 flex flex-col gap-4 lg:order-1 lg:col-span-1">
              <Skeleton className="h-6 w-36 lg:hidden" />
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: STATISTIC_PLACEHOLDERS }, (_, index) => (
                  <div
                    key={index}
                    className="flex min-h-[5.25rem] flex-col items-center justify-center rounded-2xl bg-white px-1.5 py-2.5 shadow-[0_8px_28px_rgb(11_31_58_/_0.08)]"
                  >
                    <Skeleton className="size-9 rounded-xl" />
                    <Skeleton className="mt-2 h-2.5 w-12" />
                  </div>
                ))}
              </div>

              <div className="rounded-[22px] bg-navy px-5 py-6">
                <Skeleton className="h-4 w-32 bg-white/15" />
                <Skeleton className="mt-3 h-3 w-full bg-white/15" />
                <Skeleton className="mt-2 h-3 w-5/6 bg-white/15" />
                <Skeleton className="mt-4 h-4 w-48 bg-white/15" />
              </div>
            </aside>

            <div className="order-1 min-w-0 lg:order-2 lg:col-span-2">
              <div className="flex min-w-0 flex-col gap-5">
                <div className="grid grid-cols-2 gap-1.5 rounded-[22px] bg-white/70 p-1.5 sm:flex sm:gap-1 sm:rounded-full">
                  {Array.from({ length: TAB_PLACEHOLDERS }, (_, index) => (
                    <Skeleton
                      key={index}
                      className="h-10 w-full rounded-full sm:h-9 sm:w-28"
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: LISTING_PLACEHOLDERS }, (_, index) => (
                    <PropertyCardSkeleton key={index} />
                  ))}
                </div>

                <Skeleton className="h-11 w-full rounded-lg sm:h-12" />
              </div>
            </div>

            <aside className="order-3 min-w-0 lg:col-span-1">
              <Skeleton className="mb-3 h-6 w-24 lg:hidden" />
              <div className="flex flex-col gap-3">
                {Array.from({ length: SERVICE_PLACEHOLDERS }, (_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-[22px] bg-white px-4 py-3.5 shadow-[0_8px_28px_rgb(11_31_58_/_0.08)]"
                  >
                    <Skeleton className="size-12 shrink-0 rounded-2xl" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="mt-1.5 h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-[22px] bg-primary px-5 py-5">
                <Skeleton className="h-4 w-48 bg-white/25" />
                <Skeleton className="mt-2 h-3 w-full bg-white/25" />
                <Skeleton className="mt-2 h-3 w-4/5 bg-white/25" />
                <Skeleton className="mt-4 h-11 w-full rounded-xl bg-white/90" />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-white py-10 sm:py-12">
        <Container className="mb-6 flex flex-col items-center">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-2 h-7 w-72 sm:w-80" />
        </Container>

        <div className="overflow-hidden px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex w-max gap-4">
            {Array.from({ length: AGENT_PLACEHOLDERS }, (_, index) => (
              <div
                key={index}
                className="flex w-64 shrink-0 items-center gap-3 rounded-[22px] bg-surface px-4 py-3.5"
              >
                <Skeleton className="size-12 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="mt-1.5 h-3 w-24" />
                  <Skeleton className="mt-1.5 h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export { CountryWelcomeSkeleton }
