import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    // Develope
    return {
      plugins: [react()],
    };
  } else {
    // Build
    return {
      base: "/react-redux/",
      plugins: [react()],
    };
  }
});
