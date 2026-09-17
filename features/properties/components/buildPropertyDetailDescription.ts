import type {
  Property,
  PropertyDetailDescriptionCallout,
  PropertyDetailDescriptionProps,
} from "@/features/properties/types"

const CALLOUT_PATTERN =
  /\b(autonomie|forage|groupe[-\s]?électrogène|chauffe-eau solaire|cuve|citerne)\b/i

function cleanLine(line: string) {
  return line.replace(/^_{2,}\s*/, "• ").trim()
}

function toParagraphs(description: string) {
  return description
    .split(/\n{2,}/)
    .map((block) =>
      block
        .split("\n")
        .map(cleanLine)
        .filter(Boolean)
        .join("\n"),
    )
    .filter(Boolean)
}

function toCallout(
  paragraphs: string[],
): PropertyDetailDescriptionCallout | undefined {
  const match = paragraphs.find((paragraph) => CALLOUT_PATTERN.test(paragraph))

  if (!match) {
    return undefined
  }

  return {
    icon: "bolt",
    title: "Autonomie en eau et en électricité garantie",
    description: match.replace(/\*/g, "").trim(),
  }
}

export function buildPropertyDetailDescription(
  property: Property,
): PropertyDetailDescriptionProps | null {
  const paragraphs = toParagraphs(property.description ?? "")

  if (paragraphs.length === 0) {
    return null
  }

  const callout = toCallout(paragraphs)
  const body = callout
    ? paragraphs.filter((paragraph) => !CALLOUT_PATTERN.test(paragraph))
    : paragraphs

  return {
    title: "Description",
    paragraphs: body.length > 0 ? body : paragraphs,
    callout,
  }
}
