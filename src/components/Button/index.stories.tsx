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
      options: ["solid", "subtle", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "icon"],
    },
    onClick: { action: "clicked" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Variants
export const Solid: Story = {
  args: {
    children: "Solid Button",
    variant: "solid",
    size: "md",
    "aria-label": "Button",
  },
}

export const Subtle: Story = {
  args: {
    children: "Subtle Button",
    variant: "subtle",
    size: "md",
  },
}

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
    size: "md",
  },
}

// Sizes
export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
}

export const Icon: Story = {
  args: {
    size: "icon",
    "aria-label": "Icon Button",
  },
}


export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    children: "Loading Button",
    loading: true,
  },
}

export const AsChild: Story = {
  args: {
    asChild: true,
    children: (
      <div>Not a button</div>
    ),
  },
}
