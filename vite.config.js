import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      objects: path.resolve(__dirname, 'src/objects'),
      scenes: path.resolve(__dirname, 'src/scenes'),
      services: path.resolve(__dirname, 'src/services'),
      animations: path.resolve(__dirname, 'src/animations'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  },
});
