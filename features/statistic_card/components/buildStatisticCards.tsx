import type { ReactNode } from "react"

import type { PropertyStatistic } from "@/lib/api/types"
import { slugify } from "@/lib/utils/createPropertyLink"

import {
  PROPERTY_TYPE_MAP,
  type PropertyTypeId,
  type StatisticCardProps,
} from "../types"

type IconKind =
  | "villa"
  | "apartment"
  | "house"
  | "room"
  | "terrain"
  | "office"
  | "shop"
  | "building"
  | "hotel"
  | "school"
  | "garage"
  | "farm"

const PROPERTY_TYPE_ICONS: Record<PropertyTypeId, IconKind> = {
  1: "villa",
  2: "apartment",
  3: "house",
  4: "room",
  5: "room",
  6: "terrain",
  7: "terrain",
  8: "room",
  9: "office",
  10: "apartment",
  11: "room",
  12: "shop",
  13: "terrain",
  14: "shop",
  15: "room",
  16: "room",
  17: "room",
  18: "building",
  19: "building",
  20: "office",
  21: "villa",
  22: "apartment",
  23: "villa",
  24: "office",
  25: "hotel",
  26: "school",
  27: "hotel",
  28: "shop",
  29: "shop",
  30: "garage",
  31: "office",
  32: "farm",
}

function VillaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 11 12 4.5 20 11V20H4V11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-5h4v5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ApartmentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="5"
        y="3.5"
        width="14"
        height="17"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9 20.5v-4h6v4M8.5 8h.1M12 8h.1M15.5 8h.1M8.5 12h.1M12 12h.1M15.5 12h.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function HouseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20V9.5L8 6.5V20M8 6.5 12 3.5 20 9.5V20H8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 20v-4h4v4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function RoomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9H21v9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 18h18M6 9V7.5A1.5 1.5 0 0 1 7.5 6h4A1.5 1.5 0 0 1 13 7.5V9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TerrainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19.5 19 19.5 5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M5 15.2h4.8M5 11.4h2.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function OfficeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="6"
        y="3.5"
        width="12"
        height="17"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M10 20.5v-3.5h4v3.5M9 8h.1M12 8h.1M15 8h.1M9 12h.1M12 12h.1M15 12h.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ShopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 9.5 6 5.5h12l1.5 4H4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M5 9.5V19h14V9.5M10 19v-5h4v5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 20V7.5L12 4l7 3.5V20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-5h4v5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 10h.1M12 10h.1M15.5 10h.1M8.5 13.5h.1M15.5 13.5h.1"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function HotelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 19.5V8.5L12 4l8 4.5v11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M4 19.5h16M9 19.5v-4h6v4M8.5 11h.1M12 11h.1M15.5 11h.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SchoolIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 10.5 12 5l9 5.5v8.5H3V10.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8 19V13.5h8V19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GarageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 19.5V10L12 4.5 20 10v9.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M7 19.5v-5h10v5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FarmIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 19.5h16M6 19.5V11l6-5.5 6 5.5v8.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 19.5v-4h4v4M8 13h.1M12 13h.1M16 13h.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

const ICONS: Record<IconKind, ReactNode> = {
  villa: <VillaIcon />,
  apartment: <ApartmentIcon />,
  house: <HouseIcon />,
  room: <RoomIcon />,
  terrain: <TerrainIcon />,
  office: <OfficeIcon />,
  shop: <ShopIcon />,
  building: <BuildingIcon />,
  hotel: <HotelIcon />,
  school: <SchoolIcon />,
  garage: <GarageIcon />,
  farm: <FarmIcon />,
}

function iconForTypeId(id: number) {
  const iconKind = PROPERTY_TYPE_ICONS[id as PropertyTypeId]
  return ICONS[iconKind ?? "house"]
}

export function buildStatisticCards({
  country,
  statistics,
}: {
  country: string
  statistics: PropertyStatistic[]
}): StatisticCardProps[] {
  return statistics
    .flatMap((statistic) => {
      const id = Number(statistic.id)
      if (!Number.isFinite(id)) {
        return []
      }

      const title =
        statistic.denomination?.trim() ||
        PROPERTY_TYPE_MAP[id as PropertyTypeId] ||
        "Bien immobilier"

      return [
        {
          id,
          title,
          total: statistic.total ?? 0,
          href: `/${slugify(country)}/catalog?categorie=${id}`,
          icon_illustration: iconForTypeId(id),
        },
      ]
    })
    .sort((left, right) => left.id - right.id)
}
