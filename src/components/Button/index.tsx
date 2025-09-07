import { cn } from "@/utils/index"
import { cva, type VariantProps } from "cva"
import type { ComponentProps, ReactNode } from "react"
import { Slot } from "@radix-ui/react-slot"

const buttonVariants = cva({
  base: `
    inline-flex items-center justify-center gap-2 
    whitespace-nowrap rounded-full font-medium 
    transition-all disabled:pointer-events-none disabled:opacity-60 
    cursor-pointer select-none 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
    active:scale-[0.99]
    [&_svg]:pointer-events-none [&_svg]:shrink-0
  `,
  variants: {
    variant: {
      solid: "bg-primary text-primary-foreground hover:bg-primary/90",
      subtle: "bg-muted text-foreground hover:bg-muted/80",
      ghost: "hover:bg-accent/60 text-foreground",
      outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
    },
    size: {
      sm: "h-8 px-3 text-sm has-[>svg]:px-2.5",
      md: "h-10 px-5 text-base has-[>svg]:px-4",
      lg: "h-12 px-6 text-lg has-[>svg]:px-5",
      icon: "h-10 w-10 p-0",
    },
    loading: {
      true: "relative pointer-events-none",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
})

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  children?: ReactNode
}

export const Button = ({
  className,
  variant,
  size,
  loading = false,
  asChild = false,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button"

  
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, loading }), className)}
      disabled={loading || props.disabled}
      aria-busy={loading}
      {...props}
    >
    <span className="flex items-center gap-2">
      {loading && (
        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      )}
      {children}
      </span>
    </Comp>
  )
}
