import { Preview } from "@storybook/react";
import { useEffect } from "react";
import "../tailwind.css";

const DEFAULT_THEME = "light";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators: Preview['decorators'] = [
  (Story, context) => {
    const { theme } = context.globals;

    useEffect(() => {
      const htmlTag = document.documentElement;

      // Set the "data-mode" attribute on the iFrame html tag
      htmlTag.setAttribute("data-mode", theme || DEFAULT_THEME);
    }, [theme]);

    return Story();
  },
];

export const globalTypes: Preview['globalTypes'] = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: DEFAULT_THEME,
    toolbar: {
      icon: "paintbrush",
      // Array of plain string values or MenuItem shape (see below)
      items: [
        { value: "light", title: "Light", left: "🌞" },
        { value: "dark", title: "Dark", left: "🌛" },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export default preview;
