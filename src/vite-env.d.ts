/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/// <reference types="vite/client" />
/// <reference types="vitest/globals" />
/// <reference types="vite-plugin-svgr/client" />
import { Root } from 'react-dom/client';
import { ElectronAPI } from './electron/preload';

// interface ImportMetaEnv {
//   readonly VITE_APP_TITLE: string;
//   // more env variables...
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  var __root__: Root | undefined;
  var electron: ElectronAPI;
}
