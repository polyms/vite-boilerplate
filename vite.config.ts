import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import electron from 'vite-plugin-electron';
import path from 'node:path';
import fs from 'node:fs';

fs.rmSync('dist', { recursive: true, force: true }); // v14.14.0

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
    reportCompressedSize: false,
    // minify: true,
  },
  css: {
    devSourcemap: true,
    //   modules: {
    //     generateScopedName: '[local]-[hash:base64:5]',
    //   },
  },
  resolve: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [
    react(),
    svgr(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'react-bootstrap',
          esModule: false,
          resolveStyle: (name) => `react-bootstrap/${name}`,
          libraryNameChangeCase: 'pascalCase',
        },
        {
          libraryName: 'lodash',
          esModule: false,
          resolveStyle: (name) => `lodash/${name}`,
          libraryNameChangeCase: 'camelCase',
        },
      ],
    }),
    electron({
      entry: ['src/electron/main.ts', 'src/electron/preload.ts'],
      vite: {
        build: {
          outDir: 'dist/electron',
        },
      },
    }),
  ],
});
