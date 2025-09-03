import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../Button"
import { Input } from "../Input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "."

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // We wrap the stories in a div to give them some space
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
}

export default meta
type Story = StoryObj<typeof meta>

// --- Stories ---

export const Default: Story = {
  name: "Full Card Example",
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>
          Deploy your new project in one-click.
        </CardDescription>
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
}

export const Simple: Story = {
  name: "Simple Card",
  render: () => (
    <Card>
      <CardContent className="p-6">
        <p>This is a simple card with just content inside.</p>
      </CardContent>
    </Card>
  ),
}

export const WithHeaderAndFooter: Story = {
  name: "Header and Footer Only",
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Invite new members to the team.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Invite a member</Button>
      </CardFooter>
    </Card>
  ),
}