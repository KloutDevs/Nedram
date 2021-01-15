ipcRenderer.invoke('getMainWindow', 'isMaximized').then(async (boolean) => {
    if(boolean == true){
        document.querySelector('#icon_restore').classList.remove('hide');
        document.querySelector('#icon_maximize').classList.add('hide');
    }else{
        document.querySelector('#icon_restore').classList.add('hide');
        document.querySelector('#icon_maximize').classList.remove('hide');
    }
});

document.querySelector('#filesNavbarList').addEventListener("mousewheel", () => {
    hScroll('filesNavbarList');
});

document.querySelector('#btn-files').addEventListener('click', () => {
    document.querySelector('.btn-files-show').classList.toggle('showWithMargin');
    document.querySelector('#btn-files').classList.toggle('selectedNavbar');
    document.querySelector('.filesNavbar').classList.toggle('moveTheMargin');
    document.querySelector('.main').classList.toggle('moveTheMargin');
    document.querySelector('.main').classList.toggle('adjustWidth');
});

document.querySelector('.section-icon-explorer').addEventListener('click', () => {
    document.querySelector('.navbar-section-explorer').classList.toggle('showWithHeight');
    document.querySelector('.section-icon-explorer').classList.toggle('fa-angle-up');
    document.querySelector('.section-icon-explorer').classList.toggle('fa-angle-down');
});

document.querySelector('.explorer').addEventListener('click', () => {
    document.querySelector('.navbar-section-explorer').classList.toggle('showWithHeight');
    document.querySelector('.section-icon-explorer').classList.toggle('fa-angle-up');
    document.querySelector('.section-icon-explorer').classList.toggle('fa-angle-down');
});

document.querySelector('.section-icon-openFiles').addEventListener('click', () => {
    document.querySelector('.navbar-section-openFileList').childNodes[1].classList.toggle('showWithOpacity');
    document.querySelector('.navbar-section-openFileList').childNodes[3].classList.toggle('showWithOpacity');
    document.querySelector('.section-icon-openFiles').classList.toggle('fa-angle-up');
    document.querySelector('.section-icon-openFiles').classList.toggle('fa-angle-down');
});

document.querySelector('.openFiles').addEventListener('click', () => {
    document.querySelector('.navbar-section-openFileList').childNodes[1].classList.toggle('showWithOpacity');
    document.querySelector('.navbar-section-openFileList').childNodes[3].classList.toggle('showWithOpacity');
    document.querySelector('.section-icon-openFiles').classList.toggle('fa-angle-up');
    document.querySelector('.section-icon-openFiles').classList.toggle('fa-angle-down');
});

document.querySelector('.section-icon-workspaces').addEventListener('click', () => {
    document.querySelector('.navbar-section-workspaces').childNodes[1].classList.toggle('showWithOpacity');
    document.querySelector('.navbar-section-workspaces').childNodes[3].classList.toggle('showWithOpacity');
    document.querySelector('.section-icon-workspaces').classList.toggle('fa-angle-up');
    document.querySelector('.section-icon-workspaces').classList.toggle('fa-angle-down');
});

document.querySelector('.workspaces').addEventListener('click', () => {
    document.querySelector('.navbar-section-workspaces').childNodes[1].classList.toggle('showWithOpacity');
    document.querySelector('.navbar-section-workspaces').childNodes[3].classList.toggle('showWithOpacity');
    document.querySelector('.section-icon-workspaces').classList.toggle('fa-angle-up');
    document.querySelector('.section-icon-workspaces').classList.toggle('fa-angle-down');
});

document.querySelector('#btn-styles').addEventListener('click', () => {
    document.querySelector('.btn-styles-show').classList.toggle('show');
    document.qierySelector('#btn-styles').classList.toggle('selectedNavbar');
});

document.querySelector('#btn-config').addEventListener('click', () => {
    ipcRenderer.invoke('openConfig').then(openConfigIsAlreadyOpen => {
        if(openConfigIsAlreadyOpen == true){
            ipcRenderer.invoke('createWindowAlert', "The options window is already open, avoid trying to open another one.");
        }else{
            return;
        }
    })
});

document.querySelector('#btn-minimize').addEventListener('click', () => {
    ipcRenderer.invoke('app-minimize');
});
document.querySelector('#btn-maximize').addEventListener('click', () => {
    ipcRenderer.invoke('app-maximize');
    ipcRenderer.invoke('getMainWindow', 'isMaximized').then(async (boolean) => {
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
