import type { ReactNode } from "react"

import type { RealEstateAgentCardProps } from "@/features/realestate_agent_card/types"

export type WelcomeService = {
  title: string
  subtitle: string
  href?: string
  opensMobileAppAd?: boolean
  icon: ReactNode
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 10h16M8 3.5v4M16 3.5v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function ShieldCheckIcon() {
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

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 20V7.5L12 4l7 3.5V20" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 10h.1M12 10h.1M15.5 10h.1M8.5 13.5h.1M15.5 13.5h.1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4.5h7.5L18 8.5V19.5H7V4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14.5 4.5V8.5H18M9.5 12h5M9.5 15.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 12V5.5A6.5 6.5 0 0 1 18.2 15.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

export function getWelcomeServices(countryCode: string): WelcomeService[] {
  return [
    {
      title: "Trouver un logement",
      subtitle: "Exprimez vos critères sur ImmoAsk",
      href: `/${countryCode}/catalog?usage=1`,
      icon: <SearchIcon />,
    },
    {
      title: "Réserver un séjour meublé",
      subtitle: "Court séjour tout équipé",
      href: `/${countryCode}/catalog?usage=5`,
      icon: <CalendarIcon />,
    },
    {
      title: "Acheter terrain ou villa",
      subtitle: "Titres fonciers vérifiés",
      href: `/${countryCode}/catalog?usage=7`,
      icon: <ShieldCheckIcon />,
    },
    {
      title: "Louer un bureau ou magasin",
      subtitle: "Emplacements stratégiques",
      href: `/${countryCode}/catalog?usage=3`,
      icon: <BuildingIcon />,
    },
    {
      title: "Créer un contrat de gestion",
      subtitle: "Sécurisez vos revenus locatifs",
      opensMobileAppAd: true,
      icon: <DocumentIcon />,
    },
    {
      title: "Payer un loyer",
      subtitle: "Paiement mobile Mixx & Flooz",
      opensMobileAppAd: true,
      icon: <CardIcon />,
    },
    {
      title: "Gérer un bien immobilier",
      subtitle: "Espace propriétaire et syndic",
      opensMobileAppAd: true,
      icon: <ChartIcon />,
    },
  ]
}

export function getWelcomeAgents(
  countryCode: string,
  countryName: string,
): RealEstateAgentCardProps[] {
  const locations =
    countryCode === "tg"
      ? [
          "Lomé Centre & Cité OUA",
          "Adidogomé & Vakpossito",
          "Agoè, Cacaveli & Totsi",
          "Baguida Plage & Avépozo",
        ]
      : [countryName]

  return locations.map((location) => ({
    name: "Agent certifié ImmoAsk",
    role: "Conseiller immobilier",
    location,
    href: "/securite-et-titres-fonciers",
  }))
}
