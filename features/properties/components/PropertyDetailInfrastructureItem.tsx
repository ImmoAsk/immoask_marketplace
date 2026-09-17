import { cn } from "@/lib/cn"
import type {
  PropertyDetailInfrastructureIcon,
  PropertyDetailInfrastructureItemProps,
} from "@/features/properties/types"

function SchoolsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6 shrink-0">
      <path
        d="M3.5 10 12 5.5 20.5 10 12 14.5 3.5 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M7 12v4.2c0 .5 2.2 2.3 5 2.3s5-1.8 5-2.3V12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 10v6.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function AirportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6 shrink-0">
      <path
        d="M3.5 16.5 12 6.5l3.2 5.3L21 13l-3.8 2.4 1.3 4.6-3.2-1.2L12 21.5 10.2 16 3.5 16.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SupermarketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6 shrink-0">
      <path
        d="M5 7h15l-1.4 8.2A2 2 0 0 1 16.6 17H9.2A2 2 0 0 1 7.2 15.2L5 7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M5 7 4.2 4.5H2.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="9.2" cy="19.2" r="1.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.2" cy="19.2" r="1.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function ClinicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6 shrink-0">
      <rect
        x="4.5"
        y="4.5"
        width="15"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 8.5v7M8.5 12h7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PlaceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6 shrink-0">
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function InfrastructureIcon({
  icon,
}: {
  icon: PropertyDetailInfrastructureIcon
}) {
  if (icon === "airport") {
    return <AirportIcon />
  }

  if (icon === "supermarket") {
    return <SupermarketIcon />
  }

  if (icon === "clinic") {
    return <ClinicIcon />
  }

  if (icon === "place") {
    return <PlaceIcon />
  }

  return <SchoolsIcon />
}

export default function PropertyDetailInfrastructureItem({
  icon,
  title,
  description,
  className,
}: PropertyDetailInfrastructureItemProps) {
  return (
    <li
      className={cn(
        "flex min-h-[4.5rem] items-start gap-3 rounded-xl bg-surface px-3.5 py-3.5",
        className,
      )}
    >
      <span className="mt-0.5 text-navy">
        <InfrastructureIcon icon={icon} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-navy">{title}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted">
          {description}
        </span>
      </span>
    </li>
  )
}

export { PropertyDetailInfrastructureItem }
