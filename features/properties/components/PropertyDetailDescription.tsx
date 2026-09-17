import type { ReactNode } from "react"

import { cn } from "@/lib/cn"
import type { PropertyDetailDescriptionProps } from "@/features/properties/types"

import PropertyDetailDescriptionCallout from "./PropertyDetailDescriptionCallout"

function DocumentIcon() {
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
      <path
        d="M9 12.5h6M9 16h4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

function renderInlineMarkup(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((token, index) => {
    const bold =
      token.match(/^\*\*([^*]+)\*\*$/) ?? token.match(/^\*([^*]+)\*$/)

    if (bold) {
      return (
        <strong key={index} className="font-semibold text-navy">
          {bold[1]}
        </strong>
      )
    }

    return token
  })
}

function DescriptionParagraph({ text }: { text: string }) {
  const lines = text.split("\n")

  return (
    <p className="text-[15px] leading-relaxed text-muted">
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {index > 0 ? <br /> : null}
          {renderInlineMarkup(line)}
        </span>
      ))}
    </p>
  )
}

export default function PropertyDetailDescription({
  title = "Description",
  paragraphs,
  callout,
  className,
}: PropertyDetailDescriptionProps) {
  if (paragraphs.length === 0) {
    return null
  }

  return (
    <section
      className={cn(
        "rounded-2xl bg-white p-5 shadow-card sm:p-6",
        className,
      )}
      aria-labelledby="property-detail-description-title"
    >
      <h2
        id="property-detail-description-title"
        className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-navy"
      >
        <DocumentIcon />
        {title}
      </h2>

      <div className="mt-4 flex flex-col gap-3.5">
        {paragraphs.map((paragraph, index) => (
          <DescriptionParagraph key={`${index}-${paragraph.slice(0, 24)}`} text={paragraph} />
        ))}
      </div>

      {callout ? (
        <PropertyDetailDescriptionCallout className="mt-5" {...callout} />
      ) : null}
    </section>
  )
}

export { PropertyDetailDescription }
