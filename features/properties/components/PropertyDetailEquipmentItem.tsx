import { cn } from "@/lib/cn"
import type {
  PropertyDetailEquipmentIcon,
  PropertyDetailEquipmentItemProps,
} from "@/features/properties/types"

function PoolIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <path
        d="M4.5 10.5h15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5 14c1.4 0 1.4 2 2.8 2s1.4-2 2.8-2 1.4 2 2.8 2 1.4-2 2.8-2 1.4 2 2.8 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5 17.5c1.4 0 1.4 2 2.8 2s1.4-2 2.8-2 1.4 2 2.8 2 1.4-2 2.8-2 1.4 2 2.8 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M8 10.5V7.5A2.5 2.5 0 0 1 10.5 5H12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function AcIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 5.5v2.2M12 16.3v2.2M5.5 12h2.2M16.3 12h2.2M7.4 7.4l1.6 1.6M15 15l1.6 1.6M16.6 7.4 15 9M9 15l-1.6 1.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <path
        d="M5 10.2A10 10 0 0 1 12 7.5c2.6 0 5 .8 7 2.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M7.8 13.2A6.5 6.5 0 0 1 12 11.5c1.6 0 3 .5 4.2 1.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M10.3 16.1A3 3 0 0 1 12 15.5c.6 0 1.2.2 1.7.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="18.4" r="1" fill="currentColor" />
    </svg>
  )
}

function GarageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <path
        d="M4.5 10.5 12 4.5l7.5 6V19a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8 20v-6h8v6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 16.2h6.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SolarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <rect
        x="4.5"
        y="10"
        width="15"
        height="9"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9.5 10v9M14.5 10v9M4.5 14.5h15"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 3.5v2M8.5 4.8l1 1.3M15.5 4.8l-1 1.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function WellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <path
        d="M5 11 12 5.5 19 11V19H5v-8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.2c.9 0 1.7.8 1.7 1.8 0 1.3-1.7 2.7-1.7 2.7S10.3 15.3 10.3 14c0-1 .8-1.8 1.7-1.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SecurityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <path
        d="M5 9.5h10.5A1.5 1.5 0 0 1 17 11v5.5A1.5 1.5 0 0 1 15.5 18H5A1.5 1.5 0 0 1 3.5 16.5V11A1.5 1.5 0 0 1 5 9.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M17 12.5 20.5 11v6L17 15.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="10.2" cy="13.7" r="1.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function AnnexIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <path
        d="M4.5 12.5 9 8.5v11H5.5A1 1 0 0 1 4.5 18.5v-6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 11.5 16.5 5.5 21 9.5V19a1 1 0 0 1-1 1H9v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 20v-4.5h4V20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EquipmentIcon({ icon }: { icon: PropertyDetailEquipmentIcon }) {
  if (icon === "ac") {
    return <AcIcon />
  }

  if (icon === "wifi") {
    return <WifiIcon />
  }

  if (icon === "garage") {
    return <GarageIcon />
  }

  if (icon === "solar") {
    return <SolarIcon />
  }

  if (icon === "well") {
    return <WellIcon />
  }

  if (icon === "security") {
    return <SecurityIcon />
  }

  if (icon === "annex") {
    return <AnnexIcon />
  }

  return <PoolIcon />
}

export default function PropertyDetailEquipmentItem({
  icon,
  label,
  className,
}: PropertyDetailEquipmentItemProps) {
  return (
    <li
      className={cn(
        "flex min-h-[3.5rem] items-center gap-3 rounded-xl bg-surface px-3.5 py-3",
        className,
      )}
    >
      <span className="text-navy">
        <EquipmentIcon icon={icon} />
      </span>
      <span className="min-w-0 text-sm font-medium leading-snug text-navy">
        {label}
      </span>
    </li>
  )
}

export { PropertyDetailEquipmentItem }
