/// <reference types="vite/client" />
/// <reference types="vitest/globals" />
/// <reference types="vite-plugin-svgr/client" />
import { Root } from 'react-dom/client';

// interface ImportMetaEnv {
//   readonly VITE_APP_TITLE: string;
//   // more env variables...
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

declare global {
  // eslint-disable-next-line vars-on-top, no-var, @typescript-eslint/naming-convention, no-underscore-dangle
  var __root__: Root | undefined;
}
