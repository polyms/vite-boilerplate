/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import "@testing-library/jest-dom/extend-expect";

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
