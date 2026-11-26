import { defineConfig } from 'vite'; import react from '@vitejs/plugin-react';
// Build : tout le code de src/admin/ part dans un paquet à part, sous /assets-admin/, que Nginx ne sert qu'à un admin vérifié
// (auth_request → back /auth/admin-asset) ; le paquet principal ne contient aucune interface d'administration.
export default defineConfig({ plugins: [react()], server: { proxy: { '/api': { target: process.env.API_URL ?? 'http://localhost:3000', ws: true, rewrite: p => p.replace(/^\/api/, '') } } }, test: { environment: 'node' },
  build: { rollupOptions: { output: { manualChunks: id => (id.includes('/src/admin/') ? 'admin' : id.includes('node_modules') ? 'vendor' : 'app'), chunkFileNames: c => (c.name === 'admin' ? 'assets-admin/[name]-[hash].js' : 'assets/[name]-[hash].js') } } } });
