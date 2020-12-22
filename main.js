const { app } = require('electron');
const { createWindow } = require('../Nedram/utils/BrowserWindow.js');
const { logger } = require('./utils/logger.js');
const appOptions = require('./appOptions.json');
const url = require('url');
const path = require('path');

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}


app.on('ready', async () => {
    await createWindow(path.join(__dirname, 'views/index.html'), {width: 800, height: 600, show: true}, appOptions).then(window => {
        window.setMenu(null);
    });
});
