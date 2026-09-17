import type {
  Property,
  PropertyDetailEquipmentIcon,
  PropertyDetailEquipmentItem,
  PropertyDetailEquipmentProps,
} from "@/features/properties/types"

type EquipmentRule = {
  icon: PropertyDetailEquipmentIcon
  label: string | ((property: Property) => string)
  matches: (property: Property, haystack: string) => boolean
}

const EQUIPMENT_RULES: EquipmentRule[] = [
  {
    icon: "pool",
    label: "Piscine privée traitée",
    matches: (_property, haystack) => /piscine/.test(haystack),
  },
  {
    icon: "ac",
    label: "Climatisation totale",
    matches: (_property, haystack) => /climati/.test(haystack),
  },
  {
    icon: "wifi",
    label: "Fibre optique Togocom/Moov",
    matches: (_property, haystack) =>
      /fibre|wi-?fi|internet|togocom|moov/.test(haystack),
  },
  {
    icon: "garage",
    label: (property) => {
      const count = property.parking && property.parking > 0 ? property.parking : null
      if (!count) {
        return "Garage fermé"
      }

      return `Garage fermé ${count} voiture${count > 1 ? "s" : ""}`
    },
    matches: (property, haystack) =>
      Boolean(property.parking && property.parking > 0) || /garage/.test(haystack),
  },
  {
    icon: "solar",
    label: "Chauffe-eau solaire",
    matches: (_property, haystack) => /chauffe-eau|solaire/.test(haystack),
  },
  {
    icon: "well",
    label: "Forage & Bâche à eau",
    matches: (_property, haystack) =>
      /forage|b[aâ]che|cuve|citerne/.test(haystack),
  },
  {
    icon: "security",
    label: "Caméras & Poste de garde",
    matches: (_property, haystack) =>
      /cam[eé]ra|poste de garde|vigile|s[eé]curit[eé]/.test(haystack),
  },
  {
    icon: "annex",
    label: "Dépendance domestique",
    matches: (_property, haystack) =>
      /d[eé]pendance|domestique|boyerie/.test(haystack),
  },
]

function toCountLabel(count: number) {
  return `${count} prestation${count > 1 ? "s" : ""} certifiée${count > 1 ? "s" : ""}`
}

export function buildPropertyDetailEquipment(
  property: Property,
): PropertyDetailEquipmentProps | null {
  const haystack = [property.description, property.propertyType, ...property.badges]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  const items: PropertyDetailEquipmentItem[] = []

  for (const rule of EQUIPMENT_RULES) {
    if (!rule.matches(property, haystack)) {
      continue
    }

    items.push({
      icon: rule.icon,
      label: typeof rule.label === "function" ? rule.label(property) : rule.label,
    })
  }

  if (items.length === 0) {
    return null
  }

  return {
    title: "Équipements & Commodités inclus",
    countLabel: toCountLabel(items.length),
    items,
  }
}
