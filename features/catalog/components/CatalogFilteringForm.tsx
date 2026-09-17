"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

import Button from "@/components/ui/Button"
import { cn } from "@/lib/cn"
import type {
  CatalogFilteringFormProps,
  CatalogFilteringFormValues,
} from "../types"

import { toCatalogFilteringFormHref } from "./buildCatalogFilteringForm"
import CatalogFilteringFormAmenities from "./CatalogFilteringFormAmenities"
import CatalogFilteringFormBedrooms from "./CatalogFilteringFormBedrooms"
import CatalogFilteringFormField from "./CatalogFilteringFormField"
import CatalogFilteringFormOfferTabs from "./CatalogFilteringFormOfferTabs"
import CatalogFilteringFormSelect from "./CatalogFilteringFormSelect"
import CatalogFilteringFormTrustBadge from "./CatalogFilteringFormTrustBadge"

const DEFAULT_BEDROOM_OPTIONS = [1, 2, 3, 4]

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0"
    >
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M16 16.5 20 20.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function toValues(
  defaults?: Partial<CatalogFilteringFormValues>,
): CatalogFilteringFormValues {
  return {
    offer: defaults?.offer ?? "all",
    propertyType: defaults?.propertyType ?? "",
    location: defaults?.location ?? "",
    budget: defaults?.budget ?? "",
    minBedrooms: defaults?.minBedrooms ?? null,
    amenities: defaults?.amenities ?? [],
  }
}

export default function CatalogFilteringForm({
  offerTabs,
  propertyTypeOptions,
  locationOptions,
  budgetOptions,
  bedroomOptions = DEFAULT_BEDROOM_OPTIONS,
  amenities,
  defaultValues,
  values: controlledValues,
  resultCount,
  searchLabel = "Rechercher",
  trustBadgeLabel = "100% audités par nos inspecteurs agréés",
  propertyTypeLabel = "Type de bien",
  locationLabel = "Localisation / Quartier",
  budgetLabel = "Budget Max (XOF)",
  bedroomsLabel = "Chambres min.",
  advancedLabel = "Filtres avancés",
  country,
  transaction,
  onSubmit,
  onAdvancedClick,
  className,
}: CatalogFilteringFormProps) {
  const router = useRouter()
  const [internalValues, setInternalValues] = useState(() =>
    toValues(defaultValues),
  )
  const values = controlledValues ?? internalValues

  function update<K extends keyof CatalogFilteringFormValues>(
    key: K,
    value: CatalogFilteringFormValues[K],
  ) {
    if (controlledValues) {
      return
    }

    setInternalValues((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.(values)

    if (country) {
      router.push(
        toCatalogFilteringFormHref(
          country,
          transaction ?? "locations-immobilieres",
          values,
        ),
      )
    }
  }

  const searchText =
    resultCount == null ? searchLabel : `${searchLabel} (${resultCount})`

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl bg-surface p-4 shadow-card sm:p-5",
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CatalogFilteringFormOfferTabs
          items={offerTabs}
          value={values.offer}
          onChange={(offer) => update("offer", offer)}
        />
        <CatalogFilteringFormTrustBadge label={trustBadgeLabel} />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <CatalogFilteringFormField label={propertyTypeLabel} icon="building">
          <CatalogFilteringFormSelect
            name="propertyType"
            aria-label={propertyTypeLabel}
            value={values.propertyType}
            options={propertyTypeOptions}
            onChange={(propertyType) => update("propertyType", propertyType)}
          />
        </CatalogFilteringFormField>

        <CatalogFilteringFormField label={locationLabel} icon="map">
          <CatalogFilteringFormSelect
            name="location"
            aria-label={locationLabel}
            value={values.location}
            options={locationOptions}
            onChange={(location) => update("location", location)}
          />
        </CatalogFilteringFormField>

        <CatalogFilteringFormField label={budgetLabel} icon="budget">
          <CatalogFilteringFormSelect
            name="budget"
            aria-label={budgetLabel}
            value={values.budget}
            options={budgetOptions}
            onChange={(budget) => update("budget", budget)}
          />
        </CatalogFilteringFormField>

        <CatalogFilteringFormField label={bedroomsLabel} icon="bed">
          <CatalogFilteringFormBedrooms
            options={bedroomOptions}
            value={values.minBedrooms}
            onChange={(minBedrooms) => update("minBedrooms", minBedrooms)}
            advancedLabel={advancedLabel}
            onAdvancedClick={onAdvancedClick}
          />
        </CatalogFilteringFormField>
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <CatalogFilteringFormAmenities
          items={amenities}
          value={values.amenities}
          onChange={(nextAmenities) => update("amenities", nextAmenities)}
        />

        <Button type="submit" size="lg" className="h-12 shrink-0 lg:min-w-52">
          <SearchIcon />
          {searchText}
        </Button>
      </div>
    </form>
  )
}

export { CatalogFilteringForm }
