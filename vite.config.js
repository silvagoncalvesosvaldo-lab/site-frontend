import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  },
  preview: {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  },
})
