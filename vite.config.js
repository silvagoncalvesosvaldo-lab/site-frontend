import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      // remove ou ajuste se realmente precisar dos externos
      external: []
    }
  }
})
