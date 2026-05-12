import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      objects: path.resolve(__dirname, 'src/objects'),
      states: path.resolve(__dirname, 'src/states'),
      services: path.resolve(__dirname, 'src/services'),
      animations: path.resolve(__dirname, 'src/animations'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  },
  optimizeDeps: {
    exclude: ['phaser'],
  },
});
