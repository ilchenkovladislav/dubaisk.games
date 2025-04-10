import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/content/content.js"),
			formats: ["iife"],
			name: "ContentScript",
		},
		outDir: "dist",
		emptyOutDir: false,
		rollupOptions: {
			output: {
				entryFileNames: "content/content.js",
			},
		},
	},
});
