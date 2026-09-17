"use client"

import { useEffect, useRef } from "react"
import type { Map as LeafletMap } from "leaflet"

import { cn } from "@/lib/cn"
import type { CatalogMapViewProps } from "@/features/properties/types"

const DEFAULT_LATITUDE = 6.1319
const DEFAULT_LONGITUDE = 1.2228
const DEFAULT_MESSAGE = "La vue carte et split arrive bientôt"

export default function CatalogMapView({
  latitude = DEFAULT_LATITUDE,
  longitude = DEFAULT_LONGITUDE,
  zoom = 12,
  message = DEFAULT_MESSAGE,
  className,
}: CatalogMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    let cancelled = false

    async function setup() {
      const leaflet = await import("leaflet")
      const L = leaflet.default

      if (cancelled || !containerRef.current) {
        return
      }

      mapRef.current?.remove()

      const map = L.map(containerRef.current, {
        center: [latitude, longitude],
        zoom,
        scrollWheelZoom: false,
        zoomControl: true,
      })

      map.zoomControl.setPosition("topright")

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      mapRef.current = map

      requestAnimationFrame(() => {
        map.invalidateSize()
      })
    }

    void setup()

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [latitude, longitude, zoom])

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-white shadow-card",
        className,
      )}
    >
      <div
        ref={containerRef}
        className="catalog-map-view h-[420px] w-full sm:h-[520px]"
        aria-label="Carte du catalogue immobilier"
      />
      <p className="border-t border-border px-4 py-3 text-center text-sm font-medium text-navy">
        {message}
      </p>
    </div>
  )
}

export { CatalogMapView }
