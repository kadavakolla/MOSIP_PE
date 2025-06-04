import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Allows external access
    allowedHosts: ['.ngrok-free.app'], // Allows ngrok URLs
  },
});
