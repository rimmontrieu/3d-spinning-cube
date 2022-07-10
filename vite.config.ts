
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base:'',
  build:{
    rollupOptions:{
      output:{
        assetFileNames:'[name]-[hash][extname]'
      }
    }
  },
  server:{
    host:'0.0.0.0',
    port:3535,
    watch:{
      usePolling:true
    }
  }
})
