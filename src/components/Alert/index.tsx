import { cn } from "@/utils/index";
import {
  CheckCircledIcon,
  Cross2Icon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { cva, type VariantProps } from "cva";
import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";
import { Button } from "../Button";

const alertVariants = cva({
  base: "relative w-full rounded-xl border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
  variants: {
    variant: {
      default: "border-border text-foreground [&>svg]:text-foreground",
      success: "border-success text-success-foreground [&>svg]:text-success",
      warning: "border-warning text-warning-foreground [&>svg]:text-warning",
      destructive:
        "border-destructive text-destructive [&>svg]:text-destructive",
    },
    richColors: {
      true: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      richColors: true,
      className: "bg-muted border-muted-foreground/30",
    },
    {
      variant: "success",
      richColors: true,
      className: "bg-success/20",
    },
    {
      variant: "warning",
      richColors: true,
      className: "bg-warning/20",
    },
    {
      variant: "destructive",
      richColors: true,
      className: "bg-destructive/20",
    },
  ],
  defaultVariants: {
    variant: "default",
  },
});

const variantIcons = {
  default: InfoCircledIcon,
  success: CheckCircledIcon,
  warning: ExclamationTriangleIcon,
  destructive: CrossCircledIcon,
};


export interface AlertProps
  // 2. Replace React.HTMLAttributes with Omit<HTMLMotionProps<'div'>, 'ref'>
  extends Omit<HTMLMotionProps<"div">, "ref">,
    VariantProps<typeof alertVariants> {
  isDismissible?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, richColors, children, isDismissible = false, ...props }, ref) => {
    // ... (rest of the component is unchanged)
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) {
      return null;
    }

    const Icon = variant ? variantIcons[variant] : variantIcons.default;

    return (
      <motion.div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, richColors }), className)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        <Icon className="h-4 w-4" />
        {children}
        {isDismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-5 top-2 h-6 w-6"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss"
          >
            <Cross2Icon className="h-4 w-4" />
          </Button>
        )}
      </motion.div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };