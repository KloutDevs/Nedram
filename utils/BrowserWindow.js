const { BrowserWindow } = require('electron')
const url = require('url');
const path = require('path');

async function createWindow(filePath, {width, height}){

    try{
        const window = new BrowserWindow({
            width: width,
            height: height,
            webPreferences: {
                nodeIntegration: true
            }
        });
    
        window.loadURL(url.format({
            pathname: path.join(__dirname, filePath),
            protocol: 'file',
            slashes: true,
        }));
    }catch(e){
        console.log(e);
    }

}

module.exports = {
    createWindow
}
