import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "."

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline", "ghost", "link", "destructive", "secondary"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "lg", "icon", "default"],
    },
    onClick: { action: "clicked" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    "aria-label": "Button",
  },
}

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
}

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
}

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
}

export const asChild: Story = {
    args:{
        asChild: true,
        children: <div>Not button</div>,
    }
}
