import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: "dist/types",
    }),
    cssInjectedByJsPlugin(),
  ],
  css: {
    postcss: "./postcss.config.js", // Configuração do Tailwind
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "index",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "firebase", "firebase/firestore"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          firebase: "firebase",
          "firebase/firestore": "firebase.firestore",
        },
      },
    },
  },
});
