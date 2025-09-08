import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Toaster } from "../Toaster";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "./";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

// The story render functions remain the same but will now work
export const Default: Story = {
  name: "Recipe: Simple Toast",
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Event Scheduled",
          description: "A new event has been added to your calendar.",
        });
      }}
    >
      Show Toast
    </Button>
  ),
};

export const WithAction: Story = {
  name: "Recipe: With Action",
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Message Sent",
          description: "Your message has been successfully sent.",
          action: <ToastAction altText="Undo">Undo</ToastAction>,
        });
      }}
    >
      Show Toast with Action
    </Button>
  ),
};

export const Destructive: Story = {
  name: "Variant: Destructive",
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }}
    >
      Show Destructive Toast
    </Button>
  ),
};