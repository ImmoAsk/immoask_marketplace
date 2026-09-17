import type { SuperCategorieTab } from "@/features/super_categorie_tabs/types"

export const DEFAULT_SUPER_CATEGORIE_TABS: SuperCategorieTab[] = [
  {
    id: "se-loger",
    icon: "🏠",
    label: "Se loger",
    usage: 1,
    moreLabel: "Plus de logements",
  },
  {
    id: "sejourner",
    icon: "🌴",
    label: "Séjourner",
    usage: 5,
    moreLabel: "Plus de séjours meublés",
  },
  {
    id: "acquerir",
    icon: "🔑",
    label: "Acquérir",
    usage: 7,
    moreLabel: "Plus d'acquisitions",
  },
  {
    id: "entreprendre",
    icon: "🏢",
    label: "Entreprendre",
    usage: 3,
    moreLabel: "Plus de biens commerciaux",
  },
]

export function getSuperCategorieTab(
  id: string,
  items: SuperCategorieTab[] = DEFAULT_SUPER_CATEGORIE_TABS,
) {
  return items.find((item) => item.id === id) ?? items[0]
}

export function pickRandomSuperCategorieTab(
  items: SuperCategorieTab[] = DEFAULT_SUPER_CATEGORIE_TABS,
) {
  return items[Math.floor(Math.random() * items.length)] ?? items[0]
}
