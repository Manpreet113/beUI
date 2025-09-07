import { cn } from "@/utils/index";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cva, type VariantProps } from "cva";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

// --- Context to share the modal's open state ---
interface ModalContextType {
  open: boolean;
}
const ModalContext = React.createContext<ModalContextType | null>(null);

const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a Modal");
  }
  return context;
};

// --- Modal Root: Now handles both controlled and uncontrolled states ---
const Modal = ({
  open: controlledOpen,
  onOpenChange: onControlledOpenChange,
  defaultOpen,
  ...props
}: DialogPrimitive.DialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen || false
  );
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const onOpenChange = React.useCallback(
    (isOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(isOpen);
      }
      onControlledOpenChange?.(isOpen);
    },
    [isControlled, onControlledOpenChange]
  );

  return (
    <ModalContext.Provider value={{ open }}>
      <DialogPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        {...props}
      />
    </ModalContext.Provider>
  );
};


const ModalTrigger = DialogPrimitive.Trigger;

const modalContentVariants = cva({
  base: `
    fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg 
    translate-x-[-50%] translate-y-[-50%] gap-4 
    border bg-background p-6 shadow-lg sm:rounded-lg
  `,
  variants: {
    variant: {
      default: "border-border",
      outline: "border-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {}

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, variant, children, ...props }, ref) => {
  const { open } = useModalContext();

  return (
    <DialogPrimitive.Portal forceMount>
      <AnimatePresence>
        {open && (
          <>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content ref={ref} asChild {...props}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(modalContentVariants({ variant }), className)}
              >
                {children}
                <DialogPrimitive.Close
                  className={`
                    absolute right-4 top-4 rounded-sm opacity-70 
                    ring-offset-background transition-opacity 
                    hover:opacity-100 focus:outline-none focus:ring-2 
                    focus:ring-ring focus:ring-offset-2 
                    disabled:pointer-events-none data-[state=open]:bg-accent 
                    data-[state=open]:text-muted-foreground
                  `}
                >
                  <Cross2Icon className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </motion.div>
            </DialogPrimitive.Content>
          </>
        )}
      </AnimatePresence>
    </DialogPrimitive.Portal>
  );
});
ModalContent.displayName = DialogPrimitive.Content.displayName;

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
ModalHeader.displayName = "ModalHeader";

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
ModalFooter.displayName = "ModalFooter";

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
};