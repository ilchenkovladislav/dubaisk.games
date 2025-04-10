import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		outDir: "dist",
		rollupOptions: {
			input: {
				popup: resolve(__dirname, "src/popup/popup.js"),
			},
			output: {
				entryFileNames: (chunk) => {
					if (chunk.name === "popup") return "popup.js";
					return "[name].js";
				},
			},
		},
	},
	publicDir: "public",
});
