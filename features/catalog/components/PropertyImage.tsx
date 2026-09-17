"use client"

import { useState } from "react"

type PropertyImageProps = {
  src: string
  alt: string
}

export default function PropertyImage({ src, alt }: PropertyImageProps) {
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

  return (
    <img
      src={src}
      alt={alt}
      className="aspect-[16/10] w-full object-cover"
      onError={() => setFailed(true)}
    />
  )
}
