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
  ci: {
    code: "ci",
    name: "Côte d'Ivoire",
    currency: "FCFA",
    callingCode: 225,
  },
  ne: {
    code: "ne",
    name: "Niger",
    currency: "FCFA",
    callingCode: 237,
  },
  ml: {
    code: "ml",
    name: "Mali",
    currency: "FCFA",
    callingCode: 223,
  },
  bf: {
    code: "bf",
    name: "Burkina Faso",
    currency: "FCFA",
    callingCode: 226,
  },
  gn: {
    code: "gn",
    name: "Guinée",
    currency: "GNF",
    callingCode: 224,
  },
} as const

export function getCountry(code: string) {
  return countries[code as keyof typeof countries]
}

export function getCountryCallingCode(code: string) {
  return getCountry(code)?.callingCode ?? null
}