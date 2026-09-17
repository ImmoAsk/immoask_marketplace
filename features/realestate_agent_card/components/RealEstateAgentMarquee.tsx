"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/cn"
import type { RealEstateAgentMarqueeProps } from "@/features/realestate_agent_card/types"

import RealEstateAgentCard from "./RealEstateAgentCard"

export default function RealEstateAgentMarquee({
  agents,
  className,
}: RealEstateAgentMarqueeProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (agents.length === 0) {
    return null
  }

  const loop = [...agents, ...agents]

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max gap-4 pr-4 hover:[animation-play-state:paused] motion-reduce:animate-none",
          ready && "animate-marquee",
        )}
      >
        {loop.map((agent, index) => (
          <RealEstateAgentCard
            key={`${agent.id ?? agent.name}-${agent.location ?? "agent"}-${index}`}
            {...agent}
          />
        ))}
      </div>
    </div>
  )
}

export { RealEstateAgentMarquee }
