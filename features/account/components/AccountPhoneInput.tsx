"use client"

import PhoneInput, {
  isValidPhoneNumber,
  type Country,
} from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import fr from "react-phone-number-input/locale/fr"

import { cn } from "@/lib/cn"
import type { AccountPhoneInputProps } from "@/features/account/types"

export const ACCOUNT_DEFAULT_COUNTRY: Country = "TG"

function toCountry(code?: string): Country {
  const normalized = code?.trim().toUpperCase()
  return (normalized || ACCOUNT_DEFAULT_COUNTRY) as Country
}

export function isAccountPhoneValid(value: string) {
  return Boolean(value) && isValidPhoneNumber(value)
}

export default function AccountPhoneInput({
  id,
  name,
  value,
  onChange,
  defaultCountry = ACCOUNT_DEFAULT_COUNTRY,
  disabled,
  invalid,
  placeholder = "90 00 00 00",
  autoComplete = "tel",
  className,
}: AccountPhoneInputProps) {
  return (
    <PhoneInput
      international
      countryCallingCodeEditable={false}
      defaultCountry={toCountry(defaultCountry)}
      countryOptionsOrder={["TG", "BJ", "..."]}
      addInternationalOption={false}
      flags={flags}
      labels={fr}
      value={value || undefined}
      onChange={(next) => onChange(next ?? "")}
      disabled={disabled}
      placeholder={placeholder}
      id={id}
      name={name}
      autoComplete={autoComplete}
      className={cn(
        "AccountPhoneInput",
        invalid && "AccountPhoneInput--invalid",
        className,
      )}
      numberInputProps={{
        className: "AccountPhoneInput-input",
      }}
    />
  )
}

export { AccountPhoneInput }
