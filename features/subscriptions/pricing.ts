export const USD_TO_XOF_RATE = 600

export function usdToXof(usd: number) {
  return Math.round(usd * USD_TO_XOF_RATE)
}

export function formatUsdAmount(usd: number) {
  return `${usd.toFixed(2).replace(".", ",")} $`
}

export function formatXofAmount(xof: number) {
  const grouped = Math.round(xof)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")

  return `${grouped} XOF`
}

export function formatMonthlyUsd(usd: number) {
  return `${formatUsdAmount(usd)} / mois`
}

export function formatMonthlyXof(xof: number) {
  return `${formatXofAmount(xof)} / mois`
}

export const PROPERTY_SEEKERS_PLAN_PRICES = {
  standard: { usd: 0, xof: 0 },
  medium: { usd: 10.99, xof: usdToXof(10.99) },
  premium: { usd: 19.99, xof: usdToXof(19.99) },
} as const

export const AGENT_MARKETPLACE_PLAN_PRICES = {
  just: { usd: 0, xof: 0 },
  senior: { usd: 20.99, xof: usdToXof(20.99) },
  business: { usd: 49.99, xof: usdToXof(49.99) },
} as const
