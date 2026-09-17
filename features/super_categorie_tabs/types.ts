export type SuperCategorieTab = {
  id: string
  icon: string
  label: string
  usage: number
  moreLabel: string
}

export type SuperCategorieTabsProps = {
  items?: SuperCategorieTab[]
  value?: string
  defaultValue?: string
  onChange?: (id: string) => void
  className?: string
}
