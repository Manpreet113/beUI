import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Toaster, type ToasterProps } from "../Toaster"; // ✨ IMPORT: ToasterProps type
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./";

// ✨ NEW: Create a combined type for all story controls
type StoryArgs = ToasterProps & {
  status?: "success" | "info" | "warning" | "error";
  title: string;
  description: string;
  duration: number;
};

// ✨ CHANGE: Use the new StoryArgs type for the Meta
const meta: Meta<StoryArgs> = {
  title: "Components/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Toaster Controls
    variant: {
      control: { type: "select" },
      options: ["default", "stacked"],
      description: "Controls the layout style of the toasts.",
    },
    position: {
      control: { type: "select" },
      options: [
        "top-left", "top-right", "bottom-left", "bottom-right",
        "top-center", "bottom-center",
      ],
      description: "Controls where the toasts appear on the screen.",
    },
    // Toast Creator Controls
    status: {
      name: "Toast Status",
      control: { type: "select" },
      options: [undefined, "success", "info", "warning", "error"],
      description: "Sets the status icon for an individual toast.",
    },
    title: {
      name: "Toast Title",
      control: { type: "text" },
    },
    description: {
      name: "Toast Description",
      control: { type: "text" },
    },
    duration: {
      name: "Toast Duration",
      control: { type: "number" },
    },
  },
};

export default meta;

// ✨ CHANGE: Use the new StoryArgs type for the Story
type Story = StoryObj<StoryArgs>;

export const Interactive: Story = {
  name: "Interactive Demo",
  // ✨ NEW: Provide default args for all controls
  args: {
    variant: "default",
    position: "bottom-right",
    status: undefined,
    title: "Event Scheduled",
    description: "A new event has been added to your calendar.",
    duration: 5000,
  },
  render: (args) => {
    const { toast } = useToast();

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground max-w-sm text-center">
          NOTE: The `Toaster` is rendered globally. Adjust `variant` and `position` controls to see layout changes for all toasts.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              // These args are now correctly typed
              status: args.status,
              title: args.title,
              description: args.description,
              action: <ToastAction altText="Undo">Undo</ToastAction>,
              options: {
                duration: args.duration,
              },
            });
          }}
        >
          Show Toast
        </Button>
      </div>
    );
  },
};