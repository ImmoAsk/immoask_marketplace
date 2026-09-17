import Link from "next/link"

import { cn } from "@/lib/cn"
import type { StatisticCardProps } from "@/features/statistic_card/types"

export default function StatisticCard({
  total,
  title,
  icon_illustration,
  href,
  className,
}: StatisticCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-h-[5.25rem] w-full flex-col items-center justify-center rounded-2xl bg-white px-1.5 py-2.5 shadow-[0_8px_28px_rgb(11_31_58_/_0.08)]",
        "transition-shadow hover:shadow-[0_10px_32px_rgb(11_31_58_/_0.12)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-primary-soft/80 text-navy [&>svg]:size-4">
        {icon_illustration}

        <span className="absolute -top-1.5 -right-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
          {total}
        </span>
      </span>

      <span className="mt-2 max-w-full text-center text-[10px] font-bold leading-tight tracking-tight text-navy sm:text-[11px]">
        {title}
      </span>
    </Link>
  )
}

export { StatisticCard }
