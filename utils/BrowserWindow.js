const { BrowserWindow } = require('electron');
const { logger } = require('./logger.js');
const chalk = require('chalk');
const url = require('url');
const path = require('path');

async function createWindow(filePath, {width, height, minWidth, minHeight, maxWidth, maxHeight, center, closable, title, icon, parent}){

    try{
        const window = new BrowserWindow({
            width: width,
            height: height,
            show: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
    
        window.loadURL(url.format({
            pathname: path.join(__dirname, filePath),
            protocol: 'file',
            slashes: true,
        }));

        window.once('ready-to-show', () => {
            window.show();
        });

        return window;

    }catch(e){
        //logger('debug', '');
        //logger('error', '');
    }

}

module.exports = {
    createWindow
}
