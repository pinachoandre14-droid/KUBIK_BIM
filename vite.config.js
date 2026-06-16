import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Served from https://<user>.github.io/KUBIK_BIM/ on GitHub Pages.
  base: '/KUBIK_BIM/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
