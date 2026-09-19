import Link from "next/link"

import JsonLd from "@/components/seo/JsonLd"
import Container from "@/components/ui/Container"
import { buildLeftSideCatalogFiltering } from "@/features/catalog/components/buildLeftSideCatalogFiltering"
import { getLatestProperties } from "@/features/catalog/queries/getLatestProperties"
import SearchBar from "@/features/search_bar/components/SearchBar"
import { buildStatisticCards } from "@/features/statistic_card/components/buildStatisticCards"
import StatisticCard from "@/features/statistic_card/components/StatisticCard"
import {
  getWelcomeServices,
} from "@/features/country/welcomeData"
import type { CountryWelcomeProps } from "@/features/country/types"
import WelcomeAgentsMarquee from "@/features/realestate_agent_card/components/WelcomeAgentsMarquee"
import { pickRandomSuperCategorieTab } from "@/features/super_categorie_tabs/components/buildSuperCategorieTabs"
import { getCities } from "@/lib/api/locations"
import { propertyApi } from "@/lib/api/properties"
import { getCountryCallingCode } from "@/lib/routing/countries"

import { buildCountryWelcomeJsonLd } from "./buildCountryWelcomeJsonLd"
import {
  buildCountryWelcomeDescription,
  buildCountryWelcomeTitle,
  countryWelcomePreposition,
} from "./buildCountryWelcomeMetadata"
import WelcomeListings from "./WelcomeListings"
import WelcomeServices from "./WelcomeServices"

export default async function CountryWelcome({
  countryCode,
  countryName,
}: CountryWelcomeProps) {
  const initialTab = pickRandomSuperCategorieTab()
  const callingCode = getCountryCallingCode(countryCode)
  const [properties, propertyStatistics, cities] = await Promise.all([
    getLatestProperties({
      usage: initialTab.usage,
      limit: 9,
    }),
    propertyApi.getPropertyStatistics(),
    callingCode ? getCities(callingCode) : Promise.resolve([]),
  ])

  const statistics = buildStatisticCards({
    country: countryCode,
    statistics: propertyStatistics,
  })
  const filtering = buildLeftSideCatalogFiltering({
    country: countryCode,
    transaction: "locations-immobilieres",
    segments: [],
    properties,
    cities,
  })
  const services = getWelcomeServices(countryCode)
  const seoTitle = buildCountryWelcomeTitle(countryName)
  const seoDescription = buildCountryWelcomeDescription(countryName)
  const place = countryWelcomePreposition(countryName)

  return (
    <div>
      <JsonLd
        data={buildCountryWelcomeJsonLd({
          countryCode,
          countryName,
          title: seoTitle,
          description: seoDescription,
        })}
      />

      <section className="hero-wash">
        <Container className="flex flex-col items-center pt-4 pb-3 text-center sm:pt-6 sm:pb-4">
          <h1
            id="country-welcome-title"
            className="max-w-3xl text-3xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl"
          >
            Chez vous, c&apos;est ici
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Il existe, quelque part {place}, une adresse qui vous reconnaît déjà
            — celle où rentrer le soir n&apos;est plus un trajet, mais un
            soulagement.
          </p>

          <p
            id="country-welcome-description"
            className="mt-3 max-w-2xl text-sm leading-relaxed text-muted"
          >
            {seoDescription}
          </p>

          <SearchBar
            className="mt-8 text-left"
            action={`/${countryCode}/catalog`}
            country={countryCode}
            transaction="locations-immobilieres"
            filtering={filtering}
          />
        </Container>
      </section>

      <section className="bg-surface pt-2 pb-16 sm:pt-3 sm:pb-20">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-4 lg:gap-6">
            <aside className="order-2 flex flex-col gap-4 lg:order-1 lg:col-span-1">
              <h2 className="text-left text-lg font-bold tracking-tight text-navy lg:sr-only">
                Explorer par type
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {statistics.map((statistic) => (
                  <StatisticCard
                    key={statistic.id}
                    id={statistic.id}
                    href={statistic.href}
                    title={statistic.title}
                    total={statistic.total}
                    icon_illustration={statistic.icon_illustration}
                  />
                ))}
              </div>

              <div className="rounded-[22px] bg-navy px-5 py-6 text-left text-white">
                <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="size-4 text-primary"
                  >
                    <path
                      d="M12 3.5 19 6.5v5.2c0 4.6-3 7.6-7 8.8-4-1.2-7-4.2-7-8.8V6.5L12 3.5Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.8 12.1 11 14.3 15.3 10"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Réseau certifié
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  100% de nos agents immobiliers partenaires sont agréés et
                  formés aux normes légales.
                </p>
                <Link
                  href="/toc"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
                >
                  Découvrir la charte ImmoAsk
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>

            <div className="order-1 min-w-0 lg:order-2 lg:col-span-2">
              <WelcomeListings
                country={countryCode}
                initialTabId={initialTab.id}
                initialProperties={properties}
              />
            </div>

            <aside className="order-3 min-w-0 lg:col-span-1">
              <h2 className="mb-3 text-left text-lg font-bold tracking-tight text-navy lg:sr-only">
                Services
              </h2>
              <WelcomeServices services={services} />

              <div className="mt-3 rounded-[22px] bg-primary px-5 py-5 text-left text-white">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="size-5 shrink-0"
                  >
                    <path
                      d="M5.5 6.5h9A2.5 2.5 0 0 1 17 9v6.5A2.5 2.5 0 0 1 14.5 18H11l-3.8 2.6V18H5.5A2.5 2.5 0 0 1 3 15.5V9A2.5 2.5 0 0 1 5.5 6.5Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12h.1M11 12h.1M14 12h.1"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Besoin d&apos;un accompagnement ?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/90">
                  Vous avez un grand projet immobilier ? Notre équipe est à votre disposition pour vous accompagner sous 24h.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
                >
                  Nous contacter
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-white py-10 sm:py-12">
        <Container className="mb-6 text-center">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Réseau certifié
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy">
            Les 40 meilleurs agents immobiliers près de chez vous
          </h2>
        </Container>

        <WelcomeAgentsMarquee countryCode={countryCode} />
      </section>
    </div>
  )
}

export { CountryWelcome }
