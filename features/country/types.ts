export type CountryWelcomeProps = {
  countryCode: string
  countryName: string
}

export type CountryWelcomeSeoProfile = {
  locale: string
  region: string
  cities: readonly string[]
  extraKeywords: readonly string[]
}

export type CountryWelcomeMetadataInput = {
  countryCode: string
  countryName: string
}
