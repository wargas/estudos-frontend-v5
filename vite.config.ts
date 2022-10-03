import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPath from 'vite-tsconfig-paths'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPath()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  mode: 'production',
  build: {
    sourcemap: false
  }
})
