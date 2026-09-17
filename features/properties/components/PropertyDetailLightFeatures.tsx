import { cn } from "@/lib/cn"
import type {
  PropertyDetailLightFeatureIcon,
  PropertyDetailLightFeatureProps,
  PropertyDetailLightFeaturesProps,
} from "@/features/properties/types"

function BedroomsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-7">
      <path
        d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9H21v9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 18h18M3 14h18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6 9V7.5A1.5 1.5 0 0 1 7.5 6h4A1.5 1.5 0 0 1 13 7.5V9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BathroomsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-7">
      <path
        d="M4 12h16v3.5A3.5 3.5 0 0 1 16.5 19h-9A3.5 3.5 0 0 1 4 15.5V12z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M6 12V7.5A2.5 2.5 0 0 1 8.5 5H11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M7 19.5v1M17 19.5v1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function LivingRoomsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-7">
      <path
        d="M5 14.5V12a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M4 14.5h16V17a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17v-2.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.5V8.5A1.5 1.5 0 0 1 9.5 7h5A1.5 1.5 0 0 1 16 8.5v2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M7 18.5v1M17 18.5v1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function GaragesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-7">
      <path
        d="M6.5 14.5 8 10.2A1.5 1.5 0 0 1 9.4 9.2h5.2a1.5 1.5 0 0 1 1.4 1l1.5 4.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 14.5h15v2.2a1.3 1.3 0 0 1-1.3 1.3h-1.4v-1.1a1.3 1.3 0 0 0-2.6 0v1.1H9.8v-1.1a1.3 1.3 0 0 0-2.6 0v1.1H5.8A1.3 1.3 0 0 1 4.5 16.7v-2.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 11.2h6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function LivingAreaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-7">
      <rect
        x="3"
        y="9.5"
        width="18"
        height="5"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M7 9.5v3M11 9.5v2M15 9.5v3M19 9.5v2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function LandAreaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-7">
      <path
        d="M6 19V5.5L18.5 19H6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 19v-8.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function FeatureIcon({ icon }: { icon: PropertyDetailLightFeatureIcon }) {
  if (icon === "bathrooms") {
    return <BathroomsIcon />
  }

  if (icon === "livingRooms") {
    return <LivingRoomsIcon />
  }

  if (icon === "garages") {
    return <GaragesIcon />
  }

  if (icon === "livingArea") {
    return <LivingAreaIcon />
  }

  if (icon === "landArea") {
    return <LandAreaIcon />
  }

  return <BedroomsIcon />
}

function formatFeatureValue(value: string | number) {
  if (typeof value !== "number") {
    return value
  }

  return new Intl.NumberFormat("fr-FR").format(value)
}

function PropertyDetailLightFeatureCard({
  icon,
  value,
  label,
  className,
}: PropertyDetailLightFeatureProps) {
  return (
    <li
      className={cn(
        "flex min-h-[8.5rem] flex-col items-center justify-center gap-1.5 rounded-2xl bg-white px-3 py-5 text-center shadow-card",
        className,
      )}
    >
      <span className="text-primary">
        <FeatureIcon icon={icon} />
      </span>
      <p className="text-xl font-bold tracking-tight text-navy">
        {formatFeatureValue(value)}
      </p>
      <p className="text-xs font-medium text-muted">{label}</p>
    </li>
  )
}

export default function PropertyDetailLightFeatures({
  features,
  className,
}: PropertyDetailLightFeaturesProps) {
  if (features.length === 0) {
    return null
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3",
        features.length >= 6 && "lg:grid-cols-6",
        features.length === 5 && "lg:grid-cols-5",
        features.length === 4 && "lg:grid-cols-4",
        className,
      )}
    >
      {features.map((feature) => (
        <PropertyDetailLightFeatureCard
          key={`${feature.icon}-${feature.label}`}
          {...feature}
        />
      ))}
    </ul>
  )
}

export { PropertyDetailLightFeatures, PropertyDetailLightFeatureCard }
