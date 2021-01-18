let fs = require('fs');
let path = require('path');
let errorAlert = document.querySelector('.error-alert');
let errorText = document.querySelector('.error-alert-text');

document.querySelector('.Diagram-button').addEventListener('click', () => {
    if(document.querySelector('.Graphic-button').classList.contains('selected')){
        document.querySelector('.Graphic-button').classList.remove('selected');
        document.querySelector('.Graphic-button').classList.add('buttons-animation');
    }
    document.querySelector('.Diagram-button').classList.add('selected');
    document.querySelector('.Diagram-button').classList.remove('buttons-animation');
});

document.querySelector('.Graphic-button').addEventListener('click', () => {
    if(document.querySelector('.Diagram-button').classList.contains('selected')){
        document.querySelector('.Diagram-button').classList.remove('selected');
        document.querySelector('.Diagram-button').classList.add('buttons-animation');
    }
    document.querySelector('.Graphic-button').classList.add('selected');
    document.querySelector('.Graphic-button').classList.remove('buttons-animation');
});

document.querySelector('.Go-button').addEventListener('click', async () => {
    let fileDate = {
        filePath: null,
        fileName: null,
        fileFormat: null,
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
                    fileDate.fileName = __.substring(0, __.indexOf('.'));;
                    if(filePath.value.includes('.')){
                        if(__.substring(__.indexOf('.')+1, __.length) != 'dgm' && __.substring(__.indexOf('.')+1, __.length) != 'gpc'){
                            errorAlert.style.display = 'block';
                            errorText.innerHTML = 'The format you entered in the file path is invalid, only <b>"DGM"</b> and <b>"GPC"</b> are allowed.';
                            return;
                        }
                        fileDate.fileFormat = __.substring(__.indexOf('.')+1, __.length);
                    }else{
                        fileDate.fileFormat = undefined;
                    }
                    if(document.querySelector('.Diagram-button').classList.contains('selected')){
                        if(fileDate.fileFormat == null || fileDate.fileFormat == undefined) fileDate.fileFormat = 'Diagram';
                        fileDate.fileTemplate = false;
                        if(fileDate.filePath != null && fileDate.fileName != null && fileDate.fileFormat != null, fileDate.fileTemplate != null){
                            ipcRenderer.sendTo(1, 'newFile', fileDate);
                        }else{
                            fileDate = {
                                filePath: null,
                                fileName: null,
                                fileFormat: null,
                                fileTemplate: null,
                            };
                        }
                    }else if(document.querySelector('.Graphic-button').classList.contains('selected')){
                        if(fileDate.fileFormat == null || fileDate.fileFormat == undefined) fileDate.fileFormat = 'Graphic';
                        fileDate.fileType = 'Graphic';
                        fileDate.fileTemplate = false;
                        if(fileDate.filePath != null && fileDate.fileName != null && fileDate.fileFormat != null, fileDate.fileTemplate != null){
                            fileTransfer.set('newFile', fileDate);
                            let file = fileTransfer.get('newFile');
                            console.log(file);
                            console.log(fileTransfer);
                        }else{
                            fileDate = {
                                filePath: null,
                                fileName: null,
                                fileFormat: null,
                                fileTemplate: null,
                            };
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
                    }
                }
            });
        }else{
            fs.stat(filePath.value, function (err, stats) {
                if(err){
                    errorAlert.style.display = 'block';
                    errorText.innerHTML = 'The file path is a invalid directory, correct it.';        
                }else if(stats.isDirectory() == false){
                    errorAlert.style.display = 'block';
                    errorText.innerHTML = 'The file path is a invalid directory, correct it.';            
                }else if(stats.isDirectory() == true){
                    fileDate.filePath = filePath.value;
                    fileDate.fileName = undefined,
                    fileDate.fileFormat = undefined
                }
            });
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
                    fileDate.fileName = __.substring(0, __.indexOf('.'));;
                    if(filePath.value.includes('.')){
                        if(__.substring(__.indexOf('.')+1, __.length) != 'dgm' && __.substring(__.indexOf('.')+1, __.length) != 'gpc'){
                            errorAlert.style.display = 'block';
                            errorText.innerHTML = 'The format you entered in the file path is invalid, only <b>"DGM"</b> and <b>"GPC"</b> are allowed.';
                            return;
                        }
                        fileDate.fileFormat = __.substring(__.indexOf('.')+1, __.length);
                    }else{
                        fileDate.fileFormat = undefined;
                    }
                    if(document.querySelector('.Diagram-button').classList.contains('selected')){
                        if(fileDate.fileFormat == null || fileDate.fileFormat == undefined) fileDate.fileFormat = 'Diagram';
                        fileDate.fileTemplate = false;
                        if(fileDate.filePath != null && fileDate.fileName != null && fileDate.fileFormat != null, fileDate.fileTemplate != null){
                            ipcRenderer.sendTo(1, 'newFile', fileDate);
                        }else{
                            fileDate = {
                                filePath: null,
                                fileName: null,
                                fileFormat: null,
                                fileTemplate: null,
                            };
                        }
                    }else if(document.querySelector('.Graphic-button').classList.contains('selected')){
                        if(fileDate.fileFormat == null || fileDate.fileFormat == undefined) fileDate.fileFormat = 'Graphic';
                        fileDate.fileType = 'Graphic';
                        fileDate.fileTemplate = false;
                        if(fileDate.filePath != null && fileDate.fileName != null && fileDate.fileFormat != null, fileDate.fileTemplate != null){
                            fileTransfer.set('newFile', fileDate);
                            let file = fileTransfer.get('newFile');
                            console.log(file);
                            console.log(fileTransfer);
                        }else{
                            fileDate = {
                                filePath: null,
                                fileName: null,
                                fileFormat: null,
                                fileTemplate: null,
                            };
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
                    }
                }
            });
        }else{
            fs.stat(filePath.value, function (err, stats) {
                if(err){
                    errorAlert.style.display = 'block';
                    errorText.innerHTML = 'The file path is a invalid directory, correct it.';        
                }else if(stats.isDirectory() == false){
                    errorAlert.style.display = 'block';
                    errorText.innerHTML = 'The file path is a invalid directory, correct it.';            
                }else if(stats.isDirectory() == true){
                    fileDate.filePath = filePath.value;
                    fileDate.fileName = undefined,
                    fileDate.fileFormat = undefined
                }
            });
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
                    fileDate.fileName = __.substring(0, __.indexOf('.'));;
                    if(filePath.value.includes('.')){
                        if(__.substring(__.indexOf('.')+1, __.length) != 'dgm' && __.substring(__.indexOf('.')+1, __.length) != 'gpc'){
                            errorAlert.style.display = 'block';
                            errorText.innerHTML = 'The format you entered in the file path is invalid, only <b>"DGM"</b> and <b>"GPC"</b> are allowed.';
                            return;
                        }
                        fileDate.fileFormat = __.substring(__.indexOf('.')+1, __.length);
                    }else{
                        fileDate.fileFormat = undefined;
                    }
                    if(document.querySelector('.Diagram-button').classList.contains('selected')){
                        if(fileDate.fileFormat == null || fileDate.fileFormat == undefined) fileDate.fileFormat = 'Diagram';
                        fileDate.fileTemplate = false;
                        if(fileDate.filePath != null && fileDate.fileName != null && fileDate.fileFormat != null, fileDate.fileTemplate != null){
                            ipcRenderer.sendTo(1, 'newFile', fileDate);
                        }else{
                            fileDate = {
                                filePath: null,
                                fileName: null,
                                fileFormat: null,
                                fileTemplate: null,
                            };
                        }
                    }else if(document.querySelector('.Graphic-button').classList.contains('selected')){
                        if(fileDate.fileFormat == null || fileDate.fileFormat == undefined) fileDate.fileFormat = 'Graphic';
                        fileDate.fileType = 'Graphic';
                        fileDate.fileTemplate = false;
                        if(fileDate.filePath != null && fileDate.fileName != null && fileDate.fileFormat != null, fileDate.fileTemplate != null){
                            fileTransfer.set('newFile', fileDate);
                            let file = fileTransfer.get('newFile');
                            console.log(file);
                            console.log(fileTransfer);
                        }else{
                            fileDate = {
                                filePath: null,
                                fileName: null,
                                fileFormat: null,
                                fileTemplate: null,
                            };
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
                    }
                }
            });
        }else{
            fs.stat(filePath.value, function (err, stats) {
                if(err){
                    errorAlert.style.display = 'block';
                    errorText.innerHTML = 'The file path is a invalid directory, correct it.';        
                }else if(stats.isDirectory() == false){
                    errorAlert.style.display = 'block';
                    errorText.innerHTML = 'The file path is a invalid directory, correct it.';            
                }else if(stats.isDirectory() == true){
                    fileDate.filePath = filePath.value;
                    fileDate.fileName = undefined,
                    fileDate.fileFormat = undefined
                }
            });
        }
    }
    
});
