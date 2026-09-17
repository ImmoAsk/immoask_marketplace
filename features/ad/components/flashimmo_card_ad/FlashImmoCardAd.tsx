import Link from "next/link"

import { cn } from "@/lib/cn"

import type {
  FlashImmoCardAdFeature,
  FlashImmoCardAdFeatureIcon,
  FlashImmoCardAdProps,
} from "./types"

const DEFAULT_FEATURES: FlashImmoCardAdFeature[] = [
  {
    icon: "bolt",
    label: "Alertes instantanées & opportunités off-market",
  },
  {
    icon: "chart",
    label: "Baisses de loyer & renégociations en direct",
  },
  {
    icon: "bell",
    label: "Créneaux de visite prioritaires avant diffusion",
  },
]

function MegaphoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 text-white"
    >
      <path
        d="M5 10.5v3c0 .8.7 1.5 1.5 1.5H8l3.2 2.6V8.4L8 11H6.5A1.5 1.5 0 0 0 5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M11.2 8.4 18.5 5.5v13L11.2 15.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function VerifiedIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0 text-[#16a34a]"
    >
      <path
        d="M10 2.4 11.8 4l2.1-.3.8 2 2 1-.7 2 .7 2-2 1-.8 2-2.1-.3L10 17.6 8.2 16l-2.1.3-.8-2-2-1 .7-2-.7-2 2-1 .8-2 2.1.3L10 2.4Z"
        fill="currentColor"
      />
      <path
        d="M7.6 10.1 9.2 11.7 12.5 8.3"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FeatureIcon({ icon }: { icon: FlashImmoCardAdFeatureIcon }) {
  if (icon === "bolt") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 text-[#b45309]">
        <path
          d="M13 3.5 6.5 13h5l-1 7.5 6.8-10.5h-5L13 3.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (icon === "chart") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 text-[#0f766e]">
        <path
          d="M4.5 7.5 10 13l3.2-3.2 6.3 6.3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 16.1h3.8V12"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 text-[#1d4ed8]">
      <path
        d="M12 4.5a5 5 0 0 1 5 5v3.2l1.4 2.3H5.6L7 12.7V9.5a5 5 0 0 1 5-5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 18.2a2.1 2.1 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0 text-[#15803d]"
    >
      <path
        d="M5.5 6.5h13A1.5 1.5 0 0 1 20 8v7.5A1.5 1.5 0 0 1 18.5 17H12l-4 2.7V17H5.5A1.5 1.5 0 0 1 4 15.5V8A1.5 1.5 0 0 1 5.5 6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function FlashImmoCardAd({
  brandName = "FlashImmo by ImmoAsk",
  subscriberLabel = "12,4k+ abonnés",
  description = "Soyez alerté en continu sur WhatsApp des nouvelles villas, baisses de loyer et opportunités immobilières à Lomé avant leur publication générale.",
  features = DEFAULT_FEATURES,
  ctaLabel = "Rejoindre FlashImmo by ImmoAsk",
  ctaHref = "https://www.whatsapp.com/channel/0029Va8UsGT6mYPQ1aIvdm25",
  footerLeft = "100% Gratuit • Sans spam",
  footerRight = "Désabonnement en 1 clic",
  className,
}: FlashImmoCardAdProps) {
  return (
    <section
      className={cn(
        "rounded-[22px] border border-[#86efac] bg-[#f3faf5] p-5 sm:p-6",
        className,
      )}
      aria-label={brandName}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#22c55e]">
            <MegaphoneIcon />
          </span>
          <p className="inline-flex min-w-0 items-center gap-1.5 text-sm font-bold tracking-wide text-[#14532d] uppercase">
            <span className="truncate">{brandName}</span>
            <VerifiedIcon />
          </p>
        </div>

        {subscriberLabel ? (
          <p className="inline-flex items-center gap-2 rounded-full border border-[#86efac] bg-white px-3 py-1 text-xs font-medium text-navy">
            <span aria-hidden="true" className="size-2 rounded-full bg-[#16a34a]" />
            {subscriberLabel}
          </p>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-navy">{description}</p>

      {features.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2.5">
          {features.map((feature) => (
            <li
              key={feature.label}
              className="flex items-start gap-2.5 text-sm font-medium text-navy"
            >
              <FeatureIcon icon={feature.icon} />
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <Link
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#86efac] bg-white text-sm font-bold text-[#15803d]",
          "transition-colors hover:bg-[#ecfdf3]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success focus-visible:ring-offset-2",
        )}
      >
        <ChatIcon />
        {ctaLabel}
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <p>{footerLeft}</p>
        <p>{footerRight}</p>
      </div>
    </section>
  )
}

export { FlashImmoCardAd }
