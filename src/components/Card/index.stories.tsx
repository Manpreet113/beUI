import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Input } from "../Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from ".";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- Base Example ---

export const Default: Story = {
  name: "Full Card Example",
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input label="Project Name" placeholder="Name of your project" />
          <Input label="Framework" placeholder="e.g. Next.js" />
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

// --- New Stories ---

export const InteractiveCard: Story = {
  args: {
    isInteractive: true,
  },
  render: (args) => (
    <Card {...args}>
      <CardContent className="p-6">
        <p>This card lifts on hover. Click me!</p>
      </CardContent>
    </Card>
  ),
};

export const GlowingCard: Story = {
  args: {
    hasGlow: true,
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Special Offer</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card has a subtle glow to attract attention.</p>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  name: "Card With Image",
  render: () => (
    <Card>
      <CardImage
        src="https://images.unsplash.com/photo-1554629947-334ff61d85dc"
        alt="A beautiful landscape"
      />
      <CardHeader withDivider>
        <CardTitle>Mountain Retreat</CardTitle>
        <CardDescription>A perfect getaway.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Book your stay at our scenic mountain retreat, available for weekends and holidays.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Book Now</Button>
      </CardFooter>
    </Card>
  ),
};

export const OutlineVariant: Story = {
  name: "Variant: Outline",
  args: {
    variant: "outline",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Outline Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card uses the 'outline' variant.</p>
      </CardContent>
    </Card>
  ),
};