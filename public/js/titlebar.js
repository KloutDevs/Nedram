if(remote.getCurrentWindow().isMaximized() == false){
    document.querySelector('#icon_restore').classList.add('hide');
    document.querySelector('#icon_maximize').classList.remove('hide');
}else if(remote.getCurrentWindow().isMaximized() == true){
    document.querySelector('#icon_restore').classList.remove('hide');
    document.querySelector('#icon_maximize').classList.add('hide');
}

document.querySelector('#btn-minimize').addEventListener('click', () => {
    if(remote.getCurrentWindow().isMinimized() == false){
        remote.getCurrentWindow().minimize();
    }
});
document.querySelector('#btn-notifications').addEventListener('click', () => {
    document.querySelector('#notifications_box').classList.toggle('notifications_box_show');
});
document.querySelector('.clearNotificationsBtn').addEventListener('click', () => {
    let notificationsBody = document.querySelector('.notifications_body');
    if(notificationsBody.childNodes.length > 0){
        for(let x=0;x < notificationsBody.childNodes.length;x++){
            if(notificationsBody.childNodes[0].innerText == 'No new notifications have arrived here...'){
                return;
            }else{
                notificationsBody.childNodes[x].classList.add('animate__animated');
                notificationsBody.childNodes[x].classList.add('animate__zoomOutUp');
            }
        }
        setTimeout(function(){
            while(notificationsBody.childNodes.length >= 1){
                notificationsBody.removeChild(notificationsBody.childNodes[0]);
            }
            let withoutNotification = document.createElement('span');
            withoutNotification.innerHTML = 'No new notifications have arrived here...';
            withoutNotification.classList.add('notification_withoutNotifications');
            notificationsBody.insertBefore(withoutNotification, null);
        }, 900);
    }else{
        return;
    }
});
ipcRenderer.on('newNotification', (event, body) => {
    let color, ___;
    if(body.type == 'error'){
        ___ = 'Error in';
        color = '#ff5050';
    }else if(body.type == 'alert'){
        ___ = 'Alert in';
        color = '#ffff66';
    }else if(body.type == 'info'){
        ___ = 'Info from';
        color = '#66ff66';
    }else{
        return;
    }
    let notification_item = document.createElement('div');
    notification_item.classList.add('notification_item');
    notification_item.innerHTML = `                   <div class="notification_item_icon">
                        <i class="fal fa-exclamation-circle notification_icon"></i> 
                    </div>
                    <div class="notification_item_text">
                        <p class="notification_text">${___} module <b>${body.module}</b>: ${body.message}</p>
                    </div>`;
    notification_item.childNodes[1].style.color = color;
    if(document.querySelector('.notifications_body').childNodes.length == 1 && document.querySelector('.notifications_body').childNodes[0].innerText == "No new notifications have arrived here..." || document.querySelector('.notifications_body').childNodes[0].nodeName == "#text"){
        document.querySelector('.notifications_body').removeChild(document.querySelector('.notifications_body').childNodes[0]);
    }
    document.querySelector('.notifications_body').insertBefore(notification_item, null);
});
document.querySelector('#btn-maximize').addEventListener('click', () => {
    if(remote.getCurrentWindow().isMaximized() == true){
        remote.getCurrentWindow().unmaximize();
        document.querySelector('#icon_restore').classList.add('hide');
        document.querySelector('#icon_maximize').classList.remove('hide');
    }else if(remote.getCurrentWindow().isMaximized() == false){
        remote.getCurrentWindow().maximize();
        document.querySelector('#icon_restore').classList.remove('hide');
        document.querySelector('#icon_maximize').classList.add('hide');
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
