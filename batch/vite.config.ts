/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    sequence: {
      concurrent: false,
    },
    globals: true,
    silent: true,
    reporters: ["verbose"],
  },
});
