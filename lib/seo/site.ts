import type { Metadata } from "next"

export const IMMOASK_SITE_URL = "https://www.immoask.com"
export const IMMOASK_SITE_NAME = "ImmoAsk"
export const IMMOASK_COVER_IMAGE = "/images/immoask_logo.png"
export const IMMOASK_ICON = "/images/immoask_logo.png"
export const IMMOASK_FAVICON = "/favicon.ico"

export const IMMOASK_DEFAULT_OG_LOCALE = "fr_TG"
export const IMMOASK_FB_APP_ID = "2049277298731648"
export const IMMOASK_FB_PAGES = "431591890524770,322098734581229"
export const IMMOASK_TWITTER_HANDLE = "@immoask"

export const immoAskIcons = {
  icon: [
    { url: IMMOASK_FAVICON, sizes: "any" },
    { url: IMMOASK_ICON, type: "image/png", sizes: "472x183" },
  ],
  shortcut: IMMOASK_FAVICON,
  apple: IMMOASK_ICON,
} satisfies Metadata["icons"]

export function toAbsoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${IMMOASK_SITE_URL}${normalized}`
}

export function immoAskSocialOther(
  extra?: Record<string, string | number | (string | number)[]>,
) {
  return {
    ...extra,
  }
}

export function immoAskSocialOpenGraph(
  overrides: NonNullable<Metadata["openGraph"]> = {},
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: IMMOASK_SITE_NAME,
    locale: IMMOASK_DEFAULT_OG_LOCALE,
    ...overrides,
  }
}

export function immoAskSocialTwitter(
  overrides: NonNullable<Metadata["twitter"]> = {},
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    site: IMMOASK_TWITTER_HANDLE,
    creator: IMMOASK_TWITTER_HANDLE,
    ...overrides,
  }
}

export function immoAskOrganizationJsonLd() {
  return {
    "@type": "RealEstateAgent",
    "@id": `${IMMOASK_SITE_URL}/#organization`,
    name: IMMOASK_SITE_NAME,
    url: IMMOASK_SITE_URL,
    logo: toAbsoluteUrl(IMMOASK_ICON),
    areaServed: ["TG", "BJ","CI", "GN"],
  }
}

export function immoAskWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${IMMOASK_SITE_URL}/#website`,
    name: IMMOASK_SITE_NAME,
    url: IMMOASK_SITE_URL,
    inLanguage: "fr",
    publisher: { "@id": `${IMMOASK_SITE_URL}/#organization` },
  }
}
