import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { ToastActionElement, ToastProps } from "@/components/Toast";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

// --- Types ---
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  status?: "success" | "info" | "warning" | "error";
};

interface ToastOptions {
  duration?: number;
}

interface ToastPayload extends Omit<ToasterToast, "id"> {
  options?: ToastOptions;
}

// --- Actions ---
const actions = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

type Action =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

// --- State ---
interface State {
  toasts: ToasterToast[];
}

const initialState: State = {
  toasts: [],
};

// --- Reducer ---
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actions.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case actions.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case actions.DISMISS_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId || action.toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      };
    case actions.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
};

// --- Context ---
interface ToastContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
  toast: (payload: ToastPayload) => { id: string; dismiss: () => void };
  dismiss: (toastId?: string) => void;
  success: (
    payload: Omit<ToastPayload, "status">
  ) => { id: string; dismiss: () => void };
  error: (
    payload: Omit<ToastPayload, "status">
  ) => { id: string; dismiss: () => void };
  info: (
    payload: Omit<ToastPayload, "status">
  ) => { id: string; dismiss: () => void };
  warning: (
    payload: Omit<ToastPayload, "status">
  ) => { id: string; dismiss: () => void };
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: Omit<ToastPayload, "status">;
      success: Omit<ToastPayload, "status">;
      error: Omit<ToastPayload, "status">;
    }
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// --- Provider ---
let count = 0;
const genId = () => (count++ % 1_000_000).toString();

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toast = (payload: ToastPayload) => {
    const id = genId();
    const { options, ...rest } = payload;
    const duration = options?.duration || 5000;

    const dismiss = () => dispatch({ type: actions.DISMISS_TOAST, toastId: id });

    setTimeout(dismiss, duration);

    dispatch({
      type: actions.ADD_TOAST,
      toast: {
        ...rest,
        id,
        open: true,
        onOpenChange: (open: boolean) => {
          if (!open) {
            setTimeout(
              () => dispatch({ type: actions.REMOVE_TOAST, toastId: id }),
              TOAST_REMOVE_DELAY
            );
          }
        },
      },
    });

    return { id, dismiss };
  };

  const dismiss = (toastId?: string) => {
    dispatch({ type: actions.DISMISS_TOAST, toastId });
  };

  const success = (payload: Omit<ToastPayload, "status">) => {
    return toast({ ...payload, status: "success" });
  };

  const error = (payload: Omit<ToastPayload, "status">) => {
    return toast({ ...payload, status: "error" });
  };

  const info = (payload: Omit<ToastPayload, "status">) => {
    return toast({ ...payload, status: "info" });
  };

  const warning = (payload: Omit<ToastPayload, "status">) => {
    return toast({ ...payload, status: "warning" });
  };

  const promise = <T,>(
    promise: Promise<T>,
    options: {
      loading: Omit<ToastPayload, "status">;
      success: Omit<ToastPayload, "status">;
      error: Omit<ToastPayload, "status">;
    }
  ) => {
    const { id } = toast({ ...options.loading, status: "info" });

    promise
      .then(() => {
        dispatch({
          type: actions.UPDATE_TOAST,
          toast: { id, ...options.success, status: "success" },
        });
      })
      .catch(() => {
        dispatch({
          type: actions.UPDATE_TOAST,
          toast: { id, ...options.error, status: "error" },
        });
      });
  };

  return (
    <ToastContext.Provider
      value={{
        state,
        dispatch,
        toast,
        dismiss,
        success,
        error,
        info,
        warning,
        promise,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

// --- Hook ---
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return {
    toasts: context.state.toasts,
    toast: context.toast,
    dismiss: context.dismiss,
    success: context.success,
    error: context.error,
    info: context.info,
    warning: context.warning,
    promise: context.promise,
  };
};