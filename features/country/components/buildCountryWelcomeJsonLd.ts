import {
  countryWelcomePreposition,
  getCountryWelcomeSeoProfile,
} from "@/features/country/components/buildCountryWelcomeMetadata"
import type { CountryWelcomeMetadataInput } from "@/features/country/types"
import {
  IMMOASK_SITE_URL,
  immoAskOrganizationJsonLd,
  immoAskWebSiteJsonLd,
  toAbsoluteUrl,
} from "@/lib/seo/site"

export function buildCountryWelcomeJsonLd({
  countryCode,
  countryName,
  title,
  description,
}: CountryWelcomeMetadataInput & {
  title: string
  description: string
}) {
  const code = countryCode.toLowerCase()
  const path = `/${code}`
  const url = toAbsoluteUrl(path)
  const place = countryWelcomePreposition(countryName)
  const profile = getCountryWelcomeSeoProfile(code)
  const rentalsUrl = toAbsoluteUrl(`/${code}/locations-immobilieres`)
  const salesUrl = toAbsoluteUrl(`/${code}/ventes-immobilieres`)

  return {
    "@context": "https://schema.org",
    "@graph": [
      immoAskOrganizationJsonLd(),
      immoAskWebSiteJsonLd(),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        headline: `Chez vous, c'est ici — immobilier ${place}`,
        description,
        inLanguage: "fr",
        isAccessibleForFree: true,
        isPartOf: { "@id": `${IMMOASK_SITE_URL}/#website` },
        publisher: { "@id": `${IMMOASK_SITE_URL}/#organization` },
        about: {
          "@type": "Place",
          name: countryName,
          address: {
            "@type": "PostalAddress",
            addressCountry: profile.region || code.toUpperCase(),
          },
        },
        mentions: [
          {
            "@type": "Thing",
            name: "Logement urbain et rural",
            description: `Location de logements urbains et ruraux ${place}`,
          },
          {
            "@type": "Thing",
            name: "Terrains et immeubles",
            description: `Achat sécurisé de terrains, immeubles et biens immobiliers ${place}`,
          },
          { "@type": "Thing", name: "Foncier" },
          { "@type": "Thing", name: "BTP" },
          { "@type": "Thing", name: "Tourisme" },
        ],
        significantLink: [rentalsUrl, salesUrl],
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [
            "#country-welcome-title",
            "#country-welcome-description",
          ],
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: IMMOASK_SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: countryName,
              item: url,
            },
          ],
        },
        mainEntity: {
          "@type": "RealEstateAgent",
          "@id": `${IMMOASK_SITE_URL}/#organization`,
          name: "ImmoAsk",
          url: IMMOASK_SITE_URL,
          areaServed: {
            "@type": "Country",
            name: countryName,
          },
          knowsAbout: [
            "Immobilier",
            "Foncier",
            "BTP",
            "Tourisme",
            "Location immobilière",
            "Vente immobilière",
            "Gestion de patrimoine immobilier",
          ],
          makesOffer: [
            {
              "@type": "Offer",
              name: `Locations immobilières ${place}`,
              url: rentalsUrl,
              category: "Location",
            },
            {
              "@type": "Offer",
              name: `Ventes immobilières ${place}`,
              url: salesUrl,
              category: "Vente",
            },
          ],
        },
      },
    ],
  }
}
