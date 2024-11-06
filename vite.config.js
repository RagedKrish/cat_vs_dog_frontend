// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/predict': {
        target: 'https://cat-vs-dog-backend.onrender.com', // Update with your backend URL
        changeOrigin: true,
      },
    },
  },
});

