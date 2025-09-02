import { cn } from "@/utils/index"
import { cva, type VariantProps } from "cva"
import { forwardRef, type ComponentProps } from "react"

const inputVariants = cva({
  base: `
    w-full rounded-full border transition 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
    disabled:cursor-not-allowed disabled:opacity-60
    placeholder:text-muted-foreground
  `,
  variants: {
    variant: {
      default: "border-input bg-background text-foreground",
      filled: "border-transparent bg-muted/40 focus:bg-background",
      outlined: "border-2 border-input bg-transparent",
    },
    inputSize: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-5 text-lg",
    },
    state: {
      normal: "",
      error: "border-destructive focus-visible:ring-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
    inputSize: "md",
    state: "normal",
  },
})

export interface InputProps
  extends Omit<ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  label?: string
  helperText?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, state, label, helperText, error, id, ...props }, ref) => {
    const inputId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)
    const describedBy = error
      ? `${inputId}-error`
      : helperText
      ? `${inputId}-helper`
      : undefined

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            inputVariants({
              variant,
              inputSize,
              state: error ? "error" : state,
            }),
            className
          )}
          {...props}
        />

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}

        {error && (
          <p id={`${inputId}-error`} className="text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { EmailInput, PasswordInput } from "./validatedInputs"