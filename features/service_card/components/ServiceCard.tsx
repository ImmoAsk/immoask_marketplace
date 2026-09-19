import Link from "next/link"

import { cn } from "@/lib/cn"
import type { ServiceCardProps } from "@/features/service_card/types"

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0 text-subtle"
    >
      <path
        d="M9 6.5 15.5 12 9 17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ServiceCard({
  icon,
  title,
  subtitle,
  href,
  onClick,
  className,
}: ServiceCardProps) {
  const classNames = cn(
    "flex w-full items-center gap-4 rounded-[22px] bg-white px-4 py-3.5 shadow-[0_8px_28px_rgb(11_31_58_/_0.08)]",
    "transition-shadow hover:shadow-[0_10px_32px_rgb(11_31_58_/_0.12)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    className,
  )

  const content = (
    <>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary [&>svg]:size-5">
        {icon}
      </span>

      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-base font-bold tracking-tight text-navy">
          {title}
        </span>
        <span className="mt-0.5 block truncate text-sm leading-snug text-muted">
          {subtitle}
        </span>
      </span>

      <ChevronIcon />
    </>
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classNames}>
        {content}
      </button>
    )
  }

  if (href) {
    return (
      <Link href={href} className={classNames}>
        {content}
      </Link>
    )
  }

  return <div className={classNames}>{content}</div>
}

export { ServiceCard }
