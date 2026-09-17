import { cn } from "@/lib/cn"
import type { PropertyDetailLocationProps } from "@/features/properties/types"

import PropertyDetailLocationLandmark from "./PropertyDetailLocationLandmark"
import PropertyDetailLocationMap from "./PropertyDetailLocationMap"
import PropertyDetailSubscriptionGate from "./PropertyDetailSubscriptionGate"

function MapFoldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0 text-primary"
    >
      <path
        d="M8.5 4.5 3.5 6.2v13.3l5-1.7 7 1.7 5-1.7V4.5l-5 1.7-7-1.7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 4.5v13.3M15.5 6.2v13.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function PropertyDetailLocation({
  title = "Localisation & Environnement du quartier",
  subtitle,
  accessLabel,
  coordinates,
  zoom = 15,
  landmark,
  className,
}: PropertyDetailLocationProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl bg-white shadow-card",
        className,
      )}
      aria-labelledby="property-detail-location-title"
    >
      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <h2
          id="property-detail-location-title"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-navy"
        >
          <MapFoldIcon />
          <span>{title}</span>
        </h2>
      </div>

      <PropertyDetailSubscriptionGate className="mt-4 min-h-[12rem]">
        <div className="flex flex-col gap-3 px-5 sm:flex-row sm:items-start sm:justify-between sm:px-6">
          {subtitle ? (
            <p className="min-w-0 text-sm leading-relaxed text-muted">{subtitle}</p>
          ) : null}

          {accessLabel ? (
            <p className="inline-flex shrink-0 items-center self-start rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-navy">
              {accessLabel}
            </p>
          ) : null}
        </div>

        {coordinates ? (
          <div className="relative mt-4">
            <PropertyDetailLocationMap
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
              zoom={zoom}
            />

            {landmark ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1100] p-4 sm:p-5">
                <div className="pointer-events-auto">
                  <PropertyDetailLocationLandmark {...landmark} />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </PropertyDetailSubscriptionGate>
    </section>
  )
}

export { PropertyDetailLocation }
