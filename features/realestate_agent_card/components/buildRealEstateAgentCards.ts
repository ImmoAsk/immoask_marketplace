import { resolveAccountAvatar } from "@/features/account/session"
import type { RealEstateAgentCardProps } from "@/features/realestate_agent_card/types"
import type { TopRealEstateAgent } from "@/lib/api/types"

function toAgentDisplayName(name: string | null, fallbackIndex: number) {
  const value = name?.trim()

  if (!value) {
    return `Agent ImmoAsk ${fallbackIndex + 1}`
  }

  return value
}

function toAgentLocation(agent: TopRealEstateAgent) {
  const districts = [...agent.quartiers_couverts]
    .filter((district) => district.denomination?.trim())
    .sort((left, right) => right.nombre_biens - left.nombre_biens)
    .slice(0, 2)
    .map((district) => district.denomination!.trim())

  if (districts.length === 0) {
    return undefined
  }

  return districts.join(" · ")
}

function toAgentRole(nombreBiens: number) {
  if (nombreBiens <= 0) {
    return "Conseiller immobilier"
  }

  return nombreBiens > 1
    ? `${nombreBiens} biens gérés`
    : "1 bien géré"
}

export function toRealEstateAgentCard(
  agent: TopRealEstateAgent,
  countryCode: string,
  index = 0,
): RealEstateAgentCardProps {
  return {
    id: agent.id,
    name: toAgentDisplayName(agent.name, index),
    role: toAgentRole(agent.nombre_biens),
    location: toAgentLocation(agent),
    photo: resolveAccountAvatar(agent.avatar),
    href: `/${countryCode.toLowerCase()}/catalog`,
  }
}

export function toRealEstateAgentCards(
  agents: TopRealEstateAgent[],
  countryCode: string,
): RealEstateAgentCardProps[] {
  return agents.map((agent, index) =>
    toRealEstateAgentCard(agent, countryCode, index),
  )
}
