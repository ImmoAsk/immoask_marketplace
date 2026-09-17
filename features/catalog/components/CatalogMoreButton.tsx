import Button from "@/components/ui/Button"
import { cn } from "@/lib/cn"
import type { CatalogMoreButtonProps } from "@/features/catalog/types"

export default function CatalogMoreButton({
  href,
  label,
  className,
}: CatalogMoreButtonProps) {
  return (
    <Button
      href={href}
      variant="outline"
      size="lg"
      className={cn("w-full", className)}
    >
      {label}
      <span aria-hidden="true">→</span>
    </Button>
  )
}

export { CatalogMoreButton }
