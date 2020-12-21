const { BrowserWindow } = require('electron');
const { logger } = require('./logger.js');
const chalk = require('chalk');
const url = require('url');
const path = require('path');

async function createWindow(filePath, {width, height, minWidth, minHeight, maxWidth, maxHeight, center, closable, title, icon, parent}, appOptions){

    try{
        let debug = appOptions.debugMode
        if(debug == true){
            logger('debug', `Trying to create a new ${chalk.red.bold('BrowserWindow')}.`);
        }

        const window = new BrowserWindow({
            width: width,
            height: height,
            minWidth: minWidth,
            minHeight: minHeight,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            center: center,
            closable: closable,
            title: title,
            icon: icon,
            parent: parent,
            show: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
    
        if(debug == true){
            logger('debug', `Trying to load a file type url. Path: ${chalk.yellow.bold(filePath)}`);
        }

        window.loadURL(url.format({
            pathname: path.join(__dirname, filePath),
            protocol: 'file',
            slashes: true,
        }));

        if(debug == true){
            logger('debug', `Trying to show "${chalk.blue.bold('window')}"`);
        }

        window.once('ready-to-show', () => {
            window.show();
        });

        if(debug == true){
            logger('debug', `A new BrowserWindow was successfully created. Path: ${chalk.green.bold(filePath)}`);
        }
        return window;

    }catch(e){
        logger('error', `An error occurred trying to create a new BrowserWindow. ${chalk.red.bold(e)}`);
    }

}

module.exports = {
    createWindow
}
