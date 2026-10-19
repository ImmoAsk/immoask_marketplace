export type PropertyMediaKind = "image" | "video"

export type PropertyMedia = {
  src: string
  kind: PropertyMediaKind
}

const VIDEO_EXTENSIONS = new Set([
  "mp4",
  "webm",
  "mov",
  "m4v",
  "ogg",
  "ogv",
])

function extensionFromUri(uri?: string | null) {
  if (!uri) {
    return ""
  }

  const path = uri.split("?")[0] ?? uri
  const segment = path.split("/").pop() ?? path
  const parts = segment.split(".")

  if (parts.length < 2) {
    return ""
  }

  return parts[parts.length - 1]?.toLowerCase() ?? ""
}

export function resolvePropertyMediaKind(
  uri?: string | null,
  estImage?: string | null,
): PropertyMediaKind {
  if (estImage?.trim().toLowerCase() === "video") {
    return "video"
  }

  const extension = extensionFromUri(uri)

  if (extension && VIDEO_EXTENSIONS.has(extension)) {
    return "video"
  }

  return "image"
}

export function isPropertyVideoMedia(media: Pick<PropertyMedia, "kind">) {
  return media.kind === "video"
}
