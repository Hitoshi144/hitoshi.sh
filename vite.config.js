import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  base: '/hitoshi.sh/',
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets',
          dest: 'src/assets'
        }
      ]
    })
  ],
})
