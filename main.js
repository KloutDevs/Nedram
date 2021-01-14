const { app, ipcMain } = require('electron');
const e_js = require('electron-ejs');
const path = require('path');
const url = require('url');
const { createWindow } = require('./utils/BrowserWindow.js');
const { createView } = require('./utils/BrowserView.js');
const discordRPC = require('./utils/discordRPC.js');
const { logger } = require('./utils/logger.js');
const appOptions = require('./appOptions.json');
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
            show: false,
            icon: path.join(__dirname, 'public/img/NedramIcon.png'),
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

            ipcMain.handle('getMainWindow', async (event, key) => {
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

            ipcMain.handle('titleUpdate', async (event, newTitle) => {
                mainWindow.setTitle(newTitle+' - Nedram');
                return newTitle+' - Nedram';
            });

            ipcMain.handle('logger', async (event, level, arg) => {
                logger(level, arg)
                return true;
            });
            
            let RPC, RPC_;
            await discordRPC.getClient.then(async(Client) => {
                if(Client == 'Could not connect'){
                    RPC = Client;
                    RPC_ = true;
                }else if(Client == 'connection closed'){
                    RPC = Client;
                    RPC_ = true;
                }else if(Client == 'rpc_connection_timeout'){
                    RPC = Client;
                    RPC_ = true; // IF RPC Have a error
                }else{
                    RPC = Client;
                    RPC_ = false; // If RPC haven't a error
                }
            });

            ipcMain.handle('discordRPC', async (event, activity) => {
                if(RPC_ == true) return;
                let timelapse = new Date().getTime();
                RPC.setActivity({
                    details: (activity.type == 'Editing') ? `${activity.details} ${activity.file.fileName}.${activity.fileFormat}` : 'Idle',
                    state: `Beta ${appOptions.appVersion}`,
                    startTimestamp: timelapse,
                    largeImageKey: activity.fileFormatIcon,
                    largeImageText: activity.imageText,
                    smallImageKey: (activity.smallImage != undefined) ? activity.smallImage : undefined,
                    smallImageText: (activity.smallImage != undefined) ? 'https://github.com/KloutDevs/Nedram/' : undefined,
                    instance: false,
                });
            });

        });
    });

});

    // APP EVENTS

app.on('window-all-closed', () => {
    app.quit();
});
