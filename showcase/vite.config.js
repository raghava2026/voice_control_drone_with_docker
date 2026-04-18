import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const proxyTarget = process.env.VITE_PROXY_TARGET || 'http://localhost:8002'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['onnxruntime-web'],
  },
  server: {
    port: 5173,
    proxy: {
      '/health': { target: proxyTarget, changeOrigin: true, secure: false },
      '/telemetry': { target: proxyTarget, changeOrigin: true, secure: false },
      '/text-command': { target: proxyTarget, changeOrigin: true, secure: false },
      '/voice-command': { target: proxyTarget, changeOrigin: true, secure: false },
      '/transcribe': { target: proxyTarget, changeOrigin: true, secure: false },
      '/command': { target: proxyTarget, changeOrigin: true, secure: false },
      '/stt': { target: proxyTarget, changeOrigin: true, secure: false },
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
})
