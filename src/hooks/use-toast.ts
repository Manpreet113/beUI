import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/Toast";

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actions = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

type Action =
  | { type: typeof actions.ADD_TOAST; toast: ToasterToast }
  | {
      type: typeof actions.UPDATE_TOAST;
      toast: Partial<ToasterToast> & { id: string };
    }
  | { type: typeof actions.DISMISS_TOAST; toastId?: ToasterToast["id"] }
  | { type: typeof actions.REMOVE_TOAST; toastId?: ToasterToast["id"] };

interface State {
  toasts: ToasterToast[];
}

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actions.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, 5),
      };
    case actions.DISMISS_TOAST: { // Scoped with curly braces
      const { toastId } = action;
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      };
    }
    case actions.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
};

let count = 0;
function genId() {
  count = (count + 1) % 1_000_000;
  return count.toString();
}

function toast(props: Omit<ToasterToast, "id">) {
  const id = genId();
  const dismiss = () => dispatch({ type: actions.DISMISS_TOAST, toastId: id });
  
  // Auto-dismiss after a delay
  setTimeout(() => {
    dismiss();
  }, 5000); // 5-second auto-dismiss

  dispatch({
    type: actions.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) {
          // Trigger a delayed removal to allow for exit animation
          setTimeout(() => {
             dispatch({ type: actions.REMOVE_TOAST, toastId: id });
          }, 1000);
        }
      },
    },
  });

  return { id, dismiss };
}

function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: actions.DISMISS_TOAST, toastId }),
  };
}

export { useToast, toast };