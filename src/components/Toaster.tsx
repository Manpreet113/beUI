import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/Toast";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";


const statusIcons = {
  success: {
    icon: <CheckCircledIcon className="h-5 w-5 text-green-500" />,
  },
  info: {
    icon: <InfoCircledIcon className="h-5 w-5 text-blue-500" />,
  },
  warning: {
    icon: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />,
  },
  error: {
    icon: <CrossCircledIcon className="h-5 w-5 text-destructive" />,
  },
};

export type ToasterProps = {
  variant?: "default" | "stacked";
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
};

export function Toaster({
  variant = "default",
  position = "bottom-right",
}: ToasterProps) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, status, ...props }, index) {
        const isStacked = variant === "stacked";
        const isVisible = !isStacked || index < 3;

        const offset = index * 8;
        const scale = 1 - index * 0.05;

        return (
          isVisible && (
            <Toast
              key={id}
              {...props}
              className={isStacked ? "absolute" : ""}
              style={
                isStacked
                  ? {
                      transform: `translateY(${offset}px) scale(${scale})`,
                      zIndex: toasts.length - index,
                    }
                  : {}
              }
            >
              {status && statusIcons[status] && (
                <div className="shrink-0">{statusIcons[status].icon}</div>
              )}
              <div className="grid flex-1 gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
              {action}
              <ToastClose />
            </Toast>
          )
        );
      })}
      <ToastViewport
        variant={variant}
        position={position}
        className={
          variant === "stacked"
            ? "h-[--toast-height] w-[--toast-width] data-[state=hover]:h-[--toast-expanded-height]"
            : ""
        }
        style={
          {
            "--toast-height": "80px", // Height of a single toast
            "--toast-width": "350px",
            // Calculate expanded height based on number of visible toasts
            "--toast-expanded-height": `${Math.min(toasts.length, 3) * 75 + (toasts.length > 1 ? 16 : 0)}px`,
          } as React.CSSProperties
        }
      />
    </ToastProvider>
  );
}