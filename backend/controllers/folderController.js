const Folder = require('../models/Folder');
const Image = require('../models/Image');
// const path = require('path');

const createFolder = async (req, res) => {
    const { name, parentFolder } = req.body;
    console.log('Creating folder:', name, 'parent:', parentFolder);
    // console.log('User ID:', req.user.id);
    
    try {
        // if (!name || name.trim() === '') {
        //     return res.status(400).json({ msg: 'Folder name is required' });
        // }
        
        const newFolder = new Folder({
            name,
            parentFolder: parentFolder || null,
            owner: req.user.id
        });
        
        const folder = await newFolder.save();
        console.log('Folder created successfully:', folder._id);
        res.json(folder);
    } catch (err) {
        console.error(err.message);
        // console.error('Error creating folder:', err);
        res.status(500).send('Server Error');
    }
};

const getFolderContents = async (req, res) => {
    const { parent } = req.query;
    console.log('Fetching contents for folder', parent);
    
    try {
        const parentFolder = parent === 'null' ? null : parent;
        console.log('Parent folder id', parentFolder);
        
        const folders = await Folder.find({ 
            owner: req.user.id, 
            parentFolder: parentFolder 
        });
        const images = await Image.find({ 
            owner: req.user.id, 
            folder: parentFolder 
        });
        
        // console.log('Folders:', folders.map(f => f.name));
        res.json({ folders, images });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// const updateFolder = async (req, res) => {
// 
// }

module.exports = {
    createFolder,
    getFolderContents
    // updateFolder
};
