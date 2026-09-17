import type { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/cn"

import type {
  ImmoAskMobileCardAdProps,
  ImmoAskMobileCardAdStoreLink,
} from "./types"

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-6", className)}
    >
      <rect
        x="7.5"
        y="3.5"
        width="9"
        height="17"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M11 18.2h2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-3.5 shrink-0 text-white"
    >
      <path
        d="M12 4.5 14.2 9l4.8.6-3.5 3.3.9 4.8L12 15.6 7.6 17.7l.9-4.8L5 9.6 9.8 9 12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CircleCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8.8 12.1 11.1 14.4 15.4 9.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function QrIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <rect x="4" y="4" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M14 14h2.2v2.2H14V14Zm3.3 0H20v2.2h-2.7V14Zm-3.3 3.3H16V20h-2v-2.7Zm3.3 1.1H20V20h-2.7v-1.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-6 shrink-0 text-[#34d399]"
    >
      <path
        d="M8 5.8 18.2 12 8 18.2V5.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StoreButton({
  store,
  icon,
}: {
  store: ImmoAskMobileCardAdStoreLink
  icon: ReactNode
}) {
  const className = cn(
    "flex min-w-0 items-center gap-3 rounded-xl border border-white/20 bg-white/8 px-3 py-2.5 text-left text-white",
    "transition-colors hover:bg-white/12",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1f3a]",
  )

  const content = (
    <>
      {icon}
      <span className="min-w-0">
        <span className="block text-[11px] text-white/75">{store.label}</span>
        <span className="block text-sm font-bold">{store.storeName}</span>
      </span>
    </>
  )

  if (store.href) {
    return (
      <Link
        href={store.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </Link>
    )
  }

  return <div className={className}>{content}</div>
}

export default function ImmoAskMobileCardAd({
  appName = "APP IMMOASK",
  badgeLabel = "Nouveau",
  ratingLabel = "4.9/5 (1,2k avis)",
  headline = "Continuez l'expérience sur mobile",
  description = "Suivez votre visite guidée par GPS et recevez les alertes de disponibilité avant tout le monde.",
  googlePlay = {
    label: "Disponible sur",
    storeName: "Google Play",
    href: "https://bit.ly/immoask-mobile-android",
  },
  freeLabel = "Téléchargement gratuit",
  scanLabel = "Scan & Go",
  className,
}: ImmoAskMobileCardAdProps) {
  return (
    <section
      className={cn(
        "rounded-[22px] bg-gradient-to-br from-[#0f5f7a] via-[#0b3a55] to-[#071422] p-5 text-white sm:p-6",
        className,
      )}
      aria-label={appName}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-navy">
            <PhoneIcon />
          </span>
          <p className="text-sm font-bold tracking-wide uppercase">{appName}</p>
          {badgeLabel ? (
            <span className="inline-flex items-center rounded-full bg-warning px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
              {badgeLabel}
            </span>
          ) : null}
        </div>

        {ratingLabel ? (
          <p className="inline-flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1 text-xs font-medium">
            <StarIcon />
            {ratingLabel}
          </p>
        ) : null}
      </div>

      <h2 className="mt-5 text-xl font-bold tracking-tight sm:text-2xl">
        {headline}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-white/85">{description}</p>

      <div className="mt-5">
        <StoreButton store={googlePlay} icon={<PlayIcon />} />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-white/80">
        <p className="inline-flex items-center gap-1.5">
          <CircleCheckIcon />
          {freeLabel}
        </p>
        <p className="inline-flex items-center gap-1.5">
          <QrIcon />
          {scanLabel}
        </p>
      </div>
    </section>
  )
}

export { ImmoAskMobileCardAd }
