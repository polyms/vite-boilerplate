/* eslint-disable no-console */
// Modules to control application life and create native browser window
import { app, BrowserWindow, Menu, MenuItem, MenuItemConstructorOptions } from 'electron';
import { join } from 'node:path';
import ipcSetups from './ipcSetups';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // icon: join(__dirname, '../favicon/favicon.png'),
    title: 'Polyms',
    // titleBarStyle: 'hidden',
    frame: false,
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    resizable: true,
    maximizable: true,
    // frame: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
    // transparent: false,
  });

  ipcSetups(mainWindow);

  // and load the index.html of the app.
  if (!app.isPackaged) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL as string);
  } else {
    mainWindow.loadFile(join(__dirname, '../index.html'));
  }
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

//-------------------------------------------------------------------
// Define the menu
//
// THIS SECTION IS NOT REQUIRED
//-------------------------------------------------------------------
const template: (MenuItemConstructorOptions | MenuItem)[] = [];
if (process.platform === 'darwin') {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: `About ${name}`,
        role: 'about',
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        },
      },
    ],
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(() => {
    if (process.platform === 'darwin') {
      // Create the Menu
      const name = app.getName();
      const dockMenu = Menu.buildFromTemplate([
        {
          label: name,
          submenu: [
            {
              label: `About ${name}`,
              role: 'about',
            },
            {
              label: 'Quit',
              accelerator: 'Command+Q',
              click() {
                app.quit();
              },
            },
          ],
        },
      ]);
      // Menu.setApplicationMenu(dockMenu);
      app.dock.setMenu(dockMenu);
    }
    return {};
  })
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .then(() => {
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
