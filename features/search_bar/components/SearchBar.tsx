"use client"

import { useMemo, useRef, useState, type FormEvent } from "react"

import Modal from "@/components/ui/Modal"
import LeftSideCatalogFiltering from "@/features/catalog/components/LeftSideCatalogFiltering"
import type { LeftSideCatalogFilteringValues } from "@/features/properties/types"
import type { SearchBarProps } from "@/features/search_bar/types"
import { cn } from "@/lib/cn"

function countActiveFilters(values?: Partial<LeftSideCatalogFilteringValues>) {
  if (!values) {
    return 0
  }

  return [
    values.city ? 1 : 0,
    values.district ? 1 : 0,
    values.propertyType ? 1 : 0,
    values.bedrooms ? 1 : 0,
    values.bathrooms ? 1 : 0,
    values.budgetMin || values.budgetMax ? 1 : 0,
    values.depositMonths ? 1 : 0,
    values.parking ? 1 : 0,
  ].reduce((total, count) => total + count, 0)
}

type SpeechRecognitionLike = {
  lang: string
  interimResults: boolean
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 shrink-0 text-primary">
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0 text-primary">
      <rect x="9" y="3.5" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M6.5 11a5.5 5.5 0 0 0 11 0M12 16.5v3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function FiltersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0 text-navy">
      <path d="M4 7h16M7 12h10M9.5 17h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="9" cy="7" r="1.6" fill="currentColor" />
      <circle cx="15" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="17" r="1.6" fill="currentColor" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0">
      <path
        d="M5 12h13M13.5 6.5 19 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function getSpeechRecognition() {
  if (typeof window === "undefined") {
    return null
  }

  const SpeechRecognitionCtor =
    (
      window as Window & {
        SpeechRecognition?: new () => SpeechRecognitionLike
        webkitSpeechRecognition?: new () => SpeechRecognitionLike
      }
    ).SpeechRecognition ??
    (
      window as Window & {
        webkitSpeechRecognition?: new () => SpeechRecognitionLike
      }
    ).webkitSpeechRecognition

  return SpeechRecognitionCtor ? new SpeechRecognitionCtor() : null
}

export default function SearchBar({
  name = "q",
  action,
  placeholder = "Où souhaitez-vous habiter ? Ex: Lomé, Tokoin...",
  defaultValue = "",
  filterCount,
  country,
  transaction = "locations-immobilieres",
  filtering,
  className,
  onSearch,
  onFiltersClick,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState(defaultValue)
  const [listening, setListening] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filteringForm = useMemo(() => {
    if (filtering) {
      return filtering
    }

    if (!country) {
      return null
    }

    return {
      country,
      transaction,
      cityOptions: [],
      districtOptions: [],
      propertyTypeOptions: [],
    }
  }, [country, filtering, transaction])
  const appliedFilterCount =
    filterCount ?? countActiveFilters(filteringForm?.defaultValues)

  function openFilters() {
    onFiltersClick?.()

    if (filteringForm) {
      setFiltersOpen(true)
    }
  }

  function closeFilters() {
    setFiltersOpen(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!filteringForm && !onSearch) {
      return
    }

    event.preventDefault()
    onSearch?.(query.trim())
    openFilters()
  }

  function handleInputActivate() {
    openFilters()
  }

  function startVoiceSearch() {
    const recognition = getSpeechRecognition()

    if (!recognition) {
      return
    }

    recognition.lang = "fr-FR"
    recognition.interimResults = false
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim()
      if (transcript) {
        setQuery(transcript)
        inputRef.current?.focus()
      }
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)

    setListening(true)
    recognition.start()
  }

  return (
    <form
      action={action}
      method="get"
      onSubmit={handleSubmit}
      className={cn(
        "flex w-3/5 flex-col gap-3 rounded-[28px] border border-primary/10 bg-hero-search p-3 shadow-[0_10px_40px_rgb(26_160_224_/_0.12)]",
        "sm:flex-row sm:items-center sm:rounded-full sm:py-2 sm:pl-5 sm:pr-2",
        className,
      )}
    >
      <label
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 px-2 sm:px-0"
        onClick={handleInputActivate}
      >
        <SearchIcon />
        <span className="sr-only">Recherche de lieu</span>
        <input
          ref={inputRef}
          type="search"
          name={name}
          value={query}
          readOnly
          aria-haspopup="dialog"
          aria-expanded={filtersOpen}
          aria-controls="search-bar-filters"
          placeholder={placeholder}
          onChange={(event) => setQuery(event.target.value)}
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleInputActivate}
          onFocus={handleInputActivate}
          className="h-11 w-full min-w-0 cursor-pointer border-0 bg-transparent text-sm text-navy outline-none placeholder:text-muted sm:h-10 sm:text-[15px]"
        />
      </label>

      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
        <button
          type="button"
          onClick={startVoiceSearch}
          aria-pressed={listening}
          className={cn(
            "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-white px-3.5 text-sm text-navy",
            "hover:border-primary/40 hover:bg-primary-soft/40",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "sm:h-10 sm:flex-none",
            listening && "border-primary bg-primary-soft/50",
          )}
        >
          <span
            className={cn(
              "size-2 shrink-0 rounded-full bg-primary",
              listening && "animate-pulse",
            )}
            aria-hidden="true"
          />
          <MicIcon />
          <span className="whitespace-nowrap">Recherche vocale</span>
        </button>

        <button
          type="button"
          onClick={openFilters}
          aria-haspopup="dialog"
          aria-expanded={filtersOpen}
          aria-controls="search-bar-filters"
          className="relative inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-white px-3.5 text-sm text-navy hover:border-primary/40 hover:bg-primary-soft/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-10 sm:flex-none"
        >
          <FiltersIcon />
          <span>Filtres</span>
          {appliedFilterCount > 0 ? (
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white">
              {appliedFilterCount}
            </span>
          ) : null}
        </button>

        <button
          type="submit"
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-11 sm:flex-none sm:px-6"
        >
          Rechercher
          <ArrowIcon />
        </button>
      </div>

      {filteringForm ? (
        <Modal
          open={filtersOpen}
          onClose={closeFilters}
          size="lg"
          title="Affiner votre recherche"
          description="Choisissez le type de bien, le quartier et votre budget pour lancer la recherche."
          closeLabel="Fermer les filtres"
          className="max-h-[90vh] overflow-y-auto"
        >
          <div id="search-bar-filters">
            <LeftSideCatalogFiltering
              {...filteringForm}
              country={country ?? filteringForm.country}
              transaction={transaction ?? filteringForm.transaction}
              className="border-0 bg-transparent p-0 shadow-none"
              onSubmit={(values) => {
                closeFilters()
                filteringForm.onSubmit?.(values)
                const nextQuery =
                  values.district ||
                  values.city ||
                  values.propertyType ||
                  query.trim()
                if (nextQuery) {
                  setQuery(nextQuery)
                }
                onSearch?.(nextQuery)
              }}
            />
          </div>
        </Modal>
      ) : null}
    </form>
  )
}
