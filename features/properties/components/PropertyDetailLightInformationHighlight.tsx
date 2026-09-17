import { cn } from "@/lib/cn"
import type {
  PropertyDetailLightInformationHighlightIcon,
  PropertyDetailLightInformationHighlightProps,
} from "@/features/properties/types"

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0 text-primary"
    >
      <path
        d="M12 3.5 5.5 6.2v5.2c0 4.1 2.7 7.3 6.5 8.6 3.8-1.3 6.5-4.5 6.5-8.6V6.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 12.1 11.2 14l3.5-4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function VerifiedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0 text-warning"
    >
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
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

function CertifiedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0 text-navy"
    >
      <rect x="5" y="5" width="14" height="14" rx="3" fill="currentColor" />
      <path
        d="M8.6 12.1 11 14.4 15.5 9.6"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HighlightIcon({
  icon,
}: {
  icon: PropertyDetailLightInformationHighlightIcon
}) {
  if (icon === "verified") {
    return <VerifiedIcon />
  }

  if (icon === "certified") {
    return <CertifiedIcon />
  }

  return <ShieldIcon />
}

export default function PropertyDetailLightInformationHighlight({
  icon,
  title,
  subtitle,
  className,
}: PropertyDetailLightInformationHighlightProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-start gap-3 rounded-xl bg-surface px-3.5 py-3.5",
        className,
      )}
    >
      <HighlightIcon icon={icon} />

      <span className="min-w-0">
        <span className="block text-sm font-semibold text-navy">{title}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted">
          {subtitle}
        </span>
      </span>
    </div>
  )
}

export { PropertyDetailLightInformationHighlight }
