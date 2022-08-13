/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
  },
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
    }),
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
