const { app } = require('electron');
const { createWindow } = require('../Nedram/utils/BrowserWindow.js');
const appOptions = require('./appOptions.json');
const url = require('url');
const path = require('path');

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}

let mainWindow;

app.on('ready', () => {
    mainWindow = createWindow('views/index.html', {width: 800, height: 600}, appOptions);
});
