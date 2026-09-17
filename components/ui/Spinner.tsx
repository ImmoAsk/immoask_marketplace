import { cn } from "@/lib/cn"

const sizes = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
} as const

export type SpinnerProps = {
  size?: keyof typeof sizes
  label?: string
  className?: string
}

export default function Spinner({
  size = "md",
  label = "Chargement",
  className,
}: SpinnerProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("animate-spin text-primary", sizes[size], className)}
      role="status"
      aria-label={label}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        className="stroke-current opacity-20"
        strokeWidth="2.4"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        className="stroke-current"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
