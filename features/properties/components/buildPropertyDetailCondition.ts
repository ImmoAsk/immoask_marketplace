import type {
  Property,
  PropertyDetailConditionItem,
  PropertyDetailConditionProps,
} from "@/features/properties/types"

function formatAmount(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value)
}

function pushItem(
  items: PropertyDetailConditionItem[],
  label: string,
  value: string | undefined,
  emphasized = false,
) {
  if (!value) {
    return
  }

  items.push(emphasized ? { label, value, emphasized: true } : { label, value })
}

function toContractType(property: Property) {
  const offre = property.offreName?.toLowerCase() ?? ""

  if (offre === "vendre" || offre === "vente") {
    return "Acte de vente notarié ou non notarié"
  }

  if (offre === "bail") {
    return "Bail immobilier notarié ou non notarié"
  }

  if (offre === "investir") {
    return "Convention d'investissement"
  }

  return "Bail d'habitation notarié ou non notarié"
}

function toTitle(property: Property) {
  const offre = property.offreName?.toLowerCase() ?? ""

  if (offre === "vendre" || offre === "vente") {
    return "Conditions financières & Juridiques"
  }

  return "Conditions financières & Juridiques du bail"
}

export function buildPropertyDetailCondition(
  property: Property,
): PropertyDetailConditionProps | null {
  const items: PropertyDetailConditionItem[] = []
  const depositMonths = property.depositMonths

  if (property.monthlyPrice != null) {
    pushItem(
      items,
      "Loyer mensuel principal",
      `${formatAmount(property.monthlyPrice)} XOF`,
      true,
    )
    pushItem(items, "Charges locatives", "Incluses")
    pushItem(
      items,
      "Dépôt de garantie (Caution)",
      depositMonths != null
        ? `${depositMonths} mois (Négociable)`
        : "Négociable",
    )
    pushItem(
      items,
      "Avance de loyer",
      depositMonths != null
        ? `${depositMonths} mois exigibles`
        : "Selon contrat",
    )
  } else if (property.salePrice != null) {
    pushItem(
      items,
      "Prix de vente",
      `${formatAmount(property.salePrice)} XOF`,
      true,
    )
  } else if (property.nightlyPrice != null) {
    pushItem(
      items,
      "Tarif nuitée",
      `${formatAmount(property.nightlyPrice)} XOF`,
      true,
    )
  }

  pushItem(items, "Type de contrat", toContractType(property))
  //pushItem(
  //  items,
  //  "Frais de dossier ImmoAsk",
  //  "0 FCFA (Zéro commission cachée)",
  //)
  //pushItem(items, "Enregistrement OTR Togo", "Pris en charge par mandataire")
  pushItem(items, "Moyens de paiement acceptés", "T-Money, Flooz, Virement")

  if (items.length === 0) {
    return null
  }

  return {
    title: toTitle(property),
    items,
  }
}
