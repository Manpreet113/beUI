/* eslint-disable react-refresh/only-export-components */
import { useState } from "react"
import { Input, type InputProps } from "../Input"

type ValidatorFn = (value: string) => string | undefined

interface ValidatedInputOptions {
  type: InputProps["type"]
  validator: ValidatorFn
}

export function createValidatedInput({ type, validator }: ValidatedInputOptions) {
  return function ValidatedInput(props: Omit<InputProps, "type" | "error">) {
    const [error, setError] = useState<string | undefined>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const validationError = validator(value)
      setError(validationError)
      props.onChange?.(e)
    }

    return (
      <Input
        {...props}
        type={type}
        error={error}
        onChange={handleChange}
      />
    )
  }
}

export const EmailInput = createValidatedInput({
  type: "email",
  validator: (value) => {
    if (!value) return "Email is required"
    // simple email regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address"
    return undefined
  },
})

export const PasswordInput = createValidatedInput({
  type: "password",
  validator: (value) => {
    if (!value) return "Password is required"
    if (value.length < 6) return "Password must be at least 6 characters"
    return undefined
  },
})
