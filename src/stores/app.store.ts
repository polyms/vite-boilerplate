import create from 'zustand';

export const useAppConfig = create<AppState>(() => ({
  isMaximized: false,
  isMinimize: false,
  isFullscreen: false,
  title: '',
}));

export const { setState: setAppState, getState } = useAppConfig;
// window.setAppState = setAppState;
// ======================================================================================

export type AppState = {
  isMaximized: boolean;
  isMinimize: boolean;
  isFullscreen: boolean;
  title: string;
};
