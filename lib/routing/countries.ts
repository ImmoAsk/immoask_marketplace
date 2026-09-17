// lib/routing/countries.ts

export const countries = {
  tg: {
    code: "tg",
    name: "Togo",
    currency: "FCFA",
    callingCode: 228,
  },
  bj: {
    code: "bj",
    name: "Bénin",
    currency: "FCFA",
    callingCode: 229,
  },
} as const

export function getCountry(code: string) {
  return countries[code as keyof typeof countries]
}

export function getCountryCallingCode(code: string) {
  return getCountry(code)?.callingCode ?? null
}