"use client"

import Tabs from "@/components/ui/Tabs"
import { cn } from "@/lib/cn"
import type { SuperCategorieTabsProps } from "@/features/super_categorie_tabs/types"

import { DEFAULT_SUPER_CATEGORIE_TABS } from "./buildSuperCategorieTabs"

export default function SuperCategorieTabs({
  items = DEFAULT_SUPER_CATEGORIE_TABS,
  value,
  defaultValue,
  onChange,
  className,
}: SuperCategorieTabsProps) {
  return (
    <Tabs
      variant="pills"
      items={items.map((item) => ({
        id: item.id,
        label: (
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </span>
        ),
      }))}
      value={value}
      defaultValue={defaultValue ?? items[0]?.id}
      onChange={onChange}
      className={cn("w-full", className)}
    />
  )
}

export { SuperCategorieTabs }
