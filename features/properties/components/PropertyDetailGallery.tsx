"use client"

import { useEffect, useId, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/cn"
import type {
  PropertyDetailGalleryProps,
  PropertyGalleryBadge,
  PropertyGalleryBadgeVariant,
  PropertyGalleryImage,
} from "@/features/properties/types"

const PREVIEW_COUNT = 4
const MOBILE_PREVIEW_COUNT = 2

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-3.5 shrink-0"
    >
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-3.5 shrink-0">
      <circle cx="10" cy="10" r="8" fill="currentColor" className="text-primary" />
      <path
        d="M6.6 10.2 8.8 12.4 13.4 7.7"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GalleryStackIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
    >
      <rect
        x="3.5"
        y="6.5"
        width="14"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8 6.5V5.2A1.7 1.7 0 0 1 9.7 3.5h9.1A1.7 1.7 0 0 1 20.5 5.2v9.1a1.7 1.7 0 0 1-1.7 1.7H17"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d={direction === "prev" ? "M15 5.5 8.5 12 15 18.5" : "M9 5.5 15.5 12 9 18.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function resolveBadgeVariant(
  badge: PropertyGalleryBadge,
): PropertyGalleryBadgeVariant {
  if (badge.variant) {
    return badge.variant
  }

  const label = badge.label.toLowerCase()

  if (label.includes("vérif") || label.includes("verif")) {
    return "verified"
  }

  if (label.includes("exclus")) {
    return "exclusive"
  }

  return "default"
}

const badgeClassNames: Record<PropertyGalleryBadgeVariant, string> = {
  verified: "bg-white/95 text-navy shadow-sm",
  exclusive: "bg-navy/90 text-white",
  default: "bg-white/95 text-navy shadow-sm",
}

function seeMoreOverlayClass(index: number, secondaryCount: number) {
  const lastMobileIndex = Math.min(secondaryCount, MOBILE_PREVIEW_COUNT) - 1
  const lastDesktopIndex = secondaryCount - 1
  const isMobileSeeMore = index === lastMobileIndex
  const isDesktopSeeMore = index === lastDesktopIndex

  if (isMobileSeeMore && isDesktopSeeMore) {
    return "flex"
  }

  if (isMobileSeeMore) {
    return "flex lg:hidden"
  }

  if (isDesktopSeeMore) {
    return "hidden lg:flex"
  }

  return "hidden"
}

function GalleryImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={cn(
          "flex size-full items-center justify-center bg-primary-soft text-sm font-medium text-primary",
          className,
        )}
        aria-hidden="true"
      >
        ImmoAsk
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("size-full object-cover", className)}
      onError={() => setFailed(true)}
    />
  )
}

function GalleryTile({
  image,
  onClick,
  ariaLabel,
  className,
  children,
}: {
  image: PropertyGalleryImage
  onClick: () => void
  ariaLabel: string
  className?: string
  children?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "relative block overflow-hidden rounded-xl bg-surface text-left",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <GalleryImage src={image.src} alt="" className="absolute inset-0" />
      {children}
    </button>
  )
}

export default function PropertyDetailGallery({
  images,
  title,
  address,
  caption,
  badges = [],
  totalCount,
  viewAllLabel,
  onImageClick,
  onViewAll,
  className,
}: PropertyDetailGalleryProps) {
  const labelId = useId()
  const count = totalCount ?? images.length
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canUsePortal, setCanUsePortal] = useState(false)

  const mainImage = images[0]
  const secondaryImages = images.slice(1, 1 + PREVIEW_COUNT)
  const seeMoreLabel = viewAllLabel ?? `Voir les ${count} photos HD & 360°`

  useEffect(() => {
    setCanUsePortal(true)
  }, [])

  useEffect(() => {
    if (!lightboxOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightboxOpen(false)
        return
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % images.length)
        return
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + images.length) % images.length)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [images.length, lightboxOpen])

  function openAt(index: number) {
    onImageClick?.(index)

    if (onViewAll) {
      onViewAll()
      return
    }

    setActiveIndex(index)
    setLightboxOpen(true)
  }

  if (!mainImage) {
    return (
      <div
        className={cn(
          "flex min-h-64 items-center justify-center rounded-xl bg-primary-soft text-sm font-medium text-primary",
          className,
        )}
        aria-label="Aucune photo disponible"
      >
        ImmoAsk
      </div>
    )
  }

  const lightbox = lightboxOpen && canUsePortal && !onViewAll
    ? createPortal(
        <div className="fixed inset-0 z-[80] flex flex-col bg-navy p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3 text-white">
            <p id={labelId} className="text-sm font-medium">
              {activeIndex + 1} / {images.length}
              {images[activeIndex]?.label ? ` · ${images[activeIndex].label}` : ""}
            </p>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Fermer la galerie"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <CloseIcon />
            </button>
          </div>

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            className="relative flex min-h-0 flex-1 items-center justify-center"
          >
            {images.length > 1 ? (
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((current) => (current - 1 + images.length) % images.length)
                }
                aria-label="Photo précédente"
                className="absolute left-0 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronIcon direction="prev" />
              </button>
            ) : null}

            <img
              src={images[activeIndex]?.src}
              alt={images[activeIndex]?.alt ?? title ?? "Photo du bien"}
              className="max-h-full max-w-full rounded-xl object-contain"
            />

            {images.length > 1 ? (
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current + 1) % images.length)}
                aria-label="Photo suivante"
                className="absolute right-0 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronIcon direction="next" />
              </button>
            ) : null}
          </div>
        </div>,
        document.body,
      )
    : null

  return (
    <div
      className={cn(
        "grid gap-2.5",
        secondaryImages.length > 0
          ? "lg:h-[26rem] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:h-[30rem]"
          : "lg:h-[26rem] xl:h-[30rem]",
        className,
      )}
      aria-label="Galerie photos du bien"
    >
      <GalleryTile
        image={mainImage}
        onClick={() => openAt(0)}
        ariaLabel={mainImage.alt}
        className="min-h-56 aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-0"
      >
        {badges.length > 0 ? (
          <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
            {badges.map((badge) => {
              const variant = resolveBadgeVariant(badge)

              return (
                <span
                  key={badge.label}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                    badgeClassNames[variant],
                  )}
                >
                  {variant === "verified" ? <CheckIcon /> : null}
                  {badge.label}
                </span>
              )
            })}
          </div>
        ) : null}

        {caption || title || address ? (
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-navy/80 via-navy/35 to-transparent px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
            {caption ? (
              <p className="text-[11px] font-semibold tracking-[0.16em] text-white/80 uppercase">
                {caption}
              </p>
            ) : null}
            {title ? (
              <p className="mt-1 text-lg font-bold text-white sm:text-xl">{title}</p>
            ) : null}
            {address ? (
              <p className="mt-1.5 inline-flex min-w-0 items-center gap-1.5 text-sm text-white/85">
                <MapPinIcon />
                <span>{address}</span>
              </p>
            ) : null}
          </div>
        ) : null}
      </GalleryTile>

      {secondaryImages.length > 0 ? (
        <div
          className={cn(
            "grid gap-2.5 lg:h-full",
            secondaryImages.length <= 1
              ? "grid-cols-1"
              : secondaryImages.length === 2
                ? "grid-cols-2 lg:grid-cols-1 lg:grid-rows-2"
                : "grid-cols-2 lg:grid-rows-2",
          )}
        >
          {secondaryImages.map((image, index) => {
            const isDesktopSeeMore = index === secondaryImages.length - 1

            return (
              <GalleryTile
                key={`${image.src}-${index}`}
                image={image}
                onClick={() => openAt(index + 1)}
                ariaLabel={isDesktopSeeMore ? seeMoreLabel : image.alt}
                className={cn(
                  "min-h-28 aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-0",
                  index >= MOBILE_PREVIEW_COUNT && "hidden lg:block",
                )}
              >
                {image.label ? (
                  <span className="absolute bottom-2.5 left-2.5 z-10 rounded-full bg-navy/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {image.label}
                  </span>
                ) : null}

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 z-10 flex-col items-center justify-center bg-navy/65 px-3 text-center text-white",
                    seeMoreOverlayClass(index, secondaryImages.length),
                  )}
                >
                  <GalleryStackIcon />
                  <span className="mt-2 text-sm font-semibold">{seeMoreLabel}</span>
                </span>
              </GalleryTile>
            )
          })}
        </div>
      ) : null}

      {lightbox}
    </div>
  )
}

export { PropertyDetailGallery }
