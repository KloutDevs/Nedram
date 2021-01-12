const { app, ipcMain } = require('electron');
const e_js = require('electron-ejs');
const path = require('path');
const url = require('url');
const os = require('os');
const { createWindow } = require('./utils/BrowserWindow.js');
const { createView } = require('./utils/BrowserView.js');
const { logger } = require('./utils/logger.js');
const appOptions = require('./appOptions.json');
const userOptions = require('./userOptions.json');
const DiscordRPC = require('./utils/discordRPC.js');
const desktopUser = os.userInfo();
const ejs = new e_js({"author": "KloutDevs"}, {debug: false})

if(app.isPackaged == false){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}

    // APP READY

app.on('ready', async () => {

    let options = {
        mainWindow: {
            width: 800,
            height: 600,
            minHeight: 600,
            minWidth: 800,
            show: true,
            nodeIntegration: true
        },
        mainView: {
            backgroundColor: "#23232355",
            nodeIntegration: true
        }
    }

    await createWindow(false, options.mainWindow, appOptions).then(async mainWindow => {
        await createView(options.mainView, appOptions).then(async mainView => {
            mainWindow.setMenu(null);
            mainWindow.webContents.loadURL(url.format({
                pathname: path.join(__dirname, 'views/index.ejs'),
                protocol: 'file',
                slashes: true,
            }));
            mainWindow.show();

            let appData = new Map();
            appData.set("app", app);
            appData.set("createWindow", createWindow);
            appData.set("createView", createView);
            appData.set("logger", logger);
            appData.set("appOptions", appOptions);
            appData.set("userOptions", userOptions);
            appData.set("dRPC", DiscordRPC);
            appData.set("desktopUser", desktopUser);

                // IPC EVENTS

            ipcMain.handle('app-minimize', async () => {
                if(mainWindow.isMinimized() == false){
                    mainWindow.minimize();
                    return true;
                }else{
                    return false;
                }
            });

            ipcMain.handle('app-maximize', async () => {
                if(mainWindow.isMaximized() == false){
                    mainWindow.maximize();
                    return true;
                }else{
                    mainWindow.unmaximize();
                    return true;
                }
            });

            ipcMain.handle('app-close', async () => {
                app.quit();
                return true;
            });

            ipcMain.handle('openDevTools', async () => {
                if(mainWindow.webContents.isDevToolsOpened() == false){
                    mainWindow.webContents.openDevTools();
                    return true;
                }else{
                    return false;
                }
            });

            ipcMain.handle('setAppData', async (event, key, value) => {
                appData.set(key, value);
            });

            ipcMain.handle('getAppData', async (event, key) => {
                appData.get(key);
            });

            ipcMain.handle('getMainWindowData', async (event, key) => {
                let value;
                if(key == 'isFocused'){
                    if(mainWindow.isFocused() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isDestroyed'){
                    if(mainWindow.isDestroyed() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isVisible'){
                    if(mainWindow.isVisible() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isModal'){
                    if(mainWindow.isModal() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isMaximized'){
                    if(mainWindow.isMaximized() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isMinimized'){
                    if(mainWindow.isMinimized() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isFullscreen'){
                    if(mainWindow.isFullscreen()() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isSimpleFullscreen'){
                    if(mainWindow.isSimpleFullscreen() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isNormal'){
                    if(mainWindow.isNormal() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isEnabled'){
                    if(mainWindow.isEnabled() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isResizable'){
                    if(mainWindow.isResizable() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isMovable'){
                    if(mainWindow.isMovable() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isMinimizable'){
                    if(mainWindow.isMinimizable() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isMaximizable'){
                    if(mainWindow.isMaximizable() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isFullscreenable'){
                    if(mainWindow.isFullscreenable() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isClosable'){
                    if(mainWindow.isClosable() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isAlwaysOnTop'){
                    if(mainWindow.isAlwaysOnTop() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isKiosk'){
                    if(mainWindow.isKiosk() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isDocumentEdited'){
                    if(mainWindow.isDocumentEdited() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isMenuBarAutoHide'){
                    if(mainWindow.isMenuBarAutoHide() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isMenuBarVisible'){
                    if(mainWindow.isMenuBarVisible() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }else if(key == 'isVisibleOnAllWorkspaces'){
                    if(mainWindow.isVisibleOnAllWorkspaces() == true){
                        value = true;
                    }else{
                        value = false;
                    }
                }
                return value;
            });

            DiscordRPC.connect();

        });
    });

});

    // APP EVENTS

app.on('window-all-closed', () => {
    app.quit();
});
