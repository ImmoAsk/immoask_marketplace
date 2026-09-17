import { cn } from "@/lib/cn"
import type { PropertyDetailConditionProps } from "@/features/properties/types"

function ContractIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 shrink-0 text-primary"
    >
      <path
        d="M7.5 3.5h6.2L18.5 8.3V20a1.5 1.5 0 0 1-1.5 1.5H7.5A1.5 1.5 0 0 1 6 20V5a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 3.5V8h4.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="10.2" cy="14.2" r="2.1" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.3 14.2h1.8M10.2 13.3v1.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function PropertyDetailCondition({
  title = "Conditions financières & Juridiques du bail",
  items,
  className,
}: PropertyDetailConditionProps) {
  if (items.length === 0) {
    return null
  }

  const columnSize = Math.ceil(items.length / 2)

  return (
    <section
      className={cn(
        "rounded-2xl bg-white p-5 shadow-card sm:p-6",
        className,
      )}
      aria-labelledby="property-detail-condition-title"
    >
      <h2
        id="property-detail-condition-title"
        className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-navy"
      >
        <ContractIcon />
        {title}
      </h2>

      <dl
        className="mt-5 grid grid-cols-1 md:grid-cols-2 md:grid-flow-col md:gap-x-10"
        style={{ gridTemplateRows: `repeat(${columnSize}, auto)` }}
      >
        {items.map((item, index) => {
          const isLastInColumn =
            index === columnSize - 1 || index === items.length - 1

          return (
            <div
              key={`${item.label}-${index}`}
              className={cn(
                "flex items-baseline justify-between gap-4 py-3",
                !isLastInColumn && "border-b border-border",
              )}
            >
              <dt className="min-w-0 text-sm text-muted">{item.label}</dt>
              <dd
                className={cn(
                  "max-w-[58%] text-right text-sm leading-snug font-semibold text-navy",
                  item.emphasized && "text-base font-bold text-primary",
                )}
              >
                {item.value}
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

export { PropertyDetailCondition }
