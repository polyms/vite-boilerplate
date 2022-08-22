/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import path from 'node:path';

const testFileExtensions = ['js', 'cjs', 'mjs', 'ts', 'tsx', 'jsx'].join(',');
const exclude = [
  'coverage/**',
  '**/*.d.ts',
  'src/tests/**',
  // `test{,-*}.{${testFileExtensions}}`,
  `**/*.test.{${testFileExtensions}}`,
  '**/__tests__/**',
  'index.ts',
  'i18next.ts',
  'main.ts',
];
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
    //   modules: {
    //     generateScopedName: '[local]-[hash:base64:5]',
    //   },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: './src/tests/setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: false,
    clearMocks: true,
    coverage: {
      enabled: true,
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70,
      include: ['src'],
      exclude,
      reporter: ['json', 'json-summary', 'clover', 'html-spa'],
      reportsDirectory: './public/coverage',
    },
    silent: true,
  },
  resolve: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
  },
  plugins: [
    react(),
    svgr(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'react-bootstrap',
          esModule: true,
          resolveStyle: (name) => `react-bootstrap/${name}`,
        },
        {
          libraryName: 'lodash',
          esModule: true,
          resolveStyle: (name) => `lodash/${name}`,
        },
      ],
    }),
  ],
});
