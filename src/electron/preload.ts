// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { contextBridge, ipcRenderer, IpcRendererEvent, Menu } from 'electron';
import type { AppState, setAppState } from '~/stores/app.store';

const electronAPI = {
  setTitle: (title: string) => ipcRenderer.send('window:title', title),
  minimize: () => ipcRenderer.send('window:event', 'minimize'),
  maximize: () => ipcRenderer.send('window:event', 'maximize'),
  isMaximized: () => ipcRenderer.sendSync('window:event', 'isMaximized') as boolean,
  onWindowStateChange: (callback: typeof setAppState) =>
    ipcRenderer.on('window:event', (e, args: Partial<AppState>) => callback(args)),
  fullscreen: () => ipcRenderer.send('window:event', 'fullscreen'),
  getWindowState: () => ipcRenderer.sendSync('window:event') as AppState,
  close: () => ipcRenderer.send('window:event', 'close'),
  toggleDevTools: () => ipcRenderer.send('devTools'),
  getMenu: () => ipcRenderer.invoke('app:menu') as Promise<Menu>,
  zoomIn: () => ipcRenderer.send('window:event', 'zoom', 0.5),
  zoomOut: () => ipcRenderer.send('window:event', 'zoom', -0.5),
  actualSize: () => ipcRenderer.send('window:event', 'zoom'),
  setBadge: (newBadge: string) => ipcRenderer.invoke('app:badge', newBadge),
  versions: process.versions,
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronAPI);

// ======================================================================================

export type ElectronAPI = typeof electronAPI;

export type Channels = 'ipc-demo';
