import type { Meta, StoryObj } from "@storybook/react-vite";
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

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[425px]">
        <ModalHeader>
          <ModalTitle>Edit profile</ModalTitle>
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