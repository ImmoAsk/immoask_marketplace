export type ListingTextPart = {
  text: string
  emphasis?: boolean
}

export type ListingRichText = string | ListingTextPart[]

export type ListingFeature = {
  title: string
  description: string
}

export const LISTING_ILLUSTRATION_IDS = [
  "hero",
  "types-de-biens",
  "communaute",
  "confiance",
  "controle",
  "localisation",
  "doodoo",
  "pourquoi",
  "appel-final",
] as const

export type ListingIllustrationId = (typeof LISTING_ILLUSTRATION_IDS)[number]

export type ListingIllustration = {
  id: ListingIllustrationId
  alt: string
}

export type ListingSection = {
  id: string
  title: string
  illustration: ListingIllustration
  paragraphs?: ListingRichText[]
  items?: string[]
  features?: ListingFeature[]
  note?: string
  closingParagraphs?: ListingRichText[]
}

export type ListingCta = {
  label: string
  href: string
}

export type ListingPageContent = {
  h1: string
  introTitle: string
  introParagraphs: ListingRichText[]
  heroIllustration: ListingIllustration
  sections: ListingSection[]
  cta: ListingCta
}

export type ListingPageProps = {
  content?: ListingPageContent
  className?: string
}
