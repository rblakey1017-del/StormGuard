import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'StormGuard',
        short_name: 'StormGuard',
        description: 'AI Storm Damage Scanner & Alerts',
        theme_color: '#0e1729',
        background_color: '#09090b',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'https://i.imgur.com/WHWgnpB.jpeg',   // Your logo
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any maskable'
          },
          {
            src: 'https://i.imgur.com/WHWgnpB.jpeg',   // Same for larger icon
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ],
      },
    }),
  ],
});