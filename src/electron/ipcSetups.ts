import { BrowserWindow, ipcMain, Menu } from 'electron';

export default function ipcSetups(mainWindow: BrowserWindow) {
  ipcMain.on('devTools', () => {
    mainWindow.webContents.toggleDevTools();
  });

  ipcMain.on('window:title', (e, title: string) => {
    const webContents = e.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win?.setTitle(title);
  });

  ipcMain.handle(
    'app:menu',
    // eslint-disable-next-line @typescript-eslint/require-await
    async () =>
      JSON.parse(
        JSON.stringify(Menu.getApplicationMenu(), (key: string, value: unknown) =>
          key !== 'commandsMap' && key !== 'menu' ? value : undefined
        )
      ) as Menu
  );

  ipcMain.on('window:event', (e, ...args) => {
    const window = BrowserWindow.fromWebContents(e.sender);
    if (!window) return;

    switch (args[0] as string) {
      case 'minimize':
        mainWindow.minimize();
        break;
      case 'maximize':
        if (window.isMaximized()) window.unmaximize();
        else window.maximize();
        break;
      case 'close':
        mainWindow.close();
        break;
      case 'isMaximized':
        e.returnValue = mainWindow.isMaximized();
        break;
      case 'zoom': {
        const level = args[1] as number | undefined;
        mainWindow.webContents.setZoomLevel(
          level ? mainWindow.webContents.zoomLevel + level : 1
        );
        break;
      }
      default:
        break;
    }
  });

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window:maximize', true);
  });
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window:maximize', false);
  });
}
