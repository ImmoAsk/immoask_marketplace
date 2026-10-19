"use client"

import { useState } from "react"

import type { PropertyMediaKind } from "@/features/catalog/resolvePropertyMedia"

type PropertyImageProps = {
  src: string
  alt: string
  kind?: PropertyMediaKind
}

export default function PropertyImage({
  src,
  alt,
  kind = "image",
}: PropertyImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className="flex aspect-[16/10] items-center justify-center bg-primary-soft text-sm font-medium text-primary"
        aria-hidden="true"
      >
        ImmoAsk
      </div>
    )
  }

  if (kind === "video") {
    return (
      <video
        src={src}
        className="aspect-[16/10] w-full object-cover"
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
        aria-label={alt}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className="aspect-[16/10] w-full object-cover"
      onError={() => setFailed(true)}
    />
  )
}
