let fs = require('fs');
let errorAlert = document.querySelector('.error-alert');
let errorText = document.querySelector('.error-alert-text');
let isSelectedType;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.main-h1').classList.add('animate__animated');
    document.querySelector('.main-h1').classList.add('animate__backInDown');
});

if(remote.getCurrentWindow().isMaximized() == true){
    document.querySelector('#icon_restore').classList.remove('hide');
    document.querySelector('#icon_maximize').classList.add('hide');
}else if(remote.getCurrentWindow().isMaximized() == false){
    document.querySelector('#icon_restore').classList.add('hide');
    document.querySelector('#icon_maximize').classList.remove('hide');
}
document.querySelector('#btn-minimize').addEventListener('click', () => {
    if(remote.getCurrentWindow().isMinimized() == false){
        remote.getCurrentWindow().minimize();
    }
});
document.querySelector('#btn-maximize').addEventListener('click', () => {
    if(remote.getCurrentWindow().isMaximized() == true){
        remote.getCurrentWindow().unmaximize();
        document.querySelector('#icon_restore').classList.remove('hide');
        document.querySelector('#icon_maximize').classList.add('hide');
    }else if(remote.getCurrentWindow().isMaximized() == false){
        remote.getCurrentWindow().maximize();
        document.querySelector('#icon_restore').classList.add('hide');
        document.querySelector('#icon_maximize').classList.remove('hide');
    }
});
document.querySelector('#btn-close').addEventListener('click', () => {
    remote.getCurrentWindow().close();
});
document.querySelector('#btn-devTools').addEventListener('click', () => {
    if(remote.getCurrentWindow().webContents.isDevToolsOpened() == true){
        remote.getCurrentWindow().webContents.closeDevTools();
    }else{
        remote.getCurrentWindow().webContents.openDevTools();
    }
});
document.querySelector('.fa-times').addEventListener('click', () => {
    document.querySelector('.error-alert').style.display = 'none';
});
document.querySelector('.Diagram-button').addEventListener('click', () => {
    let diagramTemplates = document.getElementsByClassName('diagramTemplate');
    let graphicTemplates = document.getElementsByClassName('graphicTemplate');
    let diagramOptions = document.getElementsByClassName('diagramOption');
    let graphicOptions = document.getElementsByClassName('graphicOption');
    let selectFile = document.getElementsByClassName('selectFile');
    if(document.querySelector('.Graphic-button').classList.contains('selected')){
        if(document.querySelector('.graphicTemplate').style.opacity == "1"){
            for(let x=0;x < graphicTemplates.length;x++){
                graphicTemplates[x].style.height = "0.01px";
                graphicTemplates[x].style.opacity = "0%";
            }
        }
        if(document.querySelector('.graphicOption').style.display = 'block'){
            for(let z=0;z < graphicOptions.length;z++){
                graphicOptions[z].style.display = 'none';
            }
        }
        document.querySelector('.Graphic-button').classList.remove('selected');
        document.querySelector('.Graphic-button').classList.add('buttons-animation');
    }
    if(document.querySelector('.FileTemplate-button').style.backgroundColor == "seagreen"){
        for(let x=0;x < diagramTemplates.length;x++){
            diagramTemplates[x].style.height = "120.8125px";;
            diagramTemplates[x].style.opacity = "100%";
        }
    }
    for(var z=0;z < diagramOptions.length;z++){
        diagramOptions[z].style.display = 'block';
    }
    for(var x=0;x < selectFile.length;x++){
        selectFile[x].style.display = 'none';
    }
    document.querySelector('.Diagram-button').classList.add('selected');
    document.querySelector('.Diagram-button').classList.remove('buttons-animation');
});
document.querySelector('.Graphic-button').addEventListener('click', () => {
    let diagramTemplates = document.getElementsByClassName('diagramTemplate');
    let graphicTemplates = document.getElementsByClassName('graphicTemplate');
    let diagramOptions = document.getElementsByClassName('diagramOption');
    let graphicOptions = document.getElementsByClassName('graphicOption');
    let selectFile = document.getElementsByClassName('selectFile');
    if(document.querySelector('.Diagram-button').classList.contains('selected')){
        if(document.querySelector('.diagramTemplate').style.opacity == '1'){
            for(let x=0;x < diagramTemplates.length;x++){
                diagramTemplates[x].style.height = "0.01px";
                diagramTemplates[x].style.opacity = "0%";
            }
        }
        if(document.querySelector('.diagramOption').style.display = 'block'){
            for(let z=0;z < diagramOptions.length;z++){
                diagramOptions[z].style.display = 'none';
            }
        }
        document.querySelector('.Diagram-button').classList.remove('selected');
        document.querySelector('.Diagram-button').classList.add('buttons-animation');
    }
    if(document.querySelector('.FileTemplate-button').style.backgroundColor == "seagreen"){
        for(let x=0;x < graphicTemplates.length;x++){
            graphicTemplates[x].style.height = "120.8125px";;
            graphicTemplates[x].style.opacity = "100%";
        }
    }
    for(var z=0;z < graphicOptions.length;z++){
        graphicOptions[z].style.display = 'block';
    }
    for(var x=0;x < selectFile.length;x++){
        selectFile[x].style.display = 'none';
    }
    document.querySelector('.Graphic-button').classList.add('selected');
    document.querySelector('.Graphic-button').classList.remove('buttons-animation');
});
document.querySelector('.typesList-select').addEventListener('change', (e) => {
    isSelectedType = document.querySelector('.typesList-select').value;
});
document.querySelector('.FileTemplate-button').addEventListener('click', () => { 
    let buttonSwitch = document.querySelector('.FileTemplate-switchButton');
    let button = document.querySelector('.FileTemplate-button');
    let templatesContainer = document.querySelector('.templates-container');
    let diagramTemplates = document.getElementsByClassName('diagramTemplate');
    let graphicTemplates = document.getElementsByClassName('graphicTemplate');
    let diagramButton = document.querySelector('.Diagram-button');
    let graphicButton = document.querySelector('.Graphic-button');
    if(buttonSwitch.classList.contains('buttonSwitchOn') == true){
        buttonSwitch.classList.remove('buttonSwitchOn');
        button.style.backgroundColor = "#7a7a7aa2";
        buttonSwitch.style.borderColor = "#7a7a7aa2";
        templatesContainer.style.filter = "grayscale(100%)"
        if(diagramButton.classList.contains('selected') == true){
            for(let x=0;x < diagramTemplates.length;x++){
                diagramTemplates[x].style.height = "0.01px";
                diagramTemplates[x].style.opacity = "0%";
            }
        }else if(graphicButton.classList.contains('selected') == true){
            for(let x=0;x < graphicTemplates.length;x++){
                graphicTemplates[x].style.height = "0.01px";
                graphicTemplates[x].style.opacity = "0%";
            }
        }else{
            return;
        }
    }else{
        buttonSwitch.classList.add('buttonSwitchOn');
        button.style.backgroundColor = "seagreen";
        buttonSwitch.style.borderColor = "seagreen";
        templatesContainer.style.filter = "grayscale(0%)"
        if(diagramButton.classList.contains('selected') == true){
            for(let x=0;x < diagramTemplates.length;x++){
                diagramTemplates[x].style.height = "120.8125px";
                diagramTemplates[x].style.opacity = "100%";
            }
        }else if(graphicButton.classList.contains('selected') == true){
            for(let x=0;x < graphicTemplates.length;x++){
                graphicTemplates[x].style.height = "120.8125px";
                graphicTemplates[x].style.opacity = "100%";
            }
        }else{
            return;
        }
    }
});
document.querySelector('.Go-button').addEventListener('click', async () => {
    let fileDate = {
        filePath: null,
        fileName: null,
        fileFormat: null,
        fileType: null,
        fileTemplate: null,
    };
    let filePath = document.querySelector('.FilePath-input');

    if(document.querySelector('.error-alert').style.display == 'block'){
        document.querySelector('.error-alert').style.display = 'none';
    }

    if(filePath.value.includes('/')){
        if(filePath.value.lastIndexOf('/') + 1 != filePath.value.length){
            fs.stat(filePath.value.substring(0, filePath.value.lastIndexOf('/')), function(err, stats) {
                if(err){
                    errorAlert.style.display = 'block';
                    errorText.innerHTML = 'The file path is a invalid directory, correct it.';
                    return;    
                }else if(stats.isDirectory() == false){
                    errorAlert.style.display = 'block';
                    errorText.innerHTML = 'The file path is a invalid directory, correct it.';
                    return;           
                }else if(stats.isDirectory() == true){
                    fileDate.filePath = filePath.value;
                    let __ = filePath.value.substring(filePath.value.lastIndexOf('/')+1, filePath.value.length);
                    if(filePath.value.includes('.')){
                        fileDate.fileName = __.substring(0, __.indexOf('.'));;
                        if(__.substring(__.indexOf('.')+1, __.length) != 'dgm' && __.substring(__.indexOf('.')+1, __.length) != 'gpc'){
                            errorAlert.style.display = 'block';
                            errorText.innerHTML = 'The format you entered in the file path is invalid, only <b>"DGM"</b> and <b>"GPC"</b> are allowed.';
                            return;
                        }
                        fileDate.fileFormat = __.substring(__.indexOf('.')+1, __.length);
                    }else{
                        fileDate.fileName = __;
                        fileDate.fileFormat = undefined;
                    }
                    if(document.querySelector('.Diagram-button').classList.contains('selected')){
                        if(fileDate.fileFormat == null || fileDate.fileFormat == undefined) fileDate.fileFormat = 'Diagram';
                        fileDate.fileTemplate = false;
                        if(isSelectedType == undefined){
                            errorAlert.style.display = 'block';
                            errorText.innerHTML = 'You need to specify the type of diagram you want to create.';
                            return;
                        }else{
                            fileDate.fileType = isSelectedType;
                            if(fileDate.filePath != null && fileDate.fileName != null && fileDate.fileFormat != null, fileDate.fileTemplate != null){
                                ipcRenderer.sendTo(1, 'newFile', fileDate);
                                let newFileWindow = remote.getCurrentWindow();
                                newFileWindow.close();
                            }else{
                                fileDate = {
                                    filePath: null,
                                    fileName: null,
                                    fileFormat: null,
                                    fileType: null,
                                    fileTemplate: null,
                                };
                                return;
                            }
                        }
                    }else if(document.querySelector('.Graphic-button').classList.contains('selected')){
                        if(fileDate.fileFormat == null || fileDate.fileFormat == undefined) fileDate.fileFormat = 'Graphic';
                        fileDate.fileTemplate = false;
                        if(isSelectedType == undefined){
                            errorAlert.style.display = 'block';
                            errorText.innerHTML = 'You need to specify the type of graphic you want to create.';
                            return;
                        }else{
                            if(fileDate.filePath != null && fileDate.fileName != null && fileDate.fileFormat != null, fileDate.fileTemplate != null){
                                ipcRenderer.sendTo(1, 'newFile', fileDate);
                                let newFileWindow = remote.getCurrentWindow();
                                newFileWindow.close();
                            }else{
                                fileDate = {
                                    filePath: null,
                                    fileName: null,
                                    fileFormat: null,
                                    fileType: null,
                                    fileTemplate: null,
                                };
                                return;
                            }
                        }
                    }else{
                        errorAlert.style.display = 'block';
                        errorText.innerHTML = 'You have not selected the type of file you want, please correct this and try again.';
                        fileDate = {
                            filePath: null,
                            fileName: null,
                            fileFormat: null,
                            fileTemplate: null,
                        };
                        return;
                    }
                }
            });
        }else{
            errorAlert.style.display = 'block';
            errorText.innerHTML = 'The file path is a invalid directory, correct it.';
            return;
        }
    }else if(filePath.value.includes('\\')){
        filePath.value = filePath.value.replaceAll(/\\/g, '/');
        if(filePath.value.lastIndexOf('/') + 1 != filePath.value.length){
            fs.stat(filePath.value.substring(0, filePath.value.lastIndexOf('/')), function(err, stats) {
                if(err){
                    errorAlert.style.display = 'block';
                    errorText.innerHTML = 'The file path is a invalid directory, correct it.';
                    return;    
                }else if(stats.isDirectory() == false){
                    errorAlert.style.display = 'block';
                    errorText.innerHTML = 'The file path is a invalid directory, correct it.';
                    return;           
                }else if(stats.isDirectory() == true){
                    fileDate.filePath = filePath.value;
                    let __ = filePath.value.substring(filePath.value.lastIndexOf('/')+1, filePath.value.length);
                    if(filePath.value.includes('.')){
                        fileDate.fileName = __.substring(0, __.indexOf('.'));;
                        if(__.substring(__.indexOf('.')+1, __.length) != 'dgm' && __.substring(__.indexOf('.')+1, __.length) != 'gpc'){
                            errorAlert.style.display = 'block';
                            errorText.innerHTML = 'The format you entered in the file path is invalid, only <b>"DGM"</b> and <b>"GPC"</b> are allowed.';
                            return;
                        }
                        fileDate.fileFormat = __.substring(__.indexOf('.')+1, __.length);
                    }else{
                        fileDate.fileName = __;
                        fileDate.fileFormat = undefined;
                    }
                    if(document.querySelector('.Diagram-button').classList.contains('selected')){
                        if(fileDate.fileFormat == null || fileDate.fileFormat == undefined) fileDate.fileFormat = 'Diagram';
                        fileDate.fileTemplate = false;
                        if(isSelectedType == undefined){
                            errorAlert.style.display = 'block';
                            errorText.innerHTML = 'You need to specify the type of diagram you want to create.';
                            return;
                        }else{
                            fileDate.fileType = isSelectedType;
                            if(fileDate.filePath != null && fileDate.fileName != null && fileDate.fileFormat != null, fileDate.fileTemplate != null){
                                ipcRenderer.sendTo(1, 'newFile', fileDate);
                                let newFileWindow = remote.getCurrentWindow();
                                newFileWindow.close();
                            }else{
                                fileDate = {
                                    filePath: null,
                                    fileName: null,
                                    fileFormat: null,
                                    fileType: null,
                                    fileTemplate: null,
                                };
                                return;
                            }
                        }
                    }else if(document.querySelector('.Graphic-button').classList.contains('selected')){
                        if(fileDate.fileFormat == null || fileDate.fileFormat == undefined) fileDate.fileFormat = 'Graphic';
                        fileDate.fileTemplate = false;
                        if(isSelectedType == undefined){
                            errorAlert.style.display = 'block';
                            errorText.innerHTML = 'You need to specify the type of graphic you want to create.';
                            return;
                        }else{
                            if(fileDate.filePath != null && fileDate.fileName != null && fileDate.fileFormat != null, fileDate.fileTemplate != null){
                                ipcRenderer.sendTo(1, 'newFile', fileDate);
                                let newFileWindow = remote.getCurrentWindow();
                                newFileWindow.close();
                            }else{
                                fileDate = {
                                    filePath: null,
                                    fileName: null,
                                    fileFormat: null,
                                    fileType: null,
                                    fileTemplate: null,
                                };
                                return;
                            }
                        }
                    }else{
                        errorAlert.style.display = 'block';
                        errorText.innerHTML = 'You have not selected the type of file you want, please correct this and try again.';
                        fileDate = {
                            filePath: null,
                            fileName: null,
                            fileFormat: null,
                            fileTemplate: null,
                        };
                        return;
                    }
                }
            });
        }else{
            errorAlert.style.display = 'block';
            errorText.innerHTML = 'The file path is a invalid directory, correct it.';
            return;
        }
    }else{
        filePath.value = userOptions.pathFiles.replaceAll(/\\/g, '/')+'/'+filePath.value;
        if(filePath.value.lastIndexOf('/') + 1 != filePath.value.length){
            fs.stat(filePath.value.substring(0, filePath.value.lastIndexOf('/')), function(err, stats) {
                if(err){
                    errorAlert.style.display = 'block';
                    errorText.innerHTML = 'The file path is a invalid directory, correct it.';
                    return;    
                }else if(stats.isDirectory() == false){
                    errorAlert.style.display = 'block';
                    errorText.innerHTML = 'The file path is a invalid directory, correct it.';
                    return;           
                }else if(stats.isDirectory() == true){
                    fileDate.filePath = filePath.value;
                    let __ = filePath.value.substring(filePath.value.lastIndexOf('/')+1, filePath.value.length);
                    if(filePath.value.includes('.')){
                        fileDate.fileName = __.substring(0, __.indexOf('.'));;
                        if(__.substring(__.indexOf('.')+1, __.length) != 'dgm' && __.substring(__.indexOf('.')+1, __.length) != 'gpc'){
                            errorAlert.style.display = 'block';
                            errorText.innerHTML = 'The format you entered in the file path is invalid, only <b>"DGM"</b> and <b>"GPC"</b> are allowed.';
                            return;
                        }
                        fileDate.fileFormat = __.substring(__.indexOf('.')+1, __.length);
                    }else{
                        fileDate.fileName = __;
                        fileDate.fileFormat = undefined;
                    }
                    if(document.querySelector('.Diagram-button').classList.contains('selected')){
                        if(fileDate.fileFormat == null || fileDate.fileFormat == undefined) fileDate.fileFormat = 'Diagram';
                        fileDate.fileTemplate = false;
                        if(isSelectedType == undefined){
                            errorAlert.style.display = 'block';
                            errorText.innerHTML = 'You need to specify the type of diagram you want to create.';
                            return;
                        }else{
                            fileDate.fileType = isSelectedType;
                            if(fileDate.filePath != null && fileDate.fileName != null && fileDate.fileFormat != null, fileDate.fileTemplate != null){
                                ipcRenderer.sendTo(1, 'newFile', fileDate);
                                let newFileWindow = remote.getCurrentWindow();
                                newFileWindow.close();
                            }else{
                                fileDate = {
                                    filePath: null,
                                    fileName: null,
                                    fileFormat: null,
                                    fileType: null,
                                    fileTemplate: null,
                                };
                                return;
                            }
                        }
                    }else if(document.querySelector('.Graphic-button').classList.contains('selected')){
                        if(fileDate.fileFormat == null || fileDate.fileFormat == undefined) fileDate.fileFormat = 'Graphic';
                        fileDate.fileTemplate = false;
                        if(isSelectedType == undefined){
                            errorAlert.style.display = 'block';
                            errorText.innerHTML = 'You need to specify the type of graphic you want to create.';
                            return;
                        }else{
                            if(fileDate.filePath != null && fileDate.fileName != null && fileDate.fileFormat != null, fileDate.fileTemplate != null){
                                ipcRenderer.sendTo(1, 'newFile', fileDate);
                                let newFileWindow = remote.getCurrentWindow();
                                newFileWindow.close();
                            }else{
                                fileDate = {
                                    filePath: null,
                                    fileName: null,
                                    fileFormat: null,
                                    fileType: null,
                                    fileTemplate: null,
                                };
                                return;
                            }
                        }
                    }else{
                        errorAlert.style.display = 'block';
                        errorText.innerHTML = 'You have not selected the type of file you want, please correct this and try again.';
                        fileDate = {
                            filePath: null,
                            fileName: null,
                            fileFormat: null,
                            fileTemplate: null,
                        };
                        return;
                    }
                }
            });
        }else{
            errorAlert.style.display = 'block';
            errorText.innerHTML = 'The file path is a invalid directory, correct it.';
            return;
        }
    }
    
});
document.querySelector('.Cancel-button').addEventListener('click', async () => {
    let newFileWindow = remote.getCurrentWindow();
    newFileWindow.close();
});
