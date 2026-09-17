import { cn } from "@/lib/cn"
import type { PropertyDetailDescriptionCalloutProps } from "@/features/properties/types"

function BoltIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0 text-primary"
    >
      <path
        d="M13.5 3.5 6.8 13.2h5.2L10.5 20.5l6.7-9.7h-5.2L13.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function PropertyDetailDescriptionCallout({
  icon = "bolt",
  title,
  description,
  className,
}: PropertyDetailDescriptionCalloutProps) {
  return (
    <aside
      className={cn(
        "flex items-start gap-3 rounded-xl bg-surface px-4 py-3.5",
        className,
      )}
    >
      {icon === "bolt" ? (
        <span className="mt-0.5">
          <BoltIcon />
        </span>
      ) : null}

      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </aside>
  )
}

export { PropertyDetailDescriptionCallout }
