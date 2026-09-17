import { cn } from "@/lib/cn"
import type { PropertyDetailLocationLandmarkProps } from "@/features/properties/types"

function NavigationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0 text-primary"
    >
      <path
        d="M12 3.5 19.5 19.2 12 15.5 4.5 19.2 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function PropertyDetailLocationLandmark({
  title = "Point repère ImmoAsk",
  description,
  className,
}: PropertyDetailLocationLandmarkProps) {
  return (
    <aside
      className={cn(
        "max-w-md rounded-xl bg-white px-4 py-3.5 shadow-card",
        className,
      )}
    >
      <p className="flex items-center gap-2 text-sm font-bold text-navy">
        <NavigationIcon />
        <span>{title}</span>
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
    </aside>
  )
}

export { PropertyDetailLocationLandmark }
