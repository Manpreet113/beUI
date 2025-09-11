import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  type ModalContentProps,
} from "@/components/Modal";
import { cn } from "@/utils";
import * as React from "react";
import { Button, type ButtonProps } from "../Button";

const AlertDialog = Modal;

const AlertDialogTrigger = ModalTrigger;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof ModalContent>,
  ModalContentProps
>(({ className, ...props }, ref) => (
  <ModalContent ref={ref} className={cn("sm:max-w-md", className)} {...props} />
));
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ModalHeader;

const AlertDialogFooter = ModalFooter;

const AlertDialogTitle = ModalTitle;

const AlertDialogDescription = ModalDescription;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof Button>,
  ButtonProps
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn(
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      className
    )}
    {...props}
  />
));
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof Button>,
  ButtonProps
>(({ className, ...props }, ref) => (
  <Button ref={ref} variant="outline" className={cn(className)} {...props} />
));
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};