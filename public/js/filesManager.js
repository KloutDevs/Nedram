let fileManagerData = {
    totalFiles: 1, // fileNavbar already have a childNode "#text"
    files: [],
    fileSelected: undefined,
}

fileManagerData.totalFiles = appOptions.openFiles.length;
fileManagerData.files = appOptions.openFiles;

if(fileManagerData.totalFiles < 1){
    openWelcomeFile();
}else{

}

let mainC = document.querySelector('.main-content');

function openFile(){

}

function addToFileNavbar(file){
    let fileFormatIcon, fileFormat;
    if(file.fileFormat == 'Welcome'){
        fileFormatIcon = 'WelcomeIcon';
        fileFormat = 'txt';
    }else if(file.fileFormat == 'Diagram'){
        fileFormatIcon = 'DiagramIcon';
        fileFormat = 'dgc';
    }else if(file.fileFormat == 'Graphic'){
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
        fileInNavbar.childNodes[4].addEventListener('click', () => {
            closeFile(document.querySelector('.filesNavbar').childNodes.length - 1);
        });
        document.querySelector('.filesNavbar').insertBefore(fileInNavbar, null);
        return true;
    }catch(e){
        console.error(e);
        return false;
    }
}

async function renderFile(file, childNodeElement){
    if(file.filePath == "allFilesClosed" && childNodeElement == undefined){
        let html = ejs.render('<%- include(path) %>', {path: path.join(__dirname, "noFiles.ejs")});
        mainC.innerHTML = html;
        ipcRenderer.invoke('discordRPC', {type: 'Editing', fileFormatIcon: 'nedramicon', imageText: 'https://github.com/KloutDevs/Nedram/'});
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
        let html = ejs.render('<%- include(path) %>', {path: path.join(__dirname, file.filePath)});
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
        console.error(e);
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
