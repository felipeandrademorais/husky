import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/setupTests.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
        },
        deps: {
            inline: ["vitest-canvas-mock"],
        },
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: path.resolve(__dirname, "src"),
            },
        ],
    },
});
