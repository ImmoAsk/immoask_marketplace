import { cn } from "@/lib/cn"
import {
  FEEDBACK_ILLUSTRATIONS,
  type FeedbackIllustrationProps,
} from "@/features/feedbacks/types"

export default function FeedbackIllustration({
  status,
  alt = "",
  className,
}: FeedbackIllustrationProps) {
  return (
    <img
      src={FEEDBACK_ILLUSTRATIONS[status]}
      alt={alt}
      className={cn("mx-auto h-auto w-full max-w-[16rem] object-contain", className)}
    />
  )
}

export { FeedbackIllustration }
