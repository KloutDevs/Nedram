        /* REQUIRES */

const { app, ipcMain, BrowserWindow } = require('electron');
const e_js = require('electron-ejs');
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');
const { createWindow } = require('./utils/BrowserWindow.js');
const discordRPC = require('./utils/discordRPC.js');
const { logger } = require('./utils/logger.js');
var appOptions = require('./appOptions.json');
var userOptions = require('./userOptions.json');
const desktopUser = os.userInfo();
const ejs = new e_js({"author": "KloutDevs"}, {debug: false})

        /* IF ISN'T PACKAGED, RELOAD THE WEBCONTENT */

if(app.isPackaged == false){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}

        /* IF APP HAVEN'T USEROPTIONS, DEFINE THIS */

if(userOptions.pathFiles == null && userOptions.dekstopUser == null){
    userOptions.pathFiles = desktopUser.homedir;
    userOptions.desktopUser = desktopUser;
    fs.writeFileSync('./userOptions.json', JSON.stringify(userOptions, null, 2));
    userOptions = require('./userOptions.json');
}
        // APP READY

app.on('ready', async () => {

    let options = {
        width: 800,
        height: 600,
        minHeight: 600,
        minWidth: 800,
        show: false,
        icon: path.join(__dirname, 'public/img/NedramIcon.png'),
        nodeIntegration: true
    } //    Main Window Options

                /* CREATE THE MAIN WINDOW */

    await createWindow(false, options, appOptions).then(async mainWindow => {
        mainWindow.setMenu(null); // DISABLE THE MENU ON MAIN WINDOW
        mainWindow.webContents.loadURL(url.format({ // LOAD THE INDEX EJS FILE
            pathname: path.join(__dirname, 'views/index.ejs'),
            protocol: 'file',
            slashes: true,
        }));

        mainWindow.show(); // SHOW THE MAIN WINDOW
            
                    // IPC EVENTS

        ipcMain.handle('app-minimize', async () => {
            if(mainWindow.isMinimized() == false){
                mainWindow.minimize();
                return true;
            }else{
                return false;
            }
        });

        ipcMain.handle('logger', async (event, level, arg) => {
            logger(level, arg)
            return true;
        });

        ipcMain.handle('recentDocumentsUpdate', async (event, entry) => {
            appOptions.recentFiles.push(entry);
            await fs.writeFileSync('./appOptions.json', JSON.stringify(appOptions, null, 2));
            appOptions = require('./appOptions.json');
        });
        
        ipcMain.handle('discordRPC', async (event, activity) => {

            let RPC, RPC_;
            await discordRPC.getClient.then(async(data) => {
                if(data == 'Could not connect'){
                    RPC = data;
                    RPC_ = true;
                }else if(data == 'connection closed'){
                    RPC = data;
                    RPC_ = true;
                }else if(data == 'RPC_CONNECTION_TIMEOUT'){
                    RPC = data;
                    RPC_ = true; // IF RPC Have a error
                }else{
                    RPC = data;
                    RPC_ = false; // If RPC haven't a error
                }
            });
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
    
        ipcMain.handle('newChildWindow', async (event, winPath, winOptions) => {
            let result = await createWindow(winPath, winOptions, appOptions);
            if(createWindow == false){
                return false;
            }else{
                result = result.id;
                return result;
            }
        });

    });

});

    // APP EVENTS

app.on('window-all-closed', () => {
    app.quit();
});
