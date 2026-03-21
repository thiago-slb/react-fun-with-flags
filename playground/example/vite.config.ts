import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const playgroundRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: playgroundRoot,
  plugins: [react()],
});
