import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    dedupe: ["graphql"],
    alias: {
      graphql: resolve(__dirname, "node_modules/graphql/index.js"),
    },
  },
  test: {
    globals: true,
    environment: "node",
    pool: "vmThreads",
    include: ["src/tests/**/*.test.ts"],
    setupFiles: ["./src/tests/setup.ts"],
    server: {
      deps: {
        inline: ["graphql", "mercurius", "graphql-type-json"],
      },
    },
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/generated/**", "src/data/**", "src/tests/**"],
    },
  },
});
