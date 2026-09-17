import Link from "next/link"

import { cn } from "@/lib/cn"

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ImmoAsk - Accueil"
      className={cn("inline-flex items-center", className)}
    >
      <img
        src="/images/immoask_logo.png"
        alt="ImmoAsk"
        width={472}
        height={183}
        className="h-10 w-auto"
      />
    </Link>
  )
}
