"use client"

import { useEffect, useRef } from "react"
import type { Map as LeafletMap } from "leaflet"

import { cn } from "@/lib/cn"
import type { PropertyDetailLocationMapProps } from "@/features/properties/types"

import PropertyDetailSubscriptionGate from "./PropertyDetailSubscriptionGate"

const MARKER_HTML = `
  <span class="block size-7">
    <svg viewBox="0 0 28 36" width="28" height="36" aria-hidden="true">
      <path
        d="M14 1C7.4 1 2 6.4 2 13.2 2 22 14 35 14 35s12-13 12-21.8C26 6.4 20.6 1 14 1z"
        fill="#0096d6"
      />
      <circle cx="14" cy="13.2" r="4.6" fill="#ffffff" />
    </svg>
  </span>
`

export default function PropertyDetailLocationMap({
  latitude,
  longitude,
  zoom = 15,
  className,
}: PropertyDetailLocationMapProps) {
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

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        },
      ).addTo(map)

      const icon = L.divIcon({
        className: "property-detail-location-marker",
        html: MARKER_HTML,
        iconSize: [28, 36],
        iconAnchor: [14, 36],
      })

      L.marker([latitude, longitude], { icon }).addTo(map)
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
    <PropertyDetailSubscriptionGate className={cn("min-h-[12rem]", className)}>
      <div
        ref={containerRef}
        className="property-detail-location-map h-[300px] w-full sm:h-[360px]"
        aria-label="Carte de localisation du bien"
      />
    </PropertyDetailSubscriptionGate>
  )
}

export { PropertyDetailLocationMap }
