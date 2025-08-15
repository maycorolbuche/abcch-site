import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve,dirname  } from 'path';
import { fileURLToPath } from 'url';
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'bootstrap-vue-next'
import { VitePWA } from "vite-plugin-pwa";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: process.env.VITE_BASE_URL ?? "/",
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
    VitePWA({
      registerType: "autoUpdate", // Registra o Service Worker para atualizar automaticamente
      devOptions: {
        enabled: true, // Ativa o PWA também durante o desenvolvimento
      },
      workbox: {
        globPatterns: ["**/*.{html,js,css,svg,png}"], // Arquivos que o Service Worker deve cachear
      },
      manifest: {
        name: "ABCCH - Associação Brasileira dos Criadores do Cavalo de Hipismo",
        short_name: "ABCCH",
        description: "Associação Brasileira dos Criadores do Cavalo Brasileiro de Hipismo",
        start_url: process.env.VITE_BASE_URL ?? "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
          {
            src: (process.env.VITE_BASE_URL ?? "/") + "favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: (process.env.VITE_BASE_URL ?? "/") + "favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src:
              (process.env.VITE_BASE_URL ?? "/") + "favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src:
              (process.env.VITE_BASE_URL ?? "/") + "favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 4001,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
