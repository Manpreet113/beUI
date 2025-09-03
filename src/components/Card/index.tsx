import * as React from "react"
import { cva, type VariantProps } from "cva"

import { cn } from "@/utils"

// --- CVA Variants for the Card ---
const cardVariants = cva({
  base: "rounded-xl border bg-card text-card-foreground shadow-sm",
    variants: {
      variant: {
        default: "border-border",
        outline: "border-primary",
        ghost: "border-transparent shadow-none",
      },
      isInteractive: {
        true: "transition-all duration-200 hover:shadow-md hover:-translate-y-1",
      },
      hasGlow: {
        true: "shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]",
      },
    },
    defaultVariants: {
      variant: "default",
      isInteractive: false,
      hasGlow: false,
    },
  }
);

// --- Main Card Component ---
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, isInteractive, hasGlow, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, isInteractive, hasGlow }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

// --- Header ---
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { withDivider?: boolean }
>(({ className, withDivider, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6",
      withDivider && "border-b border-border pb-4",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// --- Image ---
const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src: string; alt: string }
>(({ className, src, alt, ...props }, ref) => (
  <div ref={ref} className={cn("overflow-hidden rounded-t-xl", className)} {...props}>
    <img src={src} alt={alt} className="w-full h-auto object-cover" />
  </div>
));
CardImage.displayName = "CardImage";

// --- Title, Description, Content, Footer ---
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { withDivider?: boolean }
>(({ className, withDivider, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0",
      withDivider && "border-t border-border pt-4",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage, 
}