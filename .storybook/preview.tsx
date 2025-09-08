import type { Preview } from "@storybook/react-vite";
import React from "react";
import { Toaster } from "../src/components/Toaster";
import { ToastProvider } from "../src/hooks/use-toast";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
      <ToastProvider>
        <Story />
        <Toaster />
      </ToastProvider>
      </>
    ),
  ],
};

export default preview;
