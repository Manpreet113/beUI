import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "."

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "filled", "outlined"],
    },
    inputSize: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    state: {
      control: { type: "select" },
      options: ["normal", "error"],
    },
    label: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "password", "number"],
    },
    value: { control: "text" },
    onChange: { action: "changed" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    variant: "default",
    inputSize: "md",
  },
}

export const Filled: Story = {
  args: {
    label: "Name",
    placeholder: "Johnny Storm",
    variant: "filled",
  },
}

export const Outlined: Story = {
  args: {
    label: "Password",
    placeholder: "••••••••",
    type: "password",
    variant: "outlined",
  },
}

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    error: "Invalid email address",
  },
}

export const Disabled: Story = {
  args: {
    label: "Username",
    placeholder: "You can't type here",
    disabled: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input label="Small" placeholder="sm input" inputSize="sm" />
      <Input label="Medium" placeholder="md input" inputSize="md" />
      <Input label="Large" placeholder="lg input" inputSize="lg" />
    </div>
  ),
}