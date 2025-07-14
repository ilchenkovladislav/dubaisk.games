import { defineConfig } from 'rolldown'
import copy from 'rollup-plugin-copy'
import watch from '../../rollup-plugin-watch/dist/plugin.mjs'

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
      watch({
        dir: 'src',
        include: ['**/*.css', '**/*.html'],
      }),
      copy({
        targets: [
          { src: 'assets/*', dest: 'build/assets' },
          { src: './src/popup/popup.html', dest: 'build/popup' },
          { src: './src/popup/popup.css', dest: 'build/popup' },
          { src: './src/content/content.css', dest: 'build/content' },
          { src: './src/styles/reset.css', dest: 'build/styles' },
          { src: './src/scripts/background.js', dest: 'build' },
          { src: './reload.js', dest: 'build' },
          { src: './manifest.json', dest: 'build' },
        ],
      }),
    ],
  },
])
