import type { RealEstateAgentCardProps } from "@/features/realestate_agent_card/types"

export const ANNUAIRE_PAGE_SIZE = 10
export const ANNUAIRE_FETCH_LIMIT = 40

export type AnnuaireAgent = RealEstateAgentCardProps & {
  districts: string[]
}

export type AnnuaireProps = {
  countryCode: string
  countryName: string
  agents: AnnuaireAgent[]
}
