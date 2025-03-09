/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import "./test/setup";

export default defineConfig({
  test: {
    // setupFiles: "./test/setup.ts",
    globals: true,
    silent: false, // エラー詳細を出すために `false` にする
    reporters: ["verbose"],
  },
});
