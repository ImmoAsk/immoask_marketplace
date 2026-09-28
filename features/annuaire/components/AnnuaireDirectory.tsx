"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import RealEstateAgentCard from "@/features/realestate_agent_card/components/RealEstateAgentCard"
import { ANNUAIRE_PAGE_SIZE, type AnnuaireAgent } from "@/features/annuaire/types"
import { cn } from "@/lib/cn"
import { countries } from "@/lib/routing/countries"

type AnnuaireDirectoryProps = {
  countryCode: string
  agents: AnnuaireAgent[]
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0 text-primary">
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

const fieldClassName = cn(
  "h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-navy shadow-sm",
  "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
)

export default function AnnuaireDirectory({
  countryCode,
  agents,
}: AnnuaireDirectoryProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("")
  const [page, setPage] = useState(1)

  const cities = useMemo(() => {
    const names = new Set<string>()

    for (const agent of agents) {
      for (const district of agent.districts) {
        names.add(district)
      }
    }

    return [...names].sort((left, right) => left.localeCompare(right, "fr"))
  }, [agents])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()

    return agents.filter((agent) => {
      const matchesQuery =
        !needle ||
        agent.name.toLowerCase().includes(needle) ||
        agent.location?.toLowerCase().includes(needle) ||
        agent.role?.toLowerCase().includes(needle)
      const matchesCity = !city || agent.districts.includes(city)

      return matchesQuery && matchesCity
    })
  }, [agents, city, query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / ANNUAIRE_PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice(
    (currentPage - 1) * ANNUAIRE_PAGE_SIZE,
    currentPage * ANNUAIRE_PAGE_SIZE,
  )

  function updateQuery(value: string) {
    setQuery(value)
    setPage(1)
  }

  function updateCity(value: string) {
    setCity(value)
    setPage(1)
  }

  return (
    <div>
      <form
        className="grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(10rem,0.7fr)_minmax(10rem,0.7fr)]"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="relative block">
          <span className="sr-only">Mots clés</span>
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Mots clés"
            className={cn(fieldClassName, "pl-9")}
          />
        </label>

        <label className="block">
          <span className="sr-only">Pays</span>
          <select
            value={countryCode}
            onChange={(event) => router.push(`/${event.target.value}/annuaire`)}
            className={fieldClassName}
          >
            {Object.values(countries).map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Villes</span>
          <select
            value={city}
            onChange={(event) => updateCity(event.target.value)}
            className={fieldClassName}
          >
            <option value="">Toutes les villes</option>
            {cities.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </form>

      {visible.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {visible.map((agent) => (
            <li key={agent.id ?? agent.name}>
              <RealEstateAgentCard
                {...agent}
                className="!w-full !shrink"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-2xl bg-white px-5 py-10 text-center text-sm text-muted shadow-card">
          Aucun professionnel ne correspond à votre recherche.
        </p>
      )}

      {pageCount > 1 ? (
        <nav
          aria-label="Pagination de l'annuaire"
          className="mt-8 flex flex-wrap items-center justify-end gap-2"
        >
          {Array.from({ length: pageCount }, (_, index) => {
            const number = index + 1
            const selected = number === currentPage

            return (
              <button
                key={number}
                type="button"
                aria-current={selected ? "page" : undefined}
                onClick={() => setPage(number)}
                className={cn(
                  "inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-semibold",
                  selected
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-navy hover:border-primary/40",
                )}
              >
                {number}
              </button>
            )
          })}
          <button
            type="button"
            disabled={currentPage >= pageCount}
            onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-semibold text-navy hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Suivant
          </button>
        </nav>
      ) : null}
    </div>
  )
}

export { AnnuaireDirectory }
