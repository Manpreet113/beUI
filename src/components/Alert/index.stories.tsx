import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertDescription, AlertTitle } from ".";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "success", "warning", "destructive"],
    },
    richColors: {
      control: "boolean",
    },
    isDismissible: {
      control: "boolean",
    },
  },
  decorators: [(Story) => <div className="w-96 space-y-4">{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default Style",
  args: {
    richColors: false,
  },
  render: (args) => (
    <>
      <Alert {...args} variant="default">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This is the default alert style.
        </AlertDescription>
      </Alert>
      <Alert {...args} variant="success">
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>
      <Alert {...args} variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Your trial period is about to expire.
        </AlertDescription>
      </Alert>
      <Alert {...args} variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </>
  ),
};

export const RichColors: Story = {
  name: "Rich Colors Style",
  args: {
    richColors: true,
  },
  render: (args) => (
    <>
      <Alert {...args} variant="default">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This is the rich color alert style.
        </AlertDescription>
      </Alert>
       <Alert {...args} variant="success">
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>
      <Alert {...args} variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Your trial period is about to expire.
        </AlertDescription>
      </Alert>
      <Alert {...args} variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </>
  ),
};