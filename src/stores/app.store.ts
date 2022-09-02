import create from 'zustand';

export const useAppConfig = create<AppState>(() => ({
  isMaximized: false,
  isMinimize: false,
  isFullscreen: false,
}));

export const { setState: setAppState, getState } = useAppConfig;
// window.setAppState = setAppState;
// ======================================================================================

export type AppState = {
  isMaximized: boolean;
  isMinimize: boolean;
  isFullscreen: boolean;
};
