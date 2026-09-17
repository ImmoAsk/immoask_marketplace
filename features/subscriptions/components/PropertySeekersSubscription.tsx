"use client"

import Button from "@/components/ui/Button"
import type { PropertySeekersSubscriptionProps } from "@/features/subscriptions/types"

import { buildPropertySeekersSubscription } from "./buildPropertySeekersSubscription"
import TemplateSubscription from "./TemplateSubscription"

export default function PropertySeekersSubscription({
  selectedColumnId,
  onSelectColumn,
  continueLabel = "Continuer",
  continueDisabled = false,
  onContinue,
  columns,
  className,
  footer,
  ...props
}: PropertySeekersSubscriptionProps = {}) {
  const defaults = buildPropertySeekersSubscription()
  const selectable = Boolean(onSelectColumn)
  const sourceColumns = columns ?? defaults.columns
  const nextColumns = selectable
    ? sourceColumns.map((column, index) => {
        const columnId = column.id ?? `${column.lightTitle}-${index}`

        return {
          ...column,
          highlighted: false,
          selected: columnId === selectedColumnId,
          ctaHref: undefined,
          ctaLabel: column.ctaLabel ?? `Choisir ${column.lightTitle}`,
          onSelect: () => onSelectColumn?.(columnId),
        }
      })
    : sourceColumns

  return (
    <TemplateSubscription
      {...defaults}
      {...props}
      className={className}
      columns={nextColumns}
      selectedColumnId={selectedColumnId}
      onSelectColumn={onSelectColumn}
      footer={
        footer ??
        (onContinue ? (
          <Button
            type="button"
            size="lg"
            className="w-full max-w-md"
            disabled={continueDisabled}
            onClick={onContinue}
          >
            {continueLabel}
          </Button>
        ) : null)
      }
    />
  )
}

export { PropertySeekersSubscription }
