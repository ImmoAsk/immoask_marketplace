import type {
  Property,
  PropertyDetailPricingExtra,
  PropertyDetailPricingProps,
} from "@/features/properties/types"

function formatAmount(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value)
}

function toVisitFee(
  property: Property,
  isRent: boolean,
): PropertyDetailPricingExtra | undefined {
  if (property.visitFee == null || property.visitFee <= 0) {
    return undefined
  }

  return {
    label: "Droit de visite",
    subtitle: isRent
      ? "Encourager avec nous le travail de l'agent immobilier"
      : "Encourager avec nous le travail de l'agent immobilier",
    amountLabel: `${formatAmount(property.visitFee)} XOF`,
  }
}

function toNightlyFee(
  property: Property,
): PropertyDetailPricingExtra | undefined {
  if (property.nightlyPrice == null || property.nightlyPrice <= 0) {
    return undefined
  }

  return {
    label: "Coût de la nuitée",
    amountLabel: `${formatAmount(property.nightlyPrice)} XOF / nuit`,
  }
}

function isSaleOffer(property: Property) {
  const offre = property.offreName?.trim().toLowerCase() ?? ""
  return offre === "vendre" || offre === "vente" || offre === "investir"
}

function toPricingNote(property: Property) {
  return isSaleOffer(property)
    ? "La signature d'un acte de vente est cruciale avant tout versement"
    : "La signature du contrat de location est cruciale avant tout versement"
}

function toFurnishedExtras(
  property: Property,
  options: { isRent: boolean; includeNightly: boolean },
): PropertyDetailPricingExtra[] | undefined {
  if (!property.isFurnished) {
    return undefined
  }

  const extras = [
    toVisitFee(property, options.isRent),
    options.includeNightly ? toNightlyFee(property) : undefined,
  ].filter((extra): extra is PropertyDetailPricingExtra => Boolean(extra))

  return extras.length > 0 ? extras : undefined
}

export function buildPropertyDetailPricing(
  property: Property,
): PropertyDetailPricingProps | null {
  if (property.salePrice != null) {
    return {
      periodLabel: "Prix de vente",
      amountLabel: formatAmount(property.salePrice),
      unitLabel: "XOF",
      certifiedLabel: "Tarif certifié",
      note: toPricingNote(property),
      extras: toFurnishedExtras(property, {
        isRent: false,
        includeNightly: true,
      }),
    }
  }

  if (property.monthlyPrice != null) {
    return {
      periodLabel: "Loyer mensuel",
      amountLabel: formatAmount(property.monthlyPrice),
      unitLabel: "XOF / mois",
      certifiedLabel: "Tarif certifié",
      note: toPricingNote(property),
      extras: toFurnishedExtras(property, {
        isRent: true,
        includeNightly: true,
      }),
    }
  }

  if (property.nightlyPrice != null) {
    return {
      periodLabel: "Tarif nuitée",
      amountLabel: formatAmount(property.nightlyPrice),
      unitLabel: "XOF / nuit",
      certifiedLabel: "Tarif certifié",
      note: toPricingNote(property),
      extras: toFurnishedExtras(property, {
        isRent: false,
        includeNightly: false,
      }),
    }
  }

  return null
}
