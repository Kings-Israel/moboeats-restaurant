import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  base: process.env.NODE_ENV == 'production' ? 'https://partner.moboeats.co.uk' : '',
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  optimizeDeps: {
    include: [
        "@fawmi/vue-google-maps",
        "fast-deep-equal"
    ]
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server: {
    host: 'restaurant.moboeats.test',
    port: 3000
  }
})
