import { cn } from "@/utils/index";
import { cva, type VariantProps } from "cva";
import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";


const buttonVariants = cva({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors disabled:pointer-events-none disabled:opacity-60 cursor-pointer",
  variants: {
    variant: {
      solid: "bg-primary text-primary-foreground hover:bg-primary/90",
      subtle: "bg-muted text-foreground hover:bg-muted/80",
      ghost: "hover:bg-accent/30 text-foreground",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-5 text-base",
      lg: "h-12 px-6 text-lg",
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
    }


export const Button = ({ className, variant, size, asChild = false, ...props }: ButtonProps) => {
    const Comp = asChild ? Slot : "button"
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}
