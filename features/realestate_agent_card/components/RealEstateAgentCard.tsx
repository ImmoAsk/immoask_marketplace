import Link from "next/link"

import Avatar from "@/components/ui/Avatar"
import { cn } from "@/lib/cn"
import type { RealEstateAgentCardProps } from "@/features/realestate_agent_card/types"

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-3.5 shrink-0">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="1.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

export default function RealEstateAgentCard({
  name,
  role = "Conseiller immobilier",
  location,
  photo,
  href,
  className,
}: RealEstateAgentCardProps) {
  const classNames = cn(
    "flex w-64 shrink-0 items-center gap-3 rounded-[22px] bg-white px-4 py-3.5 shadow-[0_8px_28px_rgb(11_31_58_/_0.08)]",
    "transition-shadow hover:shadow-[0_10px_32px_rgb(11_31_58_/_0.12)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    className,
  )

  const content = (
    <>
      <Avatar src={photo ?? undefined} name={name} size="lg" />

      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-sm font-bold tracking-tight text-navy">
          {name}
        </span>
        {role ? (
          <span className="mt-0.5 block truncate text-xs text-muted">{role}</span>
        ) : null}
        {location ? (
          <span className="mt-1 flex items-center gap-1 truncate text-xs text-subtle">
            <PinIcon />
            {location}
          </span>
        ) : null}
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classNames}>
        {content}
      </Link>
    )
  }

  return <div className={classNames}>{content}</div>
}

export { RealEstateAgentCard }
