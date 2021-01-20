document.addEventListener('keyup', (event, ctrlKey) => {

    let key = event.key, ctrl = event.ctrlKey, alt = event.altKey, shift = event.shiftKey;
    key = key.toUpperCase();
    if(ctrl == true){
        if(alt == true){
            switch(key){
                case 'W': // Add to workspace
                    break;
                case 'S': // Save workspace
                    break;
            }
        }else{
            switch(key){
                case 'E': // Open File
                    break;
                case 'F': // Open Folder
                    break;
                case 'w': // Open Workspace
                    break;
                case 'R': // Open Recent
                    break;
                case 'N': // New File
                    openNewFileWindow();
                    break;
                case 'S': // Save
                    break;
                case 'B': // Save as
                    break;
                case 'A': // Save all
                    break;
                case 'Z': // Revert change
                    break;
                case 'C': // Close File
                    break;
                case 'X': // Close Folder
                    break;
                case 'V': // Close all
                    break;
            }
        }
    }else{
        return;
    }

});

document.querySelector('.openFile-button').addEventListener('click', () => {
});
document.querySelector('.openFolder-button').addEventListener('click', () => {
});
document.querySelector('.openWorkspace-button').addEventListener('click', () => {
});
document.querySelector('.openRecent-button').addEventListener('click', () => {
});
document.querySelector('.newFile-button').addEventListener('click', () => {
    openNewFileWindow();
});
document.querySelector('.addFolderToWorkspace-button').addEventListener('click', () => {
});
document.querySelector('.save-button').addEventListener('click', () => {
});
document.querySelector('.saveAs-button').addEventListener('click', () => {
});
document.querySelector('.saveAll-button').addEventListener('click', () => {
});
document.querySelector('.revertChange-button').addEventListener('click', () => {
});
document.querySelector('.closeFile-button').addEventListener('click', () => {
});
document.querySelector('.closeFolder-button').addEventListener('click', () => {
});
document.querySelector('.closeAll-button').addEventListener('click', () => {
});
