/* eslint-disable no-console */
// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron';
import { join } from 'node:path';
import { setupBuilder } from './builder';
import ipcSetups from './ipcSetups';
import { version } from '../../package.json';

const appName = 'Polyms Boilerplate';

const iconPath = join(
  __dirname,
  app.isPackaged ? '../favicon/favicon.png' : '../../public/favicon/favicon.png'
);

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: iconPath,
    title: 'Polyms',
    // titleBarStyle: 'hidden',
    titleBarOverlay: true,
    frame: false,
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    resizable: true,
    maximizable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
    // transparent: false,
  });

  ipcSetups(mainWindow);
  setupBuilder(mainWindow);

  // and load the index.html of the app.
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, '../index.html'));
  }
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.setName(appName);

if (process.platform === 'darwin' && !app.isPackaged) {
  app.dock.setIcon(iconPath);
}

app.setAboutPanelOptions({
  iconPath,
  applicationName: appName,
  applicationVersion: 'Beta',
  version: `v${version}`,
  copyright: 'Copyright © 2011-2021 Polyms.\n All rights reserved.',
});

app.whenReady().then(() => {
  createWindow();

  return app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin')
  app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
