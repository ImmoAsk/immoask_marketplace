import Container from "@/components/ui/Container"
import Skeleton from "@/components/ui/Skeleton"

const FEATURE_PLACEHOLDERS = 6
const HIGHLIGHT_PLACEHOLDERS = 3
const DESCRIPTION_LINES = 4

export default function PropertyDetailSkeleton() {
  return (
    <main aria-busy="true" aria-live="polite">
      <span className="sr-only">Chargement de l&apos;annonce</span>
      <article>
        <section className="border-b border-border bg-white">
          <Container className="py-4 sm:py-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-10 w-40 rounded-full" />
                <Skeleton className="h-10 w-32 rounded-full" />
                <Skeleton className="h-10 w-28 rounded-full" />
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="pt-2 pb-4 sm:pb-5">
            <div className="grid gap-2.5 lg:h-[26rem] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:h-[30rem]">
              <Skeleton className="min-h-56 aspect-[4/3] w-full rounded-xl lg:aspect-auto lg:h-full lg:min-h-0" />
              <div className="grid grid-cols-2 gap-2.5 lg:h-full lg:grid-cols-1 lg:grid-rows-2">
                <Skeleton className="min-h-28 aspect-[4/3] w-full rounded-xl lg:aspect-auto lg:h-full lg:min-h-0" />
                <Skeleton className="min-h-28 aspect-[4/3] w-full rounded-xl lg:aspect-auto lg:h-full lg:min-h-0" />
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white pb-16">
          <Container className="grid items-start gap-6 md:grid-cols-[minmax(0,75%)_minmax(0,25%)]">
            <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
              <section className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="mt-4 h-8 w-full max-w-xl sm:h-9" />
                <Skeleton className="mt-3 h-4 w-64" />
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {Array.from({ length: HIGHLIGHT_PLACEHOLDERS }, (_, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-xl bg-surface px-3.5 py-3.5"
                    >
                      <Skeleton className="size-5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <Skeleton className="h-3.5 w-24" />
                        <Skeleton className="mt-1.5 h-3 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {Array.from({ length: FEATURE_PLACEHOLDERS }, (_, index) => (
                  <li
                    key={index}
                    className="flex min-h-[8.5rem] flex-col items-center justify-center gap-1.5 rounded-2xl bg-white px-3 py-5 shadow-card"
                  >
                    <Skeleton className="size-7" />
                    <Skeleton className="h-6 w-10" />
                    <Skeleton className="h-3 w-16" />
                  </li>
                ))}
              </ul>

              <section className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
                <Skeleton className="h-6 w-36" />
                <div className="mt-4 flex flex-col gap-3.5">
                  {Array.from({ length: DESCRIPTION_LINES }, (_, index) => (
                    <Skeleton
                      key={index}
                      className={index === DESCRIPTION_LINES - 1 ? "h-4 w-2/3" : "h-4 w-full"}
                    />
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
                <Skeleton className="h-6 w-40" />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </section>

              <section className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-4 h-52 w-full rounded-xl" />
              </section>
            </div>

            <aside className="flex h-fit min-w-0 flex-col gap-4 sm:gap-5 md:sticky md:top-4">
              <section className="flex flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-card sm:p-6">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="mt-2 h-9 w-40" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-3 h-12 w-full rounded-xl" />
                <Skeleton className="mt-5 h-6 w-56" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
                <Skeleton className="mt-5 h-11 w-full rounded-full" />
              </section>

              <Skeleton className="h-48 w-full rounded-[22px]" />

              <section className="rounded-2xl bg-surface p-5 shadow-card sm:p-6">
                <Skeleton className="h-3 w-48" />
                <div className="mt-4 flex items-center gap-3">
                  <Skeleton className="size-12 shrink-0 rounded-full" />
                  <div className="min-w-0 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="mt-1.5 h-3 w-40" />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
                <Skeleton className="h-6 w-36 rounded-full" />
                <Skeleton className="mt-4 h-6 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
                <Skeleton className="mt-5 h-11 w-full rounded-lg" />
              </section>
            </aside>
          </Container>
        </section>
      </article>
    </main>
  )
}

export { PropertyDetailSkeleton }
