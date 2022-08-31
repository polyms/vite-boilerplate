// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { contextBridge, ipcRenderer, Menu } from 'electron';

const electronAPI = {
  setTitle: (title: string) => ipcRenderer.send('window:title', title),
  minimize: () => ipcRenderer.send('window:event', 'minimize'),
  maximize: () => ipcRenderer.send('window:event', 'maximize'),
  isMaximized: () => ipcRenderer.sendSync('window:event', 'isMaximized') as boolean,
  close: () => ipcRenderer.send('window:event', 'close'),
  toggleDevTools: () => ipcRenderer.send('devTools'),
  onWindowMaximize: (callback: (isMaximized: boolean) => void) =>
    ipcRenderer.on('window:maximize', (e, val: boolean) => callback(val)),
  offWindowMaximize: (callback: (isMaximized: boolean) => void) =>
    ipcRenderer.off('window:maximize', (e, val: boolean) => callback(val)),
  getMenu: () => ipcRenderer.invoke('app:menu') as Promise<Menu>,
  zoomIn: () => ipcRenderer.send('window:event', 'zoom', 0.5),
  zoomOut: () => ipcRenderer.send('window:event', 'zoom', -0.5),
  actualSize: () => ipcRenderer.send('window:event', 'zoom'),
  versions: process.versions,
};

contextBridge.exposeInMainWorld('electron', electronAPI);

export type ElectronAPI = typeof electronAPI;
