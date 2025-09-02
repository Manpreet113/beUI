import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "."
import { EmailInput, PasswordInput } from "./validatedInputs"
import type { InputProps } from "."

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
    disabled: {
      control: "boolean",
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
  },
  args: {
    label: "Email Address",
    placeholder: "your@email.com",
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Input>

// --- Base States ---

export const Default: Story = {
  args: {
    helperText: "This is a helpful message.",
  },
}

export const WithError: Story = {
  args: {
    error: "Please enter a valid email address.",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled Input",
  },
}

// --- Variants ---

export const VariantFilled: Story = {
  name: "Variant: Filled",
  args: {
    variant: "filled",
    label: "Filled Input",
  },
}

export const VariantOutlined: Story = {
  name: "Variant: Outlined",
  args: {
    variant: "outlined",
    label: "Outlined Input",
  },
}

// --- Sizes ---

export const SizeSmall: Story = {
  name: "Size: Small",
  args: {
    inputSize: "sm",
    label: "Small Input",
  },
}

export const SizeMedium: Story = {
  name: "Size: Medium (Default)",
  args: {
    inputSize: "md",
    label: "Medium Input",
  },
}

export const SizeLarge: Story = {
  name: "Size: Large",
  args: {
    inputSize: "lg",
    label: "Large Input",
  },
}

// --- Validated Inputs ---

const ValidatedTemplate: Story = {
  render: (args: InputProps) => (
    <div className="flex w-80 flex-col gap-4">
      <EmailInput {...args} label="Email (Validated)" />
      <PasswordInput
        {...args}
        label="Password (Validated)"
        placeholder="Enter your password"
      />
    </div>
  ),
}

export const Validated: Story = {
  ...ValidatedTemplate,
  name: "Recipes: Validated Inputs",
}