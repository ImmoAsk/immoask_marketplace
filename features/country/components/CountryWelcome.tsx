import Link from "next/link"

import JsonLd from "@/components/seo/JsonLd"
import Container from "@/components/ui/Container"
import { buildLeftSideCatalogFiltering } from "@/features/catalog/components/buildLeftSideCatalogFiltering"
import { getLatestProperties } from "@/features/catalog/queries/getLatestProperties"
import SearchBar from "@/features/search_bar/components/SearchBar"
import { buildStatisticCards } from "@/features/statistic_card/components/buildStatisticCards"
import StatisticCard from "@/features/statistic_card/components/StatisticCard"
import {
  getWelcomeSearchSuggestions,
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
import PlaceToVisit from "./PlaceToVisit"
import WelcomeKPI from "./WelcomeKPI"
import WelcomeListings from "./WelcomeListings"
import WelcomeServices from "./WelcomeServices"

function OwnersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4.8 16.5c.7-2 2.3-3 4.2-3s3.5 1 4.2 3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="16.2" cy="8.4" r="1.8" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M15.2 13.6c1.5.2 2.7 1 3.4 2.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function AgentsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
  )
}

function SeekersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M15.8 15.8 20 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PropertiesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 10.5 12 4.5l7.5 6V19a1.5 1.5 0 0 1-1.5 1.5h-4.2v-5.2H10.2V20.5H6A1.5 1.5 0 0 1 4.5 19v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const WELCOME_KPIS = [
  { icon: <OwnersIcon />, title: "Propriétaires", number: "120+" },
  { icon: <AgentsIcon />, title: "Agents immobiliers", number: "200+" },
  { icon: <SeekersIcon />, title: "Locataires et acquéreurs", number: "2 500+" },
  { icon: <PropertiesIcon />, title: "Biens immobiliers", number: "3 000+" },
]

export default async function CountryWelcome({
  countryCode,
  countryName,
}: CountryWelcomeProps) {
  const initialTab = pickRandomSuperCategorieTab()
  const callingCode = getCountryCallingCode(countryCode)
  const paysId = callingCode
  const [properties, propertyStatistics, cities] = await Promise.all([
    paysId != null
      ? getLatestProperties({
          paysId,
          usage: initialTab.usage,
          limit: 9,
        })
      : Promise.resolve([]),
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
  const searchSuggestions = getWelcomeSearchSuggestions(countryCode)
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
        <Container className="flex flex-col items-center gap-6 pt-3 pb-4 text-center sm:pt-4 lg:flex-row lg:items-center lg:gap-8 lg:pb-5 lg:text-left">
          <div className="flex min-w-0 flex-1 flex-col items-center lg:items-start">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
              PropTech N°1 au {countryName} et dans la sous-région
            </p>

            <h1
              id="country-welcome-title"
              className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl"
            >
              Chez vous, c&apos;est ici
            </h1>

            <p className="mt-3 max-w-xl text-sm font-semibold leading-snug text-primary sm:text-base">
              Il existe, quelque part {place}, une adresse qui vous reconnaît déjà
              — celle où rentrer le soir n&apos;est plus un trajet, mais un
              soulagement.
            </p>

            <p
              id="country-welcome-description"
              className="mt-2 max-w-2xl text-sm leading-snug text-navy/75"
            >
              {seoDescription}
            </p>

            <SearchBar
              className="mt-4 text-left"
              action={`/${countryCode}/catalog`}
              country={countryCode}
              transaction="locations-immobilieres"
              filtering={filtering}
            />

            <div className="mt-3 flex w-full flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-navy/70">Suggestions :</span>
              {searchSuggestions.map((suggestion) => (
                <Link
                  key={suggestion}
                  href={`/${countryCode}/catalog?q=${encodeURIComponent(suggestion)}`}
                  className="rounded-full border border-border bg-white px-3 py-1 text-sm font-medium text-navy transition-colors hover:border-primary/40 hover:bg-primary-soft"
                >
                  {suggestion}
                </Link>
              ))}
            </div>

            <WelcomeKPI items={WELCOME_KPIS} className="mt-4" />
          </div>

          <PlaceToVisit
            countryCode={countryCode}
            className="w-full max-w-lg shrink-0 lg:w-[min(100%,34rem)]"
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
                paysId={paysId}
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
        <Container>
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              Réseau certifié
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy">
              Les 40 meilleurs agents immobiliers près de chez vous
            </h2>
          </div>

          <WelcomeAgentsMarquee countryCode={countryCode} />
        </Container>
      </section>
    </div>
  )
}

export { CountryWelcome }
