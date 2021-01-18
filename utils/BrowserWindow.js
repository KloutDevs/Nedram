const { BrowserWindow } = require('electron');
const { logger } = require('./logger.js');
const chalk = require('chalk');
const url = require('url');
const path = require('path');

async function createWindow(filePath, {width, height, minWidth, minHeight, maxWidth, maxHeight, fullscreen, fullscreenable, paintWhenInitiallyHidden, resizable, transparent, backgroundColor, center, closable, title, icon, parent, show, modal, frame, nodeIntegration}, appOptions){

    try{

        let debug = appOptions.debugMode;
        if(debug == undefined) debug = require('../appOptions.json').debugMode;

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
            fullscreen: (fullscreen) ? fullscreen : false,
            fullscreenable: (fullscreenable) ? fullscreenable : true,
            paintWhenInitiallyHidden: (paintWhenInitiallyHidden) ? paintWhenInitiallyHidden : false,
            resizable: (resizable) ? resizable : false,
            transparent: (transparent) ? transparent : false,
            backgroundColor: (backgroundColor) ? backgroundColor : "#fff",
            center: (center) ? center : true,
            closable: (closable) ? closable : true,
            title: (title) ? title : "Nedram",
            icon: (icon) ? icon : path.join(__dirname, '../public/img/NedramIcon.png'),
            parent: (parent) ? parent : null,
            contextIsolation: false,
            modal: (modal) ? modal : false,
            frame: (frame) ? frame : false,
            show: (show) ? show : false,
            webPreferences: {
                nodeIntegration: true,//(nodeIntegration) ? nodeIntegration : true,
                enableRemoteModule: true
            }
        });
    
        if(filePath !== false){
            if(debug == true){
                logger('debug', `Trying to load a file type url. Path: ${chalk.yellow.bold(filePath)}`);
            }
            window.loadURL(url.format({
                pathname: filePath,
                protocol: 'file',
                slashes: true,
            }));
        }

        //window

        if(show && show == true){
            if(debug == true){
                logger('debug', `Trying to show "${chalk.blue.bold('window')}"`);
            }
            window.once('ready-to-show', () => {
                window.show();
            });
        }

        if(debug == true){
            logger('debug', `A new BrowserWindow was successfully created. Path: ${chalk.green.bold(filePath)}`);
        }
        return window;

    }catch(e){
        logger('error', `An error occurred trying to create a new BrowserWindow. ${chalk.red.bold(e)}`);
        console.error(e);
        return false;
    }

}

module.exports = {
    createWindow
}
