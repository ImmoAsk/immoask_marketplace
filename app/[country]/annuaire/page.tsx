import type { Metadata } from "next"
import { notFound } from "next/navigation"

import Annuaire from "@/features/annuaire/components/Annuaire"
import { buildAnnuaireMetadata } from "@/features/annuaire/components/buildAnnuaireMetadata"
import { ANNUAIRE_FETCH_LIMIT } from "@/features/annuaire/types"
import { toRealEstateAgentCard } from "@/features/realestate_agent_card/components/buildRealEstateAgentCards"
import { getTopRealEstateAgents } from "@/lib/api/statistics"
import type { TopRealEstateAgent } from "@/lib/api/types"
import { countries, getCountry } from "@/lib/routing/countries"

import type { AnnuairePageProps } from "./types"

export function generateStaticParams() {
  return Object.keys(countries).map((country) => ({ country }))
}

export async function generateMetadata({
  params,
}: AnnuairePageProps): Promise<Metadata> {
  const { country: code } = await params
  const country = getCountry(code)

  if (!country) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return buildAnnuaireMetadata({
    countryCode: country.code,
    countryName: country.name,
  })
}

function toAnnuaireAgent(agent: TopRealEstateAgent, countryCode: string, index: number) {
  return {
    ...toRealEstateAgentCard(agent, countryCode, index),
    districts: agent.quartiers_couverts
      .map((district) => district.denomination?.trim())
      .filter((name): name is string => Boolean(name)),
  }
}

export default async function AnnuairePage({ params }: AnnuairePageProps) {
  const { country: code } = await params
  const country = getCountry(code)

  if (!country) {
    notFound()
  }

  let agents: TopRealEstateAgent[] = []

  try {
    agents = await getTopRealEstateAgents({ limit: ANNUAIRE_FETCH_LIMIT })
  } catch {
    agents = []
  }

  return (
    <Annuaire
      countryCode={country.code}
      countryName={country.name}
      agents={agents.map((agent, index) =>
        toAnnuaireAgent(agent, country.code, index),
      )}
    />
  )
}
