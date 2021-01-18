let fileManagerData = {
    totalFiles: 0,
    recentFiles: [],
    files: [],
    fileSelected: undefined,
}

fileManagerData.totalFiles = appOptions.openFiles.length;
fileManagerData.recentFiles = appOptions.recentFiles;
fileManagerData.files = appOptions.openFiles;

if(fileManagerData.totalFiles < 1){
    openWelcomeFile();
}else{
    for(var f=0;f < fileManagerData.totalFiles;f++){
        //openFile(file);
    }
}

let mainC = document.querySelector('.main-content');

ipcRenderer.on('newFile', (event, file) => {
    createNewFile(file);
});

async function openNewFileWindow(){
    ipcRenderer.invoke('newChildWindow', '../../views/newFile.ejs', {
        width: 800,
        height: 600,
        minWidth: 800,
        maxWidth: 800,
        minHeight: 500,
        maxHeight: 500,
        show: true,
        resizable: false,
        closable: false,
        movable: true,
        parent: 1
    }).then(async r => {
        if(r == false){
            ipcRenderer.invoke('logger', 'error', 'Error on load the New File Window');
        }
    });
}

async function createNewFile(file){
    if(fileManagerData.totalFiles == 1){
        if(fileManagerData.files[0].fileName == 'Welcome'){
            document.querySelector('.'+fileManagerData.files[0].fileKey).remove();
            fileManagerData.files = [];
            fileManagerData.totalFiles = 0;
        }
    } // DELETE WELCOME FILE IF THIS EXISTS
    fileManagerData.totalFiles++;
    file.fileKey = "f"+Math.random().toString(36).substring(2, 8);
    let fileName = file.filePath.substring(0, file.filePath.indexOf('.'))+'.ejs';
    await fs.appendFile(fileName, '<h1>Prueba de archivo</h1>', async () => {
        file.filePath = fileName;
        fileManagerData.files.push(file);
        await addToFileNavbar(file);
        await renderFile(file, document.querySelector('.filesNavbar').childNodes[document.querySelector('.filesNavbar').childNodes.length - 1]);
    });
}

        /* IMPORTANT FUNCTIONS */

function addToFileNavbar(file){
    let fileFormatIcon, fileFormat;
    if(file.fileFormat == 'Welcome'){
        fileFormatIcon = 'WelcomeIcon';
        fileFormat = 'txt';
    }else if(file.fileFormat == 'Diagram' || file.fileFormat == 'dgm'){
        fileFormatIcon = 'DiagramIcon';
        fileFormat = 'dgm';
    }else if(file.fileFormat == 'Graphic' || file.fileFormat == 'gpc'){
        fileFormatIcon = 'GraphicIcon';
        fileFormat = 'gpc';
    }

    if(file.fileName == undefined){
        file.fileName = file.fileKey;
    }

    try{
        let fileInNavbar = document.createElement("li");
        fileInNavbar.classList.add("no-drag");
        fileInNavbar.classList.add("pointer");
        fileInNavbar.classList.add("file");
        fileInNavbar.classList.add(file.fileKey);
        let htmlFile = `<img src="../public/img/${fileFormatIcon}.png">\n
        <span>${file.fileName}.${fileFormat}</span>\n
        <i class="material-icons tiny btn-close-file"">close</i>`
        fileInNavbar.innerHTML = htmlFile;
        fileInNavbar.addEventListener('click', (event) => {
            if(event.srcElement.innerText == 'close'){
                return;
            }else{
                if(fileManagerData.fileSelected == file.fileKey){
                    return;
                }else{
                    renderFile(file);
                }
            }
        });
        fileInNavbar.childNodes[4].addEventListener('click', () => {
            closeFile(file);
        });
        document.querySelector('.filesNavbar').insertBefore(fileInNavbar, null);
        return true;
    }catch(e){
        ipcRenderer.invoke('logger', 'error', e)
        return false;
    }
}

async function renderFile(file){
    if(file.filePath == "allFilesClosed"){
        let html = ejs.render('<%- include(path) %>', {path: path.join(__dirname, "noFiles.ejs")});
        mainC.innerHTML = html;
        ipcRenderer.invoke('discordRPC', {type: 'Idle', fileFormatIcon: 'nedramicon', imageText: 'https://github.com/KloutDevs/Nedram/'});
    }else if(file.filePath == undefined){
        let html = ejs.render('<%- include(path) %>', {path: path.join(__dirname, "welcomeFile.ejs")});
        mainC.innerHTML = html;
        document.querySelector('.'+file.fileKey).classList.add('fileSelected');
        if(fileManagerData.fileSelected != undefined){
           document.querySelector('.'+fileManagerData.fileSelected).classList.remove('fileSelected');
        }
        fileManagerData.fileSelected = file.fileKey;
        remote.getCurrentWindow().setTitle(file.fileName+' - Nedram');
        document.querySelector('.titleApp').innerHTML = file.fileName+' - Nedram';
        let fileFormatIcon, fileFormat, details, imageText, smallImage;
        if(file.fileFormat == 'Welcome'){
            fileFormatIcon = 'nedramicon';
            fileFormat = 'txt';
            details = 'In';
            imageText = 'https://github.com/KloutDevs/Nedram/';
            smallImage = undefined;
        }else if(file.fileFormat == 'Diagram'){
            fileFormatIcon = 'diagramicon';
            fileFormat = 'dgc';
            detals = 'Editing';
            imageText = 'Diagram File';
            smallImage = 'nedramicon';
        }else if(file.fileFormat == 'Graphic'){
            fileFormatIcon = 'graphicicon';
            fileFormat = 'gpc';
            detals = 'Editing';
            imageText = 'Diagram File';
            smallImage = 'nedramicon';
        }
        ipcRenderer.invoke('discordRPC', {type: 'Editing', fileFormatIcon: fileFormatIcon, fileFormat: fileFormat, details: details, imageText: imageText, smallImage: smallImage, file: file});
    }else{
        ejs.renderFile(file.filePath).then(html => {
            mainC.innerHTML = html;
        });
        document.querySelector('.'+file.fileKey).classList.add('fileSelected');
        if(fileManagerData.fileSelected != undefined){
           if(document.querySelector('.'+fileManagerData.fileSelected) != undefined){
            document.querySelector('.'+fileManagerData.fileSelected).classList.remove('fileSelected');
           }
        }
        fileManagerData.fileSelected = file.fileKey;
        remote.getCurrentWindow().setTitle(file.fileName+' - Nedram');
        document.querySelector('.titleApp').innerHTML = file.fileName+' - Nedram';
        let fileFormatIcon, fileFormat, details, imageText, smallImage;
        if(file.fileFormat == 'Welcome'){
            fileFormatIcon = 'nedramicon';
            fileFormat = 'txt';
            details = 'In';
            imageText = 'https://github.com/KloutDevs/Nedram/';
            smallImage = undefined;
        }else if(file.fileFormat == 'Diagram'){
            fileFormatIcon = 'diagramicon';
            fileFormat = 'dgc';
            detals = 'Editing';
            imageText = 'Diagram File';
            smallImage = 'nedramicon';
        }else if(file.fileFormat == 'Graphic'){
            fileFormatIcon = 'graphicicon';
            fileFormat = 'gpc';
            detals = 'Editing';
            imageText = 'Diagram File';
            smallImage = 'nedramicon';
        }
        ipcRenderer.invoke('discordRPC', {type: 'Editing', fileFormatIcon: fileFormatIcon, fileFormat: fileFormat, details: details, imageText: imageText, smallImage: smallImage, file: file});
    }
}

function closeFile(file){
    try{
        fileManagerData.totalFiles--;
        console.log(file.fileKey)
        let getFileItem = getItemWithKey(file.fileKey, fileManagerData.files);
        let remove = fileManagerData.files.splice(getFileItem.itemIndex, 1);
        console.log(getFileItem);
        console.log(fileManagerData.files);
        document.querySelector('.'+file.fileKey).remove();
        if(fileManagerData.fileSelected == file.fileKey) fileManagerData.fileSelected = undefined;
        if(getFileItem.itemIndex != 0){
            let file__ = fileManagerData.files[getFileItem.itemIndex - 1];
            renderFile(file__);
            return true;
        }else{
            let file_ = {
                filePath: "allFilesClosed"
            }
            renderFile(file_);
            return true;
        }
    }catch(e){
        ipcRenderer.invoke('logger', 'error', e);
        return false;
    }
}

async function openWelcomeFile(){
    fileManagerData.totalFiles++
    let fileData = {
        filePath: undefined,
        fileName: "Welcome",
        fileFormat: "Welcome",
        fileKey: "welcomeKey"
    }
    fileManagerData.files.push(fileData);
    await addToFileNavbar(fileData);
    await renderFile(fileData);
}

function getItemWithKey(key, arr){
    for(var ii=0;ii < arr.length;ii++){
        if(arr[ii].fileKey == key){
            let newData = {
                item: arr[ii],
                itemIndex: ii
            }
            return newData;
        }
    }
}
