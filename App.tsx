import React from "react";
import { Navigator } from "./src/navigation";
import { ThemeProvider } from "./src/utils/theme/theme.provider";

export default function App() {
  return (
    <ThemeProvider>
      <Navigator />
    </ThemeProvider>
  );
}
