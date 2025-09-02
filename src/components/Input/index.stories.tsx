import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input, EmailInput, PasswordInput } from "."

const meta: Meta = {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

// Core Input stories
export const Default: Story = {
  args: { label: "Email", placeholder: "Enter your email", type: "email" },
}

export const Error: Story = {
  args: { label: "Email", placeholder: "Enter your email", error: "Invalid email" },
}

export const EmailValidated: Story = {
  render: () => <EmailInput label="Email" placeholder="Enter your email" />,
}

export const PasswordValidated: Story = {
  render: () => <PasswordInput label="Password" placeholder="Enter your password" />,
}

export const MixedValidated: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <EmailInput label="Email" placeholder="Enter your email" />
      <PasswordInput label="Password" placeholder="Enter your password" />
    </div>
  ),
}
