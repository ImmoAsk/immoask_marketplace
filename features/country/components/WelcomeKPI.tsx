import type { ReactNode } from "react"

import { cn } from "@/lib/cn"

export type WelcomeKPIItem = {
  icon: ReactNode
  title: string
  number: string
}

export type WelcomeKPIProps = {
  items: WelcomeKPIItem[]
  className?: string
}

export default function WelcomeKPI({ items, className }: WelcomeKPIProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <ul
      className={cn(
        "grid w-full grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4",
        className,
      )}
    >
      {items.map((item, index) => (
        <li
          key={item.title}
          className="listing-reveal min-w-0 text-left"
          style={{ animationDelay: `${index * 90}ms` }}
        >
          <span className="flex size-8 items-center justify-center rounded-xl bg-primary-soft text-primary [&>svg]:size-4">
            {item.icon}
          </span>
          <p className="mt-1.5 text-xl font-bold tracking-tight text-navy sm:text-2xl">
            {item.number}
          </p>
          <p className="mt-1 text-sm leading-snug text-navy/70">{item.title}</p>
        </li>
      ))}
    </ul>
  )
}

export { WelcomeKPI }
