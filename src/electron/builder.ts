import { app, BrowserWindow } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
// autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

//-------------------------------------------------------------------
// Open a window that displays the version
//
// THIS SECTION IS NOT REQUIRED
//
// This isn't required for auto-updates to work, but it's easier
// for the app to show a window than to have to click "About" to see
// that updates are working.
//-------------------------------------------------------------------

export function setupBuilder(win: BrowserWindow) {
  const sendStatusToWindow = (text: string) => {
    log.info(text);
    win.webContents.send('message', text);
  };

  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  });
  autoUpdater.on('update-available', (info) => {
    sendStatusToWindow(`Update available. ${info.version}`);
  });
  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow(`Update not available. ${info.version}`);
  });
  autoUpdater.on('error', (err) => {
    sendStatusToWindow(`Error in auto-updater. ${err.message}`);
  });
  autoUpdater.on('download-progress', (progressObj) => {
    let logMsg = `Download speed: ${progressObj.bytesPerSecond}`;
    logMsg = `${logMsg} - Downloaded ${progressObj.percent}%`;
    logMsg = `${logMsg} (${progressObj.transferred}/${progressObj.total})`;
    sendStatusToWindow(logMsg);
  });
  autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow(`Update downloaded: ${info.version}`);
  });

  app.on('ready', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}
