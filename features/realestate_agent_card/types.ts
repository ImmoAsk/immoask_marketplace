export type RealEstateAgentCardProps = {
  id?: string
  name: string
  role?: string
  location?: string
  photo?: string | null
  href?: string
  className?: string
}

export type RealEstateAgentMarqueeProps = {
  agents: RealEstateAgentCardProps[]
  className?: string
}

export type WelcomeAgentsMarqueeProps = {
  countryCode: string
  className?: string
  initialLimit?: number
  fullLimit?: number
}
