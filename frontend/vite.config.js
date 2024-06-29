import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.VITE_SERVER_PORT || 7970}`,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
