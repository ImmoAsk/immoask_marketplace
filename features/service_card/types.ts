import type { ReactNode } from "react"

export type ServiceCardProps = {
  icon: ReactNode
  title: string
  subtitle: string
  href?: string
  className?: string
}
