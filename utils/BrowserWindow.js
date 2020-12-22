const { BrowserWindow } = require('electron');
const { logger } = require('./logger.js');
const chalk = require('chalk');
const url = require('url');
const path = require('path');

async function createWindow(filePath, {width, height, minWidth, minHeight, maxWidth, maxHeight, center, closable, title, icon, parent, show, frame}, appOptions){

    try{
        let debug = appOptions.debugMode
        if(debug == true){
            logger('debug', `Trying to create a new ${chalk.red.bold('BrowserWindow')}.`);
        }

        const window = new BrowserWindow({
            width: (width) ? width : 800,
            height: (height) ? height : 800,
            minWidth: (minWidth) ? minWidth : 0,
            minHeight: (minHeight) ? minHeight : 0,
            maxWidth: (maxWidth) ? maxWidth : 1360,
            maxHeight: (maxHeight) ? maxHeight : 768,
            center: (center) ? center : true,
            closable: (closable) ? closable : true,
            title: (title) ? title : "Nedram",
            icon: (icon) ? icon : undefined,
            parent: (parent) ? parent : null,
            contextIsolation: false,
            frame: (frame) ? frame : true,
            show: (show) ? show : false,
            webPreferences: {
                nodeIntegration: true
            }
        });
    
        if(debug == true){
            logger('debug', `Trying to load a file type url. Path: ${chalk.yellow.bold(filePath)}`);
        }

        window.loadURL(url.format({
            pathname: filePath,
            protocol: 'file',
            slashes: true,
        }));

        if(debug == true){
            logger('debug', `Trying to show "${chalk.blue.bold('window')}"`);
        }

        if(!show || show == false){
            window.once('ready-to-show', () => {
                window.show();
            });
        }else{
            window.show();
        }

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
