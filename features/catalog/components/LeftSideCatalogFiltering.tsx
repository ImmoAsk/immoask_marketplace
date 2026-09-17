"use client"

import { useEffect, useMemo, useState, useTransition, type FormEvent } from "react"
import { useRouter } from "next/navigation"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { cn } from "@/lib/cn"
import { getCities, getDistricts } from "@/lib/api/locations"
import { getCountryCallingCode } from "@/lib/routing/countries"
import type {
  LeftSideCatalogFilteringCityOption,
  LeftSideCatalogFilteringDemand,
  LeftSideCatalogFilteringDemandOption,
  LeftSideCatalogFilteringDistrictOption,
  LeftSideCatalogFilteringOption,
  LeftSideCatalogFilteringProps,
  LeftSideCatalogFilteringValues,
} from "@/features/properties/types"

import {
  toCityOptions,
  toDistrictOptions,
  toLeftSideCatalogFilteringHref,
} from "./buildLeftSideCatalogFiltering"

const DEFAULT_DEMAND_OPTIONS: LeftSideCatalogFilteringDemandOption[] = [
  { id: "rent", label: "Louer" },
  { id: "sale", label: "Acheter" },
  { id: "lease", label: "Bailler" },
]

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path
        d="M4 20V7.5L12 4l8 3.5V20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 20v-5h6v5M8 10h.01M12 10h.01M16 10h.01M8 13.5h.01M12 13.5h.01M16 13.5h.01"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function HouseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
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

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-3.5"
    >
      <path
        d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function DemandIcon({ id }: { id: LeftSideCatalogFilteringDemand }) {
  if (id === "rent") {
    return <BuildingIcon />
  }

  return <HouseIcon />
}

function toValues(
  defaults?: Partial<LeftSideCatalogFilteringValues>,
): LeftSideCatalogFilteringValues {
  return {
    demand: defaults?.demand ?? "rent",
    city: defaults?.city ?? "",
    district: defaults?.district ?? "",
    propertyType: defaults?.propertyType ?? "",
    bedrooms: defaults?.bedrooms ?? "",
    bathrooms: defaults?.bathrooms ?? "",
    budgetMin: defaults?.budgetMin ?? "",
    budgetMax: defaults?.budgetMax ?? "",
    depositMonths: defaults?.depositMonths ?? "",
    parking: defaults?.parking ?? "",
  }
}

function FieldLabel({ children }: { children: string }) {
  return <p className="mb-1.5 text-sm text-navy">{children}</p>
}

function FilterSelect({
  name,
  value,
  placeholder,
  options,
  disabled,
  clearable,
  onChange,
}: {
  name: string
  value: string
  placeholder: string
  options: LeftSideCatalogFilteringOption[]
  disabled?: boolean
  clearable?: boolean
  onChange: (value: string) => void
}) {
  const showClear = Boolean(value) && Boolean(clearable) && !disabled

  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        disabled={disabled}
        aria-label={placeholder}
        autoComplete="off"
        suppressHydrationWarning
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-10 w-full appearance-none rounded-lg border border-border bg-white px-3 pr-10 text-sm text-foreground shadow-sm",
          "transition-colors hover:border-primary/40",
          "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60",
          showClear && "pr-16",
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {clearable ? (
        <button
          type="button"
          tabIndex={showClear ? 0 : -1}
          aria-hidden={!showClear}
          aria-label={`Effacer ${placeholder}`}
          onClick={() => onChange("")}
          className={cn(
            "absolute inset-y-0 right-9 z-10 flex items-center px-1 text-subtle hover:text-navy",
            !showClear && "invisible pointer-events-none",
          )}
        >
          <CloseIcon />
          <span aria-hidden="true" className="ml-1 h-4 w-px bg-border" />
        </button>
      ) : null}
      <span
        className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center text-subtle"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-4 stroke-current">
          <path
            d="M6 9l6 6 6-6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  )
}

export default function LeftSideCatalogFiltering({
  country,
  transaction,
  demandTitle = "Quelle est votre demande ?",
  demandOptions = DEFAULT_DEMAND_OPTIONS,
  geographyTitle = "Situation géographique",
  cityLabel = "Quelle ville ?",
  cityPlaceholder = "Préciser la ville",
  cityOptions,
  districtLabel = "Quel quartier ?",
  districtPlaceholder = "Préciser le quartier",
  districtOptions,
  propertyTypeTitle = "Type de biens immobiliers",
  propertyTypePlaceholder = "Préciser le type",
  propertyTypeOptions,
  roomsTitle = "Chambres & Salles de bain",
  bathroomsPlaceholder = "Bains",
  budgetTitle = "Budget",
  budgetMinPlaceholder = "Min",
  budgetMaxPlaceholder = "Max",
  depositTitle = "Cautions et Avances",
  depositPlaceholder = "Nombre de mois",
  parkingTitle = "Garage",
  parkingPlaceholder = "Nombre de voitures",
  submitLabel = "Appliquer les filtres",
  defaultValues,
  values: controlledValues,
  onSubmit,
  className,
}: LeftSideCatalogFilteringProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [internalValues, setInternalValues] = useState(() =>
    toValues(defaultValues),
  )
  const [cities, setCities] =
    useState<LeftSideCatalogFilteringCityOption[]>(cityOptions)
  const [districts, setDistricts] =
    useState<LeftSideCatalogFilteringDistrictOption[]>(districtOptions)
  const [districtsLoading, setDistrictsLoading] = useState(false)
  const values = controlledValues ?? internalValues
  const selectedCity = useMemo(
    () => cities.find((option) => option.value === values.city),
    [cities, values.city],
  )

  useEffect(() => {
    if (cityOptions.length > 0 || !country) {
      return
    }

    const callingCode = getCountryCallingCode(country)
    if (!callingCode) {
      return
    }

    let cancelled = false

    getCities(callingCode)
      .then((records) => {
        if (!cancelled) {
          setCities(toCityOptions(records))
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCities([])
        }
      })

    return () => {
      cancelled = true
    }
  }, [cityOptions.length, country])

  useEffect(() => {
    const townId = selectedCity?.id
    const citySlug = selectedCity?.value

    if (!townId || !citySlug) {
      setDistricts([])
      setDistrictsLoading(false)
      return
    }

    let cancelled = false
    setDistrictsLoading(true)

    getDistricts(townId)
      .then((records) => {
        if (!cancelled) {
          setDistricts(toDistrictOptions(records, citySlug))
        }
      })
      .catch(() => {
        if (!cancelled) {
          setDistricts([])
        }
      })
      .finally(() => {
        if (!cancelled) {
          setDistrictsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [selectedCity?.id, selectedCity?.value])

  function update<K extends keyof LeftSideCatalogFilteringValues>(
    key: K,
    value: LeftSideCatalogFilteringValues[K],
  ) {
    if (controlledValues) {
      return
    }

    setInternalValues((current) => {
      const next = { ...current, [key]: value }

      if (key === "city") {
        next.district = ""
      }

      if (key === "propertyType" && !value) {
        next.city = ""
        next.district = ""
      }

      return next
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.(values)

    if (country) {
      const href = toLeftSideCatalogFilteringHref(
        country,
        transaction,
        values,
      )

      startTransition(() => {
        router.push(href)
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      aria-busy={isPending}
      className={cn(
        "rounded-2xl border border-border bg-white p-5 shadow-card",
        className,
      )}
    >
      <section>
        <h2 className="text-base font-bold text-navy">{demandTitle}</h2>
        <div
          role="group"
          aria-label={demandTitle}
          className="mt-3 flex flex-wrap gap-2"
        >
          {demandOptions.map((option) => {
            const selected = option.id === values.demand

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => update("demand", option.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  selected
                    ? "bg-primary-soft text-navy"
                    : "bg-surface text-navy hover:bg-primary-soft/70",
                )}
              >
                <DemandIcon id={option.id} />
                {option.label}
              </button>
            )
          })}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-bold text-navy">{geographyTitle}</h2>
        <div className="mt-3">
          <FieldLabel>{cityLabel}</FieldLabel>
          <FilterSelect
            name="city"
            value={values.city}
            placeholder={cityPlaceholder}
            options={cities}
            onChange={(city) => update("city", city)}
          />
        </div>
        <div className="mt-3">
          <FieldLabel>{districtLabel}</FieldLabel>
          <FilterSelect
            name="district"
            value={values.district}
            placeholder={districtPlaceholder}
            options={districts}
            disabled={!values.city || districtsLoading}
            onChange={(district) => update("district", district)}
          />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-bold text-navy">{propertyTypeTitle}</h2>
        <div className="mt-3">
          <FilterSelect
            name="propertyType"
            value={values.propertyType}
            placeholder={propertyTypePlaceholder}
            options={propertyTypeOptions}
            clearable
            onChange={(propertyType) => update("propertyType", propertyType)}
          />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-bold text-navy">{roomsTitle}</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Input
            name="bedrooms"
            inputMode="numeric"
            autoComplete="off"
            value={values.bedrooms}
            aria-label="Chambres"
            onChange={(event) => update("bedrooms", event.target.value)}
          />
          <Input
            name="bathrooms"
            inputMode="numeric"
            autoComplete="off"
            value={values.bathrooms}
            placeholder={bathroomsPlaceholder}
            aria-label={bathroomsPlaceholder}
            onChange={(event) => update("bathrooms", event.target.value)}
          />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-bold text-navy">{budgetTitle}</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Input
            name="budgetMin"
            inputMode="numeric"
            autoComplete="off"
            value={values.budgetMin}
            placeholder={budgetMinPlaceholder}
            aria-label={budgetMinPlaceholder}
            onChange={(event) => update("budgetMin", event.target.value)}
          />
          <Input
            name="budgetMax"
            inputMode="numeric"
            autoComplete="off"
            value={values.budgetMax}
            placeholder={budgetMaxPlaceholder}
            aria-label={budgetMaxPlaceholder}
            onChange={(event) => update("budgetMax", event.target.value)}
          />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-bold text-navy">{depositTitle}</h2>
        <div className="mt-3">
          <Input
            name="depositMonths"
            inputMode="numeric"
            autoComplete="off"
            value={values.depositMonths}
            placeholder={depositPlaceholder}
            aria-label={depositPlaceholder}
            onChange={(event) => update("depositMonths", event.target.value)}
          />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-bold text-navy">{parkingTitle}</h2>
        <div className="mt-3">
          <Input
            name="parking"
            inputMode="numeric"
            autoComplete="off"
            value={values.parking}
            placeholder={parkingPlaceholder}
            aria-label={parkingPlaceholder}
            onChange={(event) => update("parking", event.target.value)}
          />
        </div>
      </section>

      <Button type="submit" disabled={isPending} className="mt-6 px-6">
        {submitLabel}
      </Button>
    </form>
  )
}

export { LeftSideCatalogFiltering }
