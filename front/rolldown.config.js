import { defineConfig } from 'rolldown'
import copy from 'rollup-plugin-copy'

export default defineConfig([
  // Popup script
  {
    input: './src/popup/popup.jsx',
    output: {
      file: 'build/popup/popup.js',
      format: 'umd',
    },
  },
  // Content script
  {
    input: './src/content/content.js',
    output: {
      file: 'build/content/content.js',
      format: 'umd',
    },
    plugins: [
      copy({
        targets: [
          { src: 'assets/*', dest: 'build/assets' },
          { src: './src/popup/popup.html', dest: 'build/popup' },
          { src: './src/popup/popup.css', dest: 'build/popup' },
          { src: './src/content/content.css', dest: 'build/content' },
          { src: './src/styles/reset.css', dest: 'build/styles' },
          { src: './manifest.json', dest: 'build' },
        ],
      }),
    ],
  },
])
