import type { ReactNode } from "react"

import { cn } from "@/lib/cn"

import type { ListingIllustrationId } from "./types"

type IllustrationProps = {
  className?: string
  title?: string
}

const NAVY = "#0b1f3a"
const PRIMARY = "#0096d6"
const PRIMARY_SOFT = "#e6f4fa"
const SURFACE = "#f5f8fb"
const SUCCESS = "#15803d"
const MUTED = "#8a96a3"

function Frame({
  className,
  title,
  children,
}: IllustrationProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 560 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden={title ? undefined : true}
      className={cn("h-auto w-full", className)}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

function SoftBackdrop() {
  return (
    <>
      <rect width="560" height="420" rx="28" fill={SURFACE} />
      <circle cx="92" cy="78" r="64" fill={PRIMARY_SOFT} opacity="0.9" />
      <circle cx="480" cy="340" r="88" fill={PRIMARY_SOFT} opacity="0.55" />
      <circle cx="430" cy="70" r="36" fill={PRIMARY} opacity="0.12" />
    </>
  )
}

function HeroIllustration({ className, title }: IllustrationProps) {
  return (
    <Frame className={className} title={title}>
      <SoftBackdrop />
      <rect x="58" y="118" width="210" height="170" rx="18" fill="white" />
      <rect x="58" y="118" width="210" height="78" rx="18" fill={PRIMARY} />
      <rect x="58" y="172" width="210" height="24" fill={PRIMARY} />
      <rect x="78" y="214" width="118" height="12" rx="6" fill={NAVY} opacity="0.85" />
      <rect x="78" y="236" width="86" height="10" rx="5" fill={MUTED} opacity="0.55" />
      <rect x="78" y="258" width="64" height="16" rx="8" fill={PRIMARY_SOFT} />
      <text x="90" y="270" fill={PRIMARY} fontSize="10" fontWeight="700" fontFamily="system-ui,sans-serif">
        Publié
      </text>

      <rect x="300" y="78" width="168" height="278" rx="28" fill={NAVY} />
      <rect x="312" y="96" width="144" height="242" rx="18" fill="white" />
      <rect x="328" y="112" width="112" height="72" rx="12" fill={PRIMARY_SOFT} />
      <rect x="344" y="128" width="48" height="40" rx="8" fill={PRIMARY} opacity="0.35" />
      <rect x="328" y="198" width="86" height="10" rx="5" fill={NAVY} opacity="0.8" />
      <rect x="328" y="216" width="64" height="8" rx="4" fill={MUTED} opacity="0.5" />
      <rect x="328" y="240" width="112" height="36" rx="10" fill={PRIMARY} />
      <text x="348" y="262" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui,sans-serif">
        Publier
      </text>
      <circle cx="384" cy="330" r="5" fill={MUTED} opacity="0.45" />

      <path
        d="M248 200c18-8 34-4 48 10"
        stroke={PRIMARY}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="5 7"
      />
    </Frame>
  )
}

function TypesIllustration({ className, title }: IllustrationProps) {
  return (
    <Frame className={className} title={title}>
      <SoftBackdrop />
      <rect x="70" y="150" width="120" height="150" rx="16" fill="white" />
      <path d="M88 214h84v70H88z" fill={PRIMARY_SOFT} />
      <path d="M100 214V176l30-22 30 22v38" fill={PRIMARY} opacity="0.85" />
      <rect x="118" y="236" width="24" height="48" rx="4" fill="white" />

      <rect x="220" y="120" width="120" height="180" rx="16" fill="white" />
      <rect x="236" y="138" width="88" height="58" rx="10" fill={PRIMARY} opacity="0.2" />
      <rect x="236" y="210" width="64" height="10" rx="5" fill={NAVY} opacity="0.8" />
      <rect x="236" y="228" width="48" height="8" rx="4" fill={MUTED} opacity="0.5" />
      <rect x="236" y="252" width="88" height="28" rx="8" fill={PRIMARY_SOFT} />

      <rect x="370" y="150" width="120" height="150" rx="16" fill="white" />
      <path d="M386 250h88v34h-88z" fill={SUCCESS} opacity="0.15" />
      <path d="M394 250V210l36-28 36 28v40" fill={SUCCESS} opacity="0.75" />
      <rect x="418" y="262" width="24" height="22" rx="3" fill="white" />
    </Frame>
  )
}

function CommunityIllustration({ className, title }: IllustrationProps) {
  return (
    <Frame className={className} title={title}>
      <SoftBackdrop />
      <circle cx="280" cy="210" r="42" fill={PRIMARY} />
      <circle cx="280" cy="198" r="14" fill="white" />
      <path d="M254 236c8-16 44-16 52 0" stroke="white" strokeWidth="10" strokeLinecap="round" />

      {[
        [150, 120],
        [410, 120],
        [130, 270],
        [430, 270],
        [210, 330],
        [350, 330],
      ].map(([cx, cy], index) => (
        <g key={`${cx}-${cy}`}>
          <line
            x1="280"
            y1="210"
            x2={cx}
            y2={cy}
            stroke={PRIMARY}
            strokeWidth="2"
            opacity="0.25"
          />
          <circle cx={cx} cy={cy} r="28" fill="white" />
          <circle
            cx={cx}
            cy={cy - 6}
            r="9"
            fill={index % 2 === 0 ? PRIMARY : NAVY}
            opacity="0.85"
          />
          <path
            d={`M${cx - 14} ${cy + 16}c4-10 24-10 28 0`}
            stroke={index % 2 === 0 ? PRIMARY : NAVY}
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>
      ))}
    </Frame>
  )
}

function TrustIllustration({ className, title }: IllustrationProps) {
  return (
    <Frame className={className} title={title}>
      <SoftBackdrop />
      <rect x="90" y="110" width="180" height="200" rx="20" fill="white" />
      <text x="118" y="156" fill={NAVY} fontSize="42" fontWeight="800" fontFamily="system-ui,sans-serif">
        300+
      </text>
      <rect x="118" y="176" width="96" height="10" rx="5" fill={PRIMARY} opacity="0.35" />
      <text x="118" y="220" fill={MUTED} fontSize="14" fontFamily="system-ui,sans-serif">
        Locataires trouvés
      </text>
      <rect x="118" y="246" width="124" height="36" rx="18" fill={PRIMARY_SOFT} />
      <text x="140" y="268" fill={PRIMARY} fontSize="12" fontWeight="700" fontFamily="system-ui,sans-serif">
        Communauté active
      </text>

      <rect x="300" y="140" width="170" height="170" rx="20" fill={NAVY} />
      <text x="328" y="198" fill="white" fontSize="42" fontWeight="800" fontFamily="system-ui,sans-serif">
        150+
      </text>
      <rect x="328" y="218" width="88" height="10" rx="5" fill={PRIMARY} opacity="0.7" />
      <text x="328" y="260" fill="white" fontSize="14" fontFamily="system-ui,sans-serif" opacity="0.85">
        Acquéreurs trouvés
      </text>
    </Frame>
  )
}

function ControlIllustration({ className, title }: IllustrationProps) {
  return (
    <Frame className={className} title={title}>
      <SoftBackdrop />
      <rect x="170" y="70" width="220" height="300" rx="32" fill={NAVY} />
      <rect x="186" y="92" width="188" height="256" rx="20" fill="white" />
      <rect x="206" y="116" width="148" height="88" rx="14" fill={PRIMARY_SOFT} />
      <rect x="206" y="220" width="100" height="12" rx="6" fill={NAVY} opacity="0.8" />
      <rect x="206" y="242" width="72" height="10" rx="5" fill={MUTED} opacity="0.45" />

      <rect x="206" y="278" width="148" height="44" rx="12" fill="#fff7ed" />
      <circle cx="230" cy="300" r="10" fill="#b45309" />
      <rect x="250" y="292" width="78" height="8" rx="4" fill="#b45309" opacity="0.8" />
      <rect x="250" y="308" width="56" height="6" rx="3" fill="#b45309" opacity="0.45" />

      <rect x="320" y="286" width="46" height="26" rx="13" fill="#b45309" />
      <circle cx="334" cy="299" r="9" fill="white" />
    </Frame>
  )
}

function LocationIllustration({ className, title }: IllustrationProps) {
  return (
    <Frame className={className} title={title}>
      <SoftBackdrop />
      <rect x="90" y="86" width="380" height="260" rx="24" fill="white" />
      <path
        d="M120 180c40-20 70 10 110 0s70-30 120-10 70 20 100 8"
        stroke={PRIMARY}
        strokeWidth="3"
        opacity="0.35"
      />
      <path
        d="M130 250c50-10 80 20 130 8s90-28 140-8 60 18 80 6"
        stroke={PRIMARY}
        strokeWidth="3"
        opacity="0.25"
      />
      <circle cx="210" cy="170" r="8" fill={PRIMARY_SOFT} />
      <circle cx="320" cy="210" r="8" fill={PRIMARY_SOFT} />
      <circle cx="400" cy="160" r="8" fill={PRIMARY_SOFT} />

      <path
        d="M280 148c0-28 22-50 50-50s50 22 50 50c0 38-50 78-50 78s-50-40-50-78Z"
        fill={PRIMARY}
      />
      <circle cx="330" cy="148" r="16" fill="white" />
      <circle cx="330" cy="148" r="7" fill={PRIMARY} />

      <rect x="250" y="300" width="160" height="28" rx="14" fill={NAVY} />
      <text x="278" y="318" fill="white" fontSize="12" fontWeight="700" fontFamily="system-ui,sans-serif">
        Lomé · Agoè · Bè
      </text>
    </Frame>
  )
}

function DoodooIllustration({ className, title }: IllustrationProps) {
  return (
    <Frame className={className} title={title}>
      <SoftBackdrop />
      <rect x="70" y="120" width="200" height="190" rx="20" fill="white" />
      <rect x="90" y="144" width="120" height="12" rx="6" fill={MUTED} opacity="0.35" />
      <rect x="90" y="168" width="160" height="12" rx="6" fill={MUTED} opacity="0.25" />
      <rect x="90" y="192" width="140" height="12" rx="6" fill={MUTED} opacity="0.25" />
      <rect x="90" y="228" width="88" height="40" rx="12" fill={PRIMARY_SOFT} />
      <text x="108" y="252" fill={PRIMARY} fontSize="12" fontWeight="700" fontFamily="system-ui,sans-serif">
        Brouillon
      </text>

      <path
        d="M286 210c18-6 34-2 48 12"
        stroke={PRIMARY}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="5 7"
      />

      <circle cx="400" cy="200" r="78" fill={PRIMARY} />
      <circle cx="400" cy="200" r="64" fill="white" />
      <circle cx="378" cy="190" r="8" fill={NAVY} />
      <circle cx="422" cy="190" r="8" fill={NAVY} />
      <path
        d="M378 224c10 14 34 14 44 0"
        stroke={PRIMARY}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x="372" y="150" width="56" height="14" rx="7" fill={PRIMARY_SOFT} />
      <text x="382" y="161" fill={PRIMARY} fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">
        Doodoo
      </text>
    </Frame>
  )
}

function WhyIllustration({ className, title }: IllustrationProps) {
  return (
    <Frame className={className} title={title}>
      <SoftBackdrop />
      {[
        { y: 100, label: "Mobile" },
        { y: 168, label: "Communauté" },
        { y: 236, label: "Présentation" },
        { y: 304, label: "Contrôle" },
      ].map((row, index) => (
        <g key={row.label}>
          <rect x="90" y={row.y} width="380" height="52" rx="16" fill="white" />
          <circle
            cx="126"
            cy={row.y + 26}
            r="16"
            fill={index % 2 === 0 ? PRIMARY : NAVY}
            opacity="0.9"
          />
          <path
            d={`M${118} ${row.y + 26}l5 5 10-12`}
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="160"
            y={row.y + 16}
            width={140 + index * 18}
            height="10"
            rx="5"
            fill={NAVY}
            opacity="0.75"
          />
          <rect
            x="160"
            y={row.y + 32}
            width={90 + index * 10}
            height="8"
            rx="4"
            fill={MUTED}
            opacity="0.4"
          />
        </g>
      ))}
    </Frame>
  )
}

function FinalCtaIllustration({ className, title }: IllustrationProps) {
  return (
    <Frame className={className} title={title}>
      <SoftBackdrop />
      <rect x="110" y="100" width="340" height="220" rx="24" fill="white" />
      <rect x="140" y="132" width="160" height="100" rx="16" fill={PRIMARY_SOFT} />
      <path d="M168 198V160l48-28 48 28v38" fill={PRIMARY} opacity="0.8" />
      <rect x="204" y="180" width="24" height="36" rx="4" fill="white" />

      <circle cx="360" cy="170" r="46" fill={NAVY} />
      <path
        d="M340 170l14 14 28-28"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect x="140" y="256" width="280" height="40" rx="12" fill={PRIMARY} />
      <text x="198" y="281" fill="white" fontSize="14" fontWeight="700" fontFamily="system-ui,sans-serif">
        Votre bien est visible
      </text>
    </Frame>
  )
}

const ILLUSTRATIONS: Record<
  ListingIllustrationId,
  (props: IllustrationProps) => ReactNode
> = {
  hero: HeroIllustration,
  "types-de-biens": TypesIllustration,
  communaute: CommunityIllustration,
  confiance: TrustIllustration,
  controle: ControlIllustration,
  localisation: LocationIllustration,
  doodoo: DoodooIllustration,
  pourquoi: WhyIllustration,
  "appel-final": FinalCtaIllustration,
}

export default function ListingIllustration({
  id,
  alt,
  className,
}: {
  id: ListingIllustrationId
  alt: string
  className?: string
}) {
  const Illustration = ILLUSTRATIONS[id]

  return (
    <div
      className={cn(
        "listing-illustration relative overflow-hidden rounded-[1.75rem]",
        "bg-gradient-to-br from-primary-soft/80 via-white to-surface",
        "ring-1 ring-border/80 shadow-[0_20px_50px_-28px_rgb(11_31_58_/_0.35)]",
        className,
      )}
    >
      <Illustration title={alt} className="block" />
    </div>
  )
}

export { ListingIllustration }
