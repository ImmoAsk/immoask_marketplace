import { cn } from "@/lib/cn"
import type {
  MarketplaceSubscriptionFeatureIcon,
  MarketplaceSubscriptionFeatureProps,
} from "@/features/properties/types"

function AgentsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <circle cx="9" cy="8.5" r="2.3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4.5 17.5c.4-2.4 2.4-3.8 4.5-3.8s4.1 1.4 4.5 3.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M14.2 13.8c1.8-.2 3.6 1 4.1 3.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function AssistantIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d="M12 4.5 13.2 8.3 17 9.5 13.2 10.7 12 14.5 10.8 10.7 7 9.5 10.8 8.3 12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 14.5 18.2 16.6 20.3 17.3 18.2 18 17.5 20.1 16.8 18 14.7 17.3 16.8 16.6 17.5 14.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function VipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d="M5 8.5h14l-1.4 9.2A1.8 1.8 0 0 1 15.8 19.5H8.2A1.8 1.8 0 0 1 6.4 17.7L5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.5 10 5.5h4L15.5 8.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ICON_TONES: Record<MarketplaceSubscriptionFeatureIcon, string> = {
  agents: "bg-primary-soft text-primary",
  assistant: "bg-warning-soft text-warning",
  vip: "bg-success-soft text-success",
}

function FeatureIcon({ icon }: { icon: MarketplaceSubscriptionFeatureIcon }) {
  if (icon === "assistant") {
    return <AssistantIcon />
  }

  if (icon === "vip") {
    return <VipIcon />
  }

  return <AgentsIcon />
}

export default function MarketplaceSubscriptionFeature({
  icon,
  title,
  description,
  className,
}: MarketplaceSubscriptionFeatureProps) {
  return (
    <li
      className={cn(
        "flex items-start gap-3 rounded-xl bg-surface px-3.5 py-3.5",
        className,
      )}
    >
      <span
        className={cn(
          "mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full",
          ICON_TONES[icon],
        )}
      >
        <FeatureIcon icon={icon} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-navy">{title}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted">
          {description}
        </span>
      </span>
    </li>
  )
}

export { MarketplaceSubscriptionFeature }
