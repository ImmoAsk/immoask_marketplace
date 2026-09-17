"use client"

import { useState, type KeyboardEvent, type ReactNode } from "react"

import { cn } from "@/lib/cn"

export type TabItem = {
  id: string
  label: ReactNode
  disabled?: boolean
}

export type TabsVariant = "line" | "pills"

export type TabsProps = {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onChange?: (id: string) => void
  variant?: TabsVariant
  className?: string
}

export default function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  variant = "line",
  className,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items[0]?.id ?? "",
  )
  const selected = value ?? internalValue

  function select(id: string) {
    if (value === undefined) {
      setInternalValue(id)
    }
    onChange?.(id)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const enabled = items.filter((item) => !item.disabled)
    const currentIndex = enabled.findIndex((item) => item.id === selected)
    const offset =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0

    if (offset === 0 || currentIndex < 0 || enabled.length === 0) {
      return
    }

    event.preventDefault()
    const next =
      enabled[(currentIndex + offset + enabled.length) % enabled.length]
    select(next.id)
    event.currentTarget
      .querySelector<HTMLElement>(`[data-tab-id="${next.id}"]`)
      ?.focus()
  }

  return (
    <div
      role="tablist"
      className={cn(
        variant === "pills"
          ? "grid grid-cols-2 gap-1.5 rounded-[22px] bg-surface p-1.5 sm:flex sm:gap-1 sm:overflow-x-auto sm:rounded-full"
          : "flex gap-6 overflow-x-auto border-b border-border",
        className,
      )}
      onKeyDown={handleKeyDown}
    >
      {items.map((item) => {
        const isSelected = item.id === selected

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            data-tab-id={item.id}
            aria-selected={isSelected}
            disabled={item.disabled}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => select(item.id)}
            className={cn(
              "text-sm font-semibold whitespace-nowrap transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              variant === "pills"
                ? cn(
                    "flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs sm:flex-1 sm:shrink-0 sm:px-4 sm:py-2 sm:text-sm",
                    isSelected
                      ? "bg-white text-primary shadow-sm"
                      : "text-navy hover:text-primary",
                  )
                : cn(
                    "-mb-px border-b-2 pb-3",
                    isSelected
                      ? "border-primary text-primary"
                      : "border-transparent text-muted hover:text-navy",
                  ),
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
