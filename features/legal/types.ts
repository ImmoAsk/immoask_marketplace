export type LegalDocumentBreadcrumbItem = {
  label: string
  href?: string
}

export type LegalDocumentSection = {
  title: string
  paragraphs?: string[]
  items?: string[]
  closingParagraphs?: string[]
}

export type LegalDocumentProps = {
  title: string
  updatedLabel?: string
  intro?: string
  sections: LegalDocumentSection[]
  breadcrumb?: LegalDocumentBreadcrumbItem[]
  className?: string
}
