import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/251106/', // GitHub Pages용 설정 (Vercel 배포 시 주석 처리)
})

