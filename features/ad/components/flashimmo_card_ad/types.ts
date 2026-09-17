export type FlashImmoCardAdFeatureIcon = "bolt" | "chart" | "bell"

export type FlashImmoCardAdFeature = {
  icon: FlashImmoCardAdFeatureIcon
  label: string
}

export type FlashImmoCardAdProps = {
  brandName?: string
  subscriberLabel?: string
  description?: string
  features?: FlashImmoCardAdFeature[]
  ctaLabel?: string
  ctaHref?: string
  footerLeft?: string
  footerRight?: string
  className?: string
}
