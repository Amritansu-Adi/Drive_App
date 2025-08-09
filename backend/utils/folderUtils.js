const Folder = require('../models/Folder');

const getFolderPath = async (folderId) => {
    let path = [];
    let currentFolder = await Folder.findById(folderId);
    
    while (currentFolder && currentFolder.parentFolder) {
        currentFolder = await Folder.findById(currentFolder.parentFolder);
        if (currentFolder) {
            path.unshift({ _id: currentFolder._id, name: currentFolder.name });
        }
    }
    
    return path;
};

module.exports = {
    getFolderPath
};