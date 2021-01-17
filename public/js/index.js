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
