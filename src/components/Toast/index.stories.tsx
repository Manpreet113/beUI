import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Toaster } from "../Toaster";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./";

const meta: Meta = {
  title: "Components/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive"],
      defaultValue: "default",
    },
    title: {
      control: { type: "text" },
      defaultValue: "Event Scheduled",
    },
    description: {
      control: { type: "text" },
      defaultValue: "A new event has been added to your calendar.",
    },
    duration: {
      control: { type: "number" },
      defaultValue: 5000,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Interactive Story ---

export const Interactive: Story = {
  name: "Interactive Demo",
  render: (args) => {
    const { toast } = useToast();

    return (
      <Button
        variant="outline"
        onClick={() => {
          toast({
            variant: args.variant,
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
    );
  },
};