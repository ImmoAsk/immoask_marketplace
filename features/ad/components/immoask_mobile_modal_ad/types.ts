export type ImmoAskMobileModalAdFeature = {
  title: string
  description: string
  tone: "blue" | "green" | "orange"
}

export type ImmoAskMobileModalAdStoreLink = {
  label: string
  href: string
}

export type ImmoAskMobileModalAdProps = {
  open: boolean
  onClose: () => void
  badgeLabel?: string
  title?: string
  description?: string
  features?: ImmoAskMobileModalAdFeature[]
  downloadLabel?: string
  downloadHref?: string
  appStore?: ImmoAskMobileModalAdStoreLink
  googlePlay?: ImmoAskMobileModalAdStoreLink
  freeLabel?: string
  securedLabel?: string
  illustrationSrc?: string
  illustrationAlt?: string
  closeLabel?: string
}
