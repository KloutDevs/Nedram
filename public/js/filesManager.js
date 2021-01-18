let fileManagerData = {
    totalFiles: 1, // fileNavbar already have a childNode "#text"
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
            fileManagerData.files = [];
            fileManagerData.totalFiles = 0;
            document.querySelector('.filesNavbar').childNodes[1].remove();
        }
    }
    fileManagerData.totalFiles++;
    let fileName = file.filePath.substring(0, file.filePath.indexOf('.'));
    await fs.appendFile(fileName+'.ejs', '<h1>Prueba</h1>', async () => {
        file.filePath = fileName+'.ejs';
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
    try{
        let fileInNavbar = document.createElement("li");
        fileInNavbar.classList.add("no-drag");
        fileInNavbar.classList.add("pointer");
        fileInNavbar.classList.add("file");
        let htmlFile = `<img src="../public/img/${fileFormatIcon}.png">\n
        <span>${file.fileName}.${fileFormat}</span>\n
        <i class="material-icons tiny btn-close-file"">close</i>`
        fileInNavbar.innerHTML = htmlFile;
        fileInNavbar.addEventListener('click', (event) => {
            if(event.srcElement.childNodes.length <= 1){
                return;
            }else{
                renderFile(file, document.querySelector('.filesNavbar').childNodes.length - 1);
            }
        });
        fileInNavbar.childNodes[4].addEventListener('click', () => {
            closeFile(document.querySelector('.filesNavbar').childNodes.length - 1);
        });
        document.querySelector('.filesNavbar').insertBefore(fileInNavbar, null);
        return true;
    }catch(e){
        ipcRenderer.invoke('logger', 'error', e)
        return false;
    }
}

async function renderFile(file, childNodeElement){
    if(file.filePath == "allFilesClosed" && childNodeElement == undefined){
        let html = ejs.render('<%- include(path) %>', {path: path.join(__dirname, "noFiles.ejs")});
        mainC.innerHTML = html;
        ipcRenderer.invoke('discordRPC', {type: 'Idle', fileFormatIcon: 'nedramicon', imageText: 'https://github.com/KloutDevs/Nedram/'});
    }else if(file.filePath == undefined){
        let html = ejs.render('<%- include(path) %>', {path: path.join(__dirname, "welcomeFile.ejs")});
        mainC.innerHTML = html;
        childNodeElement.classList.add('fileSelected');
        let title = await ipcRenderer.invoke('titleUpdate', file.fileName);
        document.querySelector('.titleApp').innerHTML = title;
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
        console.log(file.filePath);
        ejs.renderFile(file.filePath).then(html => {
            mainC.innerHTML = html;
        });
        childNodeElement.classList.add('fileSelected');
        let title = await ipcRenderer.invoke('titleUpdate', file.fileName);
        document.querySelector('.titleApp').innerHTML = title;
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

function closeFile(childNodeElement){
    try{
        fileManagerData.totalFiles--;
        document.querySelector('.filesNavbar').childNodes[childNodeElement].remove();
        if(childNodeElement > 1){
            let file = fileManagerData.files[childNodeElement -1];
            renderFile(file, childNodeElement - 1);
            return true;
        }else{
            let file = {
                filePath: "allFilesClosed"
            }
            renderFile(file, undefined);
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
        fileFormat: "Welcome"
    }
    fileManagerData.files.push(fileData);
    await addToFileNavbar(fileData);
    await renderFile(fileData, document.querySelector('.filesNavbar').childNodes[document.querySelector('.filesNavbar').childNodes.length - 1]);
}
