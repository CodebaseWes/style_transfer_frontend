import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }, 
  build: {
    rollupOptions: {
        input:{
            main: "index.html",
        },
        output: {
            // Prevent vendor.js being created
            manualChunks: undefined,
            // chunkFileNames: "zzz-[name].js",
            // this got rid of the hash on style.css
            assetFileNames: "assets/[name].[ext]",
            entryFileNames: "assets/[name].js",
        },
    },
  }
})
