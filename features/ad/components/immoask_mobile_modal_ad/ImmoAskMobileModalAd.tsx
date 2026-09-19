"use client"

import Image from "next/image"
import Link from "next/link"

import Modal from "@/components/ui/Modal"
import { MOBILE_APP_LINK } from "@/lib/routing/auth"
import { cn } from "@/lib/cn"

import type {
  ImmoAskMobileModalAdFeature,
  ImmoAskMobileModalAdProps,
} from "./types"

const DEFAULT_FEATURES: ImmoAskMobileModalAdFeature[] = [
  {
    title: "Gérer un bien immobilier",
    description:
      "Suivi en direct des loyers, états des lieux & quittances certifiées.",
    tone: "blue",
  },
  {
    title: "Payer un loyer",
    description:
      "Paiement instantané via T-Money (Mixx by Yas) & Flooz avec reçu officiel.",
    tone: "green",
  },
  {
    title: "Créer un contrat de gestion",
    description:
      "Génération automatique de baux certifiés conforme au droit togolais.",
    tone: "orange",
  },
]

const FEATURE_TONES = {
  blue: "bg-[#e8f4fc] text-[#0b7eb8]",
  green: "bg-[#e8f8ef] text-[#1f9d57]",
  orange: "bg-[#fff1e6] text-[#e67a22]",
} as const

function PhoneBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-3.5">
      <rect
        x="8"
        y="3.5"
        width="8"
        height="17"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M11 17.5h2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d="M12 4v10.5M8.5 11.5 12 15l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 18.5h13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M16.7 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3.1-1.6-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.8 2.1 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-1 2.7-2 .8-1.2 1.2-2.3 1.2-2.4-.1 0-2.3-.9-2.3-3.8ZM14.5 6.3c.6-.8 1.1-1.8.9-2.9-0.9.1-2 .6-2.7 1.4-.6.7-1.1 1.7-.9 2.7 1 .1 2-.5 2.7-1.2Z" />
    </svg>
  )
}

function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
      <path
        d="M5 4.8 14.8 12 5 19.2V4.8Z"
        fill="#34A853"
      />
      <path d="M5 4.8 12.2 9.9 8.4 12 5 4.8Z" fill="#EA4335" />
      <path d="M5 19.2 8.4 12l3.8 2.1L5 19.2Z" fill="#FBBC04" />
      <path d="M14.8 12 12.2 9.9 8.4 12l3.8 2.1L14.8 12Z" fill="#4285F4" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d="M4.5 8.5V18a1.5 1.5 0 0 0 1.5 1.5h12A1.5 1.5 0 0 0 19.5 18V9.5A1.5 1.5 0 0 0 18 8H11L9.2 6.2A1.5 1.5 0 0 0 8.1 5.8H6A1.5 1.5 0 0 0 4.5 7.3v1.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <rect
        x="3.5"
        y="6.5"
        width="17"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.5 10h17M15.5 13.5h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ContractIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d="M7 4.5h7.5L18 8.5V19.5H7V4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 4.5V8.5H18M9.5 12h5M9.5 15.5h3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d="M12 3.5 19 6.5v5.2c0 4.6-3 7.6-7 8.8-4-1.2-7-4.2-7-8.8V6.5L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 12.1 11 14.3 15.3 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
      <circle cx="9" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M11.5 12.5 18 19M15.2 15.8l2.2-.8M16.8 17.4l2.2-.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FeatureIcon({ tone }: { tone: ImmoAskMobileModalAdFeature["tone"] }) {
  if (tone === "green") {
    return <WalletIcon />
  }

  if (tone === "orange") {
    return <ContractIcon />
  }

  return <FolderIcon />
}

export default function ImmoAskMobileModalAd({
  open,
  onClose,
  badgeLabel = "Expérience mobile dédiée",
  title = "Disponible exclusivement sur mobile",
  description = "Pour garantir une sécurité maximale et la signature biométrique des actes, ces services sont accessibles directement dans votre application ImmoAsk :",
  features = DEFAULT_FEATURES,
  downloadLabel = "Télécharger l'appli mobile",
  downloadHref = MOBILE_APP_LINK,
  appStore = {
    label: "App Store",
    href: MOBILE_APP_LINK,
  },
  googlePlay = {
    label: "Google Play",
    href: MOBILE_APP_LINK,
  },
  freeLabel = "Gratuit",
  securedLabel = "100% Sécurisé",
  illustrationSrc = "/images/ads/immoask-mobile-home.png",
  illustrationAlt = "Écran d'accueil de l'application ImmoAsk",
  closeLabel = "Fermer la promotion de l'application mobile",
}: ImmoAskMobileModalAdProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="xl"
      closeLabel={closeLabel}
      className={cn(
        "relative max-h-[90vh] overflow-y-auto !rounded-[24px] !border-0 !p-4 shadow-[0_24px_80px_rgb(11_31_58_/_0.28)] sm:!p-6",
        "before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1.5 before:bg-gradient-to-r before:from-[#2dd4bf] before:via-primary before:to-[#a3e635]",
      )}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-[11px] font-bold tracking-[0.08em] text-primary uppercase">
          <PhoneBadgeIcon />
          {badgeLabel}
        </p>

        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
          <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-none">
            <div
              className={cn(
                "relative overflow-hidden rounded-[28px] border border-[#d9ebf5]",
                "bg-[radial-gradient(circle_at_50%_20%,#dff3fb_0%,#f4fafd_45%,#ffffff_100%)]",
                "px-5 pb-6 pt-8 shadow-[0_18px_50px_rgb(11_31_58_/_0.1)] sm:px-7 sm:pb-8 sm:pt-10",
              )}
            >
              <span className="absolute top-5 left-5 flex size-10 items-center justify-center rounded-2xl bg-white text-primary shadow-[0_8px_20px_rgb(11_31_58_/_0.1)]">
                <ShieldIcon />
              </span>
              <span className="absolute top-16 right-4 flex size-9 items-center justify-center rounded-xl bg-white text-primary shadow-[0_8px_20px_rgb(11_31_58_/_0.1)] sm:right-6">
                <PhoneBadgeIcon />
              </span>
              <span className="absolute bottom-20 left-4 flex size-9 items-center justify-center rounded-xl bg-white text-primary shadow-[0_8px_20px_rgb(11_31_58_/_0.1)] sm:bottom-24 sm:left-5">
                <KeyIcon />
              </span>

              <div className="relative mx-auto w-[min(100%,14.5rem)] sm:w-[15.5rem]">
                <div className="overflow-hidden rounded-[1.75rem] border-[5px] border-[#0f1f33] bg-[#0f1f33] shadow-[0_24px_48px_rgb(11_31_58_/_0.28)]">
                  <div className="mx-auto mt-2 mb-1 h-1 w-16 rounded-full bg-white/25" />
                  <Image
                    src={illustrationSrc}
                    alt={illustrationAlt}
                    width={390}
                    height={780}
                    className="h-auto w-full bg-white"
                    priority={open}
                  />
                </div>
              </div>

              <span className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-[0_8px_20px_rgb(11_31_58_/_0.12)] sm:right-5 sm:bottom-5">
                <span
                  className="size-2 rounded-full bg-success"
                  aria-hidden="true"
                />
                {securedLabel}
              </span>
            </div>
          </div>

          <div className="min-w-0 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-[2rem] lg:leading-tight">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
              {description}
            </p>

            <ul className="mt-5 divide-y divide-[#e6eef5] overflow-hidden rounded-2xl bg-[#f4f7fb]">
              {features.map((feature) => (
                <li
                  key={feature.title}
                  className="flex items-start gap-3 px-3.5 py-3.5"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl",
                      FEATURE_TONES[feature.tone],
                    )}
                  >
                    <FeatureIcon tone={feature.tone} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-navy">
                      {feature.title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted sm:text-sm">
                      {feature.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={downloadHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white",
                "shadow-[0_10px_24px_rgb(0_150_214_/_0.28)] transition-colors hover:bg-primary-hover",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
            >
              <DownloadIcon />
              {downloadLabel}
            </Link>

            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <Link
                href={appStore.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-white px-3.5 text-sm font-semibold text-navy",
                  "transition-colors hover:bg-surface",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                )}
              >
                <AppleIcon />
                {appStore.label}
              </Link>
              <Link
                href={googlePlay.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-white px-3.5 text-sm font-semibold text-navy",
                  "transition-colors hover:bg-surface",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                )}
              >
                <PlayStoreIcon />
                {googlePlay.label}
              </Link>
              <span className="text-sm font-medium text-muted">{freeLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export { ImmoAskMobileModalAd }
