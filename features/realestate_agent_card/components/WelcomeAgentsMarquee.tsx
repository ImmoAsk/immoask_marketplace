"use client"

import { startTransition, useEffect, useState } from "react"

import Skeleton from "@/components/ui/Skeleton"
import { toRealEstateAgentCards } from "@/features/realestate_agent_card/components/buildRealEstateAgentCards"
import type {
  RealEstateAgentCardProps,
  WelcomeAgentsMarqueeProps,
} from "@/features/realestate_agent_card/types"
import {
  DEFAULT_TOP_AGENTS_LIMIT,
  getTopRealEstateAgents,
} from "@/lib/api/statistics"
import { cn } from "@/lib/cn"

import RealEstateAgentMarquee from "./RealEstateAgentMarquee"

const INITIAL_AGENTS_LIMIT = 8
const SKELETON_COUNT = 4

function AgentsMarqueeSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Chargement des agents immobiliers</span>
      <div className="flex w-max gap-4 pr-4">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <div
            key={index}
            className="flex w-64 shrink-0 items-center gap-3 rounded-[22px] bg-white px-4 py-3.5 shadow-[0_8px_28px_rgb(11_31_58_/_0.08)]"
          >
            <Skeleton className="size-14 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="mt-2 h-3 w-20" />
              <Skeleton className="mt-2 h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function WelcomeAgentsMarquee({
  countryCode,
  className,
  initialLimit = INITIAL_AGENTS_LIMIT,
  fullLimit = DEFAULT_TOP_AGENTS_LIMIT,
}: WelcomeAgentsMarqueeProps) {
  const [agents, setAgents] = useState<RealEstateAgentCardProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const code = countryCode.toLowerCase()

    async function loadProgressively() {
      setLoading(true)

      const firstBatch = getTopRealEstateAgents({ limit: initialLimit })
        .then((items) => {
          if (cancelled || items.length === 0) {
            return
          }

          startTransition(() => {
            setAgents(toRealEstateAgentCards(items, code))
            setLoading(false)
          })
        })
        .catch(() => {
          // Keep waiting for the full batch when the fast path fails.
        })

      const fullBatch = getTopRealEstateAgents({ limit: fullLimit })
        .then((items) => {
          if (cancelled) {
            return
          }

          startTransition(() => {
            setAgents(toRealEstateAgentCards(items, code))
            setLoading(false)
          })
        })
        .catch(() => {
          if (!cancelled) {
            setLoading(false)
          }
        })

      await Promise.allSettled([firstBatch, fullBatch])
    }

    void loadProgressively()

    return () => {
      cancelled = true
    }
  }, [countryCode, fullLimit, initialLimit])

  if (loading && agents.length === 0) {
    return <AgentsMarqueeSkeleton className={className} />
  }

  if (agents.length === 0) {
    return null
  }

  return <RealEstateAgentMarquee agents={agents} className={className} />
}

export { WelcomeAgentsMarquee }
