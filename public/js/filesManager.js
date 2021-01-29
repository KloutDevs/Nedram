const { ipcRenderer } = require("electron");

                        /* DATA */
let fileManagerData = {
    totalFiles: 0,
    recentFiles: [],
    files: new Map(),
    fileSelected: undefined
}

fileManagerData.totalFiles = appOptions.openFiles.length;
fileManagerData.recentFiles = appOptions.recentFiles;
if(fileManagerData.totalFiles > 0){
    // If the app already have open files
    for(let x=0;x < appOptions.openFiles.length;x++){
        let fileKey = "f"+Math.random().toString(36).substring(2, 8); // <-- New file key...
        appOptions.openFiles[x].fileKey = fileKey; // Set the new file Key to file
        updateFilesList(appOptions.openFiles[x]); // Add the file in filesNavbar and Open Files section of explorer
        renderFile(appOptions.openFiles[x]); // Render file
    }
}else{
    let welcomeFile = {
        filePath: undefined,
        fileName: "Welcome",
        fileFormat: "txt",
        fileKey: "f0000000"
    }
    updateFilesList(welcomeFile); // Add welcome.txt to files list
    renderFile(welcomeFile); // Render welcomeFile.ejs
}
                        /* UPDATE FILES LIST PROCESS */
async function updateFilesList(__file){
    if(__file.fileName == undefined) __file.fileName = 'Without name'; // Set a name if this haven't
    let __fIcon;
    switch(__file.fileFormat){ // Set file icon by the file format
        case 'txt':
            __fIcon = 'WelcomeIcon';
            break;
        case 'dgm':
            __fIcon = 'DiagramIcon';
            break;
        case 'gpc':
            __fIcon = 'GraphicIcon';
            break;
    }
    try{
        let element = document.createElement("li"); // Create the element
        element.classList.add("no-drag");
        element.classList.add("pointer");
        element.classList.add("file");
        element.classList.add(__file.fileKey); // Add files class and the fileKey
        let html = `<img src="../public/img/${__fIcon}.png">\n
        <span>${__file.fileName}.${__file.fileFormat}</span>\n
        <i class="material-icons tiny btn-close-file"">close</i>` // Set the html
        element.innerHTML = html; // Enter the html into element
        element.addEventListener('click', (event) => { // Add a event listener for the element
            if(event.srcElement.innerText == 'close'){
                closeFile(__file.fileKey); // If the click target is the close button, close the file
            }else{ // On the contrary render the file
                if(fileManagerData.fileSelected == __file.fileKey){
                    return; // If the file selected is already this file, return none
                }else{
                    renderFile(__file); // If the file selected isn't this file, render the file
                }
            }
        });
        document.querySelector('.filesNavbar').insertBefore(element, null); // Insert the element into the files navbar
        fileManagerData.files.set(__file.fileKey, __file); // Enter the file into to fleManagerData files map
        fileManagerData.totalFiles++ // Increment the total files count
        if(__file.fileManager == undefined){
            setManager(__file); // Set the manager for the file if it haven't
        }
        return true; // Return true
    }catch(e){ // If an error ocurrs, send a log for the console and one notification for user
        ipcRenderer.invoke('logger', 'error', e); // Send the error for console
        ipcRenderer.sendTo(1, 'newNotification', {type: 'error', module: 'filesManager', message: 'Code fm00u1'}); // Send the error code for the user
        return false; // Return false
    }
}
                        /* RENDER PROCESS */
async function renderFile(__file){
    if(__file.filePath == "noFiles"){ // If no file is open, render noFiles.ejs
        let html = ejs.render('<%- include(path) %>', {path: path.join(__dirname, "noFiles.ejs")});
        document.querySelector('.main-content').innerHTML = html;
        remote.getCurrentWindow().setTitle('No files open - Nedram'); // Update the app title out of html
        document.querySelector('.titleApp').innerHTML = 'No files open - Nedram'; // Update the app title in html
        ipcRenderer.invoke('discordRPC', {type: 'Idle', fileFormatIcon: 'nedramicon', imageText: 'https://github.com/KloutDevs/Nedram'}); // Update activity
    }else if(__file.filePath == undefined){ // If no files open already, render welcomeFile.ejs
        let html = ejs.render('<%- include(path) %>', {path: path.join(__dirname, "welcomeFile.ejs")});
        document.querySelector('.main-content').innerHTML = html;
        document.querySelector(`.${__file.fileKey}`).classList.add('fileSelected'); // Set the welcomeFile as selected file
        fileManagerData.fileSelected = __file.fileKey; // Set the file selected
        remote.getCurrentWindow().setTitle(__file.fileName+' - Nedram'); // Update the app title out of html
        document.querySelector('.titleApp').innerHTML = __file.fileName+' - Nedram'; // Update the app title in html
        updateActivity(__file); // Update activity
    }else{
        ejs.renderFile(__file.filePath).then(html => {
            document.querySelector('.main-content').innerHTML = html; // Render the file with ejs and enter into main content
        });
        document.querySelector(`.${__file.fileKey}`).classList.add('fileSelected'); // Set the file as selected file
        if(fileManagerData.fileSelected != undefined){ // If fileManager have a file Selected, delete this
            if(document.querySelector(`.${fileManagerData.fileSelected}` != undefined)){
                document.querySelector(`.${fileManagerData.fileSelected}`).classList.remove('fileSelected');
            }
        }
        fileManagerData.fileSelected = __file.fileKey; // Set the file as selected file
        remote.getCurrentWindow().setTitle(__file.fileName+' - Nedram'); // Set the app title out of html
        document.querySelector('.titleApp').innerHTML = __file.fileName+' - Nedram'; // Set the app title in html
        updateActivity(__file); // Update activity
    }
}
                        /* ASIGN MANAGER PROCESS */
async function setManager(__file){
    switch(__file.fileType){
        case 'flow':
            let file = fileManagerData.files.get(__file.fileKey);
            file.fileManager = new FlowChart(false, file); // Create a new Diagram
            fileManagerData.files.set(__file.fileKey, file);
            break;
    }
}
                        /* OPEN FILE */
async function openFile(__path){
    let __file = {
        filePath: __path,
        fileName: undefined,
        fileFormat: undefined,
        fileKey: undefined
    }
    if(__path.lastIndexOf('.') == -1 && __path.lastIndexOf('/')+1 != __path.length){ // If path haven't format, but have directory and name
        ipcRenderer.sendTo(1, 'newNotification', {type: 'error', module: 'filesManager', message: 'Code nf000b3'}); // Return a error
        return;
    }else if(__path.lastIndexOf('.') != -1 && __path.lastIndexOf('/') != -1){ // If path have format, name, and directory
        __file.fileName = __path.substring(__path.lastIndexOf('/')+1, __path.lastIndexOf('.')); // Get the file Name
        __file.fileFormat = __path.substring(__path.lastIndexOf('.')+1); // Get the file Format
    }else if(__path.lastIndexOf('.') != -1 && __path.lastIndexOf('/') == -1){ // If path have format and name but haven't directory
        __file.filePath = userOptions.pathFiles.replaceAll(/\\/g, '/')+'/'+__path; // Set the file Path
        __file.fileName = __path.substring(0, __path.lastIndexOf('.')); // Get the file Name
        __file.fileFormat = __path.substring(__path.lastIndexOf('.')+1); // Get the file Format
    }
    __path.fileKey = "f"+Math.random().toString(36).substring(2, 8); // Generate a new key for the file
    if(fileManagerData.totalFiles == 1){ // If fileManager have a one open file, and it is the welcomeFile, delete this.
        if(fileManagerData.files.get('f0000000') != undefined){
            document.querySelector('.f0000000').remove(); // Remove the welcomeFile of the DOM
            fileManagerData.files.delete('f0000000');
            fileManagerData.totalFiles--; // Decrease the open files count
            if(fileManagerData.fileSelected == 'f0000000'){ // Remove the welcomeFile as selected file
                fileManagerData.fileSelected = undefined;
            }
        }
    }
    await updateFilesList(__file); // Update the file list and file navbar
    await renderFile(__file); // Render the file
    appOptions.recentFiles.push(__file); // Add the file on the recentFiles array
    fileManagerData.recentFiles.push(__file); // Add the file on the recentFiles array in fileManager
    if(appOptions.recentFiles.length > 5){ // If recentFiles array already have 5 items, remove the first item
        appOptions.recentFiles.shift();
        fileManagerData.recentFiles.shift();
    }
}
                        /* CLOSE PROCESS */
async function closeFile(key){
    let __file = fileManagerData.files.get(key);
    try{
        document.querySelector(`.${__file.fileKey}`).remove();
    }catch(e){
        ipcRenderer.invoke('logger', 'error', e);
        ipcRenderer.sendTo(1, 'newNotification', {type: 'error', module: 'filesManager', message: 'Code fm000c1'})
    }
    try{
        fileManagerData.files.delete(__file.fileKey);
        fileManagerData.totalFiles--;
    }catch(e){
        ipcRenderer.invoke('logger', 'error', e);
        ipcRenderer.sendTo(1, 'newNotification', {type: 'error', module: 'filesManager', message: 'Code fm000c2'})
    }
    try{
        if(fileManagerData.totalFiles > 0){
            let keys = Array.from(fileManagerData.files.keys());
            let file = keys[Math.floor(Math.random() * keys.length)];
            renderFile(file);
        }else{
            renderFile({filePath: "allFilesClosed"});
        }
    }catch(e){
        ipcRenderer.invoke('logger', 'error', e);
        ipcRenderer.sendTo(1, 'newNotification', {type: 'error', module: 'filesManager', message: 'Code fm000c3'})
    }
    return;
}
                        /* CREATING A NEW FILE PROCESS */
async function openNewFileWindow(){
    ipcRenderer.invoke('newChildWindow', '../../views/newFile.ejs', {
        width: 800,
        height: 600,
        minWidth: 800,
        maxWidth: 800,
        minHeight: 500,
        show: true,
        resizable: false,
        closable: true,
        movable: true,
        parent: 1
    }).then(async response => {
        if(response == false){
            ipcRenderer.sendTo(1, 'newNotification', {type: 'error', module: 'filesManager', message: 'Code nf000a1'});
            ipcRenderer.invoke('logger', 'error', 'Error on load the New File Window');
        }
    });
}
async function createNewFile(__file){
    if(fileManagerData.totalFiles == 1){ // If fileManager have a one open file, and it is the welcomeFile, delete this.
        if(fileManagerData.files.get('f0000000') != undefined){
            document.querySelector('.f0000000').remove(); // Remove the welcomeFile of the DOM
            fileManagerData.files.delete('f0000000');
            fileManagerData.totalFiles--; // Decrease the open files count
            if(fileManagerData.fileSelected == 'f0000000'){ // Remove the welcomeFile as selected file
                fileManagerData.fileSelected = undefined;
            }
        }
    }
    __file.fileKey = "f"+Math.random().toString(36).substring(2, 8); // Generate a new file key for the file
    __file.filePath = __file.filePath.substring(0, __file.filePath.indexOf('.'));  //------------------------|
    __file.filePath = __file.filePath+".html"; // For now, the file will be converted to html for testing  <-|
    let html = "<!DOCTYPE html><html>    <head></head>    <body></body></html>"
    await fs.appendFile(__file.filePath, html, async () => { // Create the file in the path if it not exists
        await updateFilesList(__file); // Add the file in file list and file navbar
        await renderFile(__file); // render the new File
        appOptions.recentFiles.push(__file); // Add the file on the recentFiles array
        fileManagerData.recentFiles.push(__file); // Add the file on the recentFiles array in fileManager
        if(appOptions.recentFiles.length > 5){ // If recentFiles array already have 5 items, remove the first item
            appOptions.recentFiles.shift();
            fileManagerData.recentFiles.shift();
        }
    });
}
                        /* UPDATE DISCORD RPC PROCESS */
async function updateActivity(d){
    switch(d.fileFormat){
        case 'txt': // Set the options for txt file
            d.options.type = 'Editing';
            d.options.fileFormatIcon = 'nedramicon';
            d.options.details = 'In';
            d.options.imageText = 'https://github.com/KloutDevs/Nedram';
            d.options.file = d;
            break;
        case 'dgm': // Set the options for dgm file
            d.options.type = 'Editing';
            d.options.fileFormatIcon = 'diagramicon';
            d.options.details = 'Editing';
            d.options.imageText = 'Diagram File';
            d.options.smallImage = 'nedramicon';
            d.options.smallText = 'https://github.com/KloutDevs/Nedram';
            d.options.file = d;
            break;
        case 'gpc': // Set the options for gpc file
            d.options.type = 'Editing';
            d.options.fileFormatIcon = 'graphicicon';
            d.options.details = 'Editing';
            d.options.imageText = 'Graphic File';
            d.options.smallImage = 'nedramicon';
            d.options.smallText = 'https://github.com/KloutDevs/Nedram';
            d.options.file = d;
            break;
    }
    ipcRenderer.invoke('discordRPC', d.options); // Update activity with the options previously defined
}
                        /* EVENTS LISTENERS */
ipcRenderer.on('newFile', (event, __file) => { // Receiver of the new files data
    createNewFile(__file); // Create the new file
});
