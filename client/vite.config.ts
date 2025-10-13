import react from '@vitejs/plugin-react'
import * as path from 'node:path'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'
import packageJson from './package.json' with { type: 'json' }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@ui': path.resolve(import.meta.dirname, './src/components/ui'),
      '@pages': path.resolve(import.meta.dirname, './src/components/pages'),
      '@assets': path.resolve(import.meta.dirname, './src/assets'),
      '@svg': path.resolve(import.meta.dirname, './src/assets/svg'),
      '@constants': path.resolve(import.meta.dirname, './src/constants'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@store': path.resolve(import.meta.dirname, './src/store'),
      '@theme': path.resolve(import.meta.dirname, './src/theme'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
      '@styles': path.resolve(import.meta.dirname, './src/styles'),
      '@types': path.resolve(import.meta.dirname, './src/types'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@styles/media.scss" as *;
          @use "@styles/variables.scss" as *;
        `,
      },
    },
  },

  server: {
    open: true,
  },

  test: {
    root: import.meta.dirname,
    name: packageJson.name,
    environment: 'jsdom',

    typecheck: {
      enabled: true,
      tsconfig: path.join(import.meta.dirname, 'tsconfig.json'),
    },

    globals: true,
    watch: false,
    setupFiles: ['./src/setupTests.ts'],
  },
})
