import type { PlaceToVisit as PlaceToVisitRecord } from "@/lib/api/types"
import { getPlaceToVisits } from "@/lib/api/locations"
import { cn } from "@/lib/cn"
import { getCountryCallingCode } from "@/lib/routing/countries"

export type PlaceToVisitProps = {
  countryCode: string
  className?: string
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-3.5 shrink-0", className)}
    >
      <path
        d="M12 21s6-5.2 6-10.2A6 6 0 0 0 6 10.8C6 15.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="1.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function fillColumn(places: PlaceToVisitRecord[], minimum: number) {
  if (places.length === 0) {
    return []
  }

  const filled = [...places]

  while (filled.length < minimum) {
    filled.push(...places)
  }

  return filled
}

function PlaceCard({
  place,
  duplicate,
}: {
  place: PlaceToVisitRecord
  duplicate?: boolean
}) {
  return (
    <figure
      className="relative overflow-hidden rounded-[22px] bg-navy shadow-[0_12px_32px_rgb(11_31_58_/_0.12)]"
      aria-hidden={duplicate || undefined}
    >
      <img
        src={place.placeUrl}
        alt={duplicate ? "" : place.placeName}
        className="h-40 w-full object-cover sm:h-48"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy/55 to-transparent" />
      <figcaption className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-navy shadow-sm">
        <PinIcon className="text-primary" />
        <span className="truncate">{place.placeName}</span>
      </figcaption>
    </figure>
  )
}

function PlaceColumn({
  places,
  direction,
  className,
}: {
  places: PlaceToVisitRecord[]
  direction: "up" | "down"
  className?: string
}) {
  const loop = [...places, ...places]

  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <div
        className={cn(
          "flex flex-col gap-3",
          direction === "up"
            ? "place-scroll-up animate-place-scroll-up"
            : "place-scroll-down animate-place-scroll-down",
          "hover:[animation-play-state:paused]",
          className,
        )}
      >
        {loop.map((place, index) => (
          <PlaceCard
            key={`${place.id}-${index}`}
            place={place}
            duplicate={index >= places.length}
          />
        ))}
      </div>
    </div>
  )
}

export default async function PlaceToVisit({
  countryCode,
  className,
}: PlaceToVisitProps) {
  const paysId = getCountryCallingCode(countryCode)

  if (paysId == null) {
    return null
  }

  let places: PlaceToVisitRecord[] = []

  try {
    places = await getPlaceToVisits(paysId)
  } catch {
    return null
  }

  if (places.length === 0) {
    return null
  }

  const left = fillColumn(
    places.filter((_, index) => index % 2 === 0),
    3,
  )
  const rightSource = places.filter((_, index) => index % 2 === 1)
  const right = fillColumn(rightSource.length > 0 ? rightSource : places, 3)

  return (
    <section
      className={cn("relative min-w-0", className)}
      aria-label="Lieux à visiter"
    >
      <div
        className={cn(
          "grid h-[15rem] grid-cols-2 gap-3 overflow-hidden sm:h-[18rem] lg:h-[22rem]",
          "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
        )}
      >
        <PlaceColumn places={left} direction="up" />
        <PlaceColumn places={right} direction="down" className="pt-10" />
      </div>
    </section>
  )
}

export { PlaceToVisit }
