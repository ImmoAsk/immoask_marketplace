export type ImmoAskMobileCardAdStoreLink = {
  label: string
  storeName: string
  href?: string
}

export type ImmoAskMobileCardAdProps = {
  appName?: string
  badgeLabel?: string
  ratingLabel?: string
  headline?: string
  description?: string
  googlePlay?: ImmoAskMobileCardAdStoreLink
  freeLabel?: string
  scanLabel?: string
  className?: string
}
