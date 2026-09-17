import type { ReactNode } from "react"
import type {
  FurnishedBookingProperty,
  FurnishedBookingUser,
  ReservationApi,
  ReservationInput,
  SaveFurnishedBookingInput,
  SaveFurnishedBookingResult,
  SaveFurnishedBookingVariables,
  SaveVisitTourInput,
  SaveVisitTourResult,
  SaveVisitTourVariables,
  VisitApi,
  VisitTourProperty,
  VisitTourUser,
  VisiteInput,
} from "@/lib/api/types"

export type {
  FurnishedBookingProperty,
  FurnishedBookingUser,
  ReservationApi,
  ReservationInput,
  SaveFurnishedBookingInput,
  SaveFurnishedBookingResult,
  SaveFurnishedBookingVariables,
  SaveVisitTourInput,
  SaveVisitTourResult,
  SaveVisitTourVariables,
  VisitApi,
  VisitTourProperty,
  VisitTourUser,
  VisiteInput,
}

export const FEEDBACK_STATUSES = ["success", "failure"] as const

export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number]

export const FEEDBACK_ILLUSTRATIONS: Record<FeedbackStatus, string> = {
  success: "/images/feedbacks/success.png",
  failure: "/images/feedbacks/failure.png",
}

export type FeedbackIllustrationProps = {
  status: FeedbackStatus
  alt?: string
  className?: string
}

export type FeedbackProps = {
  status: FeedbackStatus
  title: string
  subtitle: string
  image_illustration: ReactNode
  actionLabel?: string
  onAction?: () => void
  secondaryActionLabel?: string
  onSecondaryAction?: () => void
  className?: string
}
