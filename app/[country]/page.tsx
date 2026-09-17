import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"

import CountryWelcome from "@/features/country/components/CountryWelcome"
import CountryWelcomeSkeleton from "@/features/country/components/CountryWelcomeSkeleton"
import { buildCountryWelcomeMetadata } from "@/features/country/components/buildCountryWelcomeMetadata"
import { countries, getCountry } from "@/lib/routing/countries"

type CountryPageProps = {
  params: Promise<{ country: string }>
}

export function generateStaticParams() {
  return Object.keys(countries).map((country) => ({ country }))
}

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const { country: code } = await params
  const country = getCountry(code)

  if (!country) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return buildCountryWelcomeMetadata({
    countryCode: country.code,
    countryName: country.name,
  })
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: code } = await params
  const country = getCountry(code)

  if (!country) {
    notFound()
  }

  return (
    <Suspense fallback={<CountryWelcomeSkeleton />}>
      <CountryWelcome
        countryCode={country.code}
        countryName={country.name}
      />
    </Suspense>
  )
}

export { CountryPage }
