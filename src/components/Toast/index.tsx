import { Toaster as SonnerToaster } from "sonner";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      className="toaster group"
      style={{
        "--border-radius": "calc(var(--radius) + 4px)",
      } as React.CSSProperties }
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      
      
      successIcon={<CheckCircledIcon className="h-5 w-5" />}
      infoIcon={<InfoCircledIcon className="h-5 w-5" />}
      warningIcon={<ExclamationTriangleIcon className="h-5 w-5" />}
      errorIcon={<CrossCircledIcon className="h-5 w-5" />}
      {...props}
    />
  );
};

export { Toaster };