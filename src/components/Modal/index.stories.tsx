import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from ".";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- Base Example ---

export const Default: Story = {
  name: "Recipe: Full Example",
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[425px]">
        <ModalHeader>
          <ModalTitle>Edit Profile</ModalTitle>
          <ModalDescription>
            Make changes to your profile here. Click save when you're done.
          </ModalDescription>
        </ModalHeader>
        <div className="grid gap-4 py-4">
          <Input label="Name" defaultValue="Manpreet" />
          <Input label="Username" defaultValue="@manpreet" />
        </div>
        <ModalFooter>
          <Button type="submit">Save changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// --- Variants ---

export const OutlineVariant: Story = {
  name: "Variant: Outline",
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open Outline Modal</Button>
      </ModalTrigger>
      <ModalContent variant="outline" className="sm:max-w-[425px]">
        <ModalHeader>
          <ModalTitle>Outline Variant</ModalTitle>
          <ModalDescription>
            This modal uses the 'outline' variant for a different look.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Destructive: Story = {
  name: "Recipe: Destructive Action",
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="solid" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete Account</Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-sm">
        <ModalHeader>
          <ModalTitle>Are you sure?</ModalTitle>
          <ModalDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">
            Cancel
          </Button>
          <Button variant="solid" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Yes, delete account
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

// --- Edge Cases ---

export const ScrollingContent: Story = {
  name: "Edge Case: Scrolling Content",
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Terms of Service</Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-lg">
        <ModalHeader>
          <ModalTitle>Terms of Service</ModalTitle>
        </ModalHeader>
        <div className="prose max-h-[60vh] overflow-y-auto p-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. ... and so on.
            You should place a lot more text here to demonstrate scrolling.
            For the purpose of this example, we'll repeat this paragraph multiple times.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. ... and so on.
            You should place a lot more text here to demonstrate scrolling.
            For the purpose of this example, we'll repeat this paragraph multiple times.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. ... and so on.
            You should place a lot more text here to demonstrate scrolling.
            For the purpose of this example, we'll repeat this paragraph multiple times.
          </p>
        </div>
        <ModalFooter>
          <Button>Accept</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// --- Advanced Usage ---

export const ControlledModal: Story = {
  name: "Recipe: Controlled State",
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Controlled Modal</Button>
        <Modal open={isOpen} onOpenChange={setIsOpen}>
          <ModalContent className="sm:max-w-sm">
            <ModalHeader>
              <ModalTitle>Are you sure?</ModalTitle>
              <ModalDescription>
                This action cannot be undone.
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="solid" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <p className="mt-4 text-sm text-muted-foreground">
          Modal is currently: {isOpen ? "Open" : "Closed"}
        </p>
      </div>
    );
  },
};