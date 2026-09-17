import type { Metadata } from "next"

import {
  buildLegalNotices,
  buildLegalNoticesMetadata,
} from "@/features/legal/components/buildLegalNotices"
import LegalDocument from "@/features/legal/components/LegalDocument"

export const metadata: Metadata = buildLegalNoticesMetadata()

export default function LegalNoticesPage() {
  return <LegalDocument {...buildLegalNotices()} />
}
