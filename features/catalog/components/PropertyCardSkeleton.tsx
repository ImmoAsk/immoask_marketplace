import Skeleton from "@/components/ui/Skeleton"
import { cn } from "@/lib/cn"

type PropertyCardSkeletonProps = {
  className?: string
}

export default function PropertyCardSkeleton({
  className,
}: PropertyCardSkeletonProps) {
  return (
    <article
      className={cn(
        "h-full overflow-hidden rounded-3xl bg-white shadow-[0_10px_36px_rgb(11_31_58_/_0.08)]",
        className,
      )}
    >
      <Skeleton className="aspect-[16/10] w-full rounded-none" />

      <div className="flex flex-col gap-2.5 px-5 pt-5 pb-0">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-40" />

        <div className="mt-1.5 flex items-center justify-evenly border-t border-border py-3.5">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </article>
  )
}

export { PropertyCardSkeleton }
