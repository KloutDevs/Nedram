ipcRenderer.invoke('getMainWindowData', 'isMaximized').then(async (boolean) => {
    if(boolean == true){
        document.querySelector('#icon_restore').classList.remove('hide');
        document.querySelector('#icon_maximize').classList.add('hide');
    }else{
        document.querySelector('#icon_restore').classList.add('hide');
        document.querySelector('#icon_maximize').classList.remove('hide');
    }
});

document.querySelector('#btn-minimize').addEventListener('click', () => {
    ipcRenderer.invoke('app-minimize');
});
document.querySelector('#btn-maximize').addEventListener('click', () => {
    ipcRenderer.invoke('app-maximize');
    ipcRenderer.invoke('getMainWindowData', 'isMaximized').then(async (boolean) => {
        if(boolean == true){
            document.querySelector('#icon_restore').classList.remove('hide');
            document.querySelector('#icon_maximize').classList.add('hide');
        }else{
            document.querySelector('#icon_restore').classList.add('hide');
            document.querySelector('#icon_maximize').classList.remove('hide');
        }
    });
});
document.querySelector('#btn-close').addEventListener('click', () => {
    ipcRenderer.invoke('app-close');
});
document.querySelector('#btn-devTools').addEventListener('click', () => {
    ipcRenderer.invoke('openDevTools');
});
