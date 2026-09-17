import type { ReactNode } from "react"

export const PROPERTY_TYPE_MAP = {
  1: "Villa",
  2: "Appartement",
  3: "Maison",
  4: "Chambre",
  5: "Chambre salon",
  6: "Terrain rural",
  7: "Terrain urbain",
  8: "2 chambres salon",
  9: "Bureau",
  10: "Appartement meublé",
  11: "3 chambres salon",
  12: "Magasin",
  13: "Terrain",
  14: "Boutique",
  15: "Studio",
  16: "Pièce",
  17: "Studio meublé",
  18: "Immeuble",
  19: "Immeuble commercial",
  20: "Espace coworking",
  21: "Villa luxueuse",
  22: "Appartement luxueux",
  23: "Villa meublée",
  24: "Bureau meublé",
  25: "Hotel",
  26: "Ecole",
  27: "Chambre d'hotel",
  28: "Bar-restaurant",
  29: "Espace commercial",
  30: "Garage",
  31: "Salle de confrence",
  32: "Ferme agricole",
} as const

export type PropertyTypeId = keyof typeof PROPERTY_TYPE_MAP

export type StatisticCardProps = {
  id: number
  total: string | number
  title: string
  icon_illustration: ReactNode
  href: string
  className?: string
}
