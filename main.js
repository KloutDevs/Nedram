const { app } = require('electron');
const ejs_electron = require('electron-ejs');
const path = require('path');
const {createWindow} = require('./utils/BrowserWindow.js');
const {logger} = require('./utils/logger.js');
const appOptions = require('./appOptions.json');
const ejs = new ejs_electron({
    "developer": "Klout",
    "openFiles": [],
    "mainWindowWidth": 800,
    "mainWindowHeight": 600
}, {views: path.join(__dirname, 'views'), debug: false});

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}


app.on('ready', async () => {
    await createWindow(path.join(__dirname, 'views/windowStart.ejs'), {width: 800, height: 600, minHeight: 600, minWidth: 800, show: true}, appOptions).then(window => {
        window.setMenu(null);

    });
});
