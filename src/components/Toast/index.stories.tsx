// src/components/Toast.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/index";
import { Toaster } from "./index";
import { toast } from "sonner";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: { type: "select" },
      options: [
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
        "top-center",
        "bottom-center",
      ],
    },
    richColors: {
      control: { type: "boolean" },
    },
    expand: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: "bottom-right",
    richColors: true, // Let's enable rich colors by default
    expand: false,
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={() =>
            toast("Event has been created", {
              description: "A new event has been added to your calendar.",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.info("Info", {
              description: "This is an informational message.",
            })
          }
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.success("Success!", {
              description: "The operation was completed successfully.",
            })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.warning("Warning!", {
              description: "Something you should be aware of.",
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.error("Error!", {
              description: "There was an error with the operation.",
            })
          }
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const promise = new Promise((resolve, reject) =>
              setTimeout(() => {
                if (Math.random() > 0.5) {
                  resolve({ name: "Sonner" });
                } else {
                  reject();
                }
              }, 2000)
            );
            toast.promise(promise, {
              loading: "Loading...",
              success: (data) => `Toast for ${data.name} has been added!`,
              error: "Error",
            });
          }}
        >
          Promise
        </Button>
      </div>
    </>
  ),
};