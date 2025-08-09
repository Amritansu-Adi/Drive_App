const Image = require('../models/Image');
const cloudinary = require('../config/cloudinary');
const { getFolderPath } = require('../utils/folderUtils');

const uploadImage = async (req, res) => {
    const { name, folderId } = req.body;
    console.log('Uploading image:', name, 'to folder:', folderId);
    // console.log('File ', req.file);
    
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        console.log('Uploading to cloudinary...');
        
        const result = await cloudinary.uploader.upload(dataURI, { 
            folder: "drive_clone" 
            // public_id: `${Date.now()}-${name}`,
            // resource_type: "auto"
        });
        
        console.log('Cloudinary upload successful:', result.public_id);

        const newImage = new Image({
            name,
            imageUrl: result.secure_url,
            folder: folderId,
            owner: req.user.id

        });
        
        const image = await newImage.save();
        console.log('Image saved to database:', image._id);
        res.json(image);
    } catch (err) {
        console.error(err.message);
        // console.error('Upload error:', err);
        res.status(500).send('Server Error');
    }
};

const searchImages = async (req, res) => {
    const { q } = req.query;
    console.log('Searching images with query:', q);
    
    try {
        const images = await Image.find({
            owner: req.user.id,
            name: { $regex: q, $options: 'i' }
        }).populate('folder', 'name');
        
        console.log(`Found ${images.length} matching images`);

        const imagesWithPath = await Promise.all(
            images.map(async (image) => {
                const path = await getFolderPath(image.folder._id);
                return {
                    ...image.toObject(),
                    path: path,
                };
                // return { ...image._doc, path };
            })
        );
        
        res.json(imagesWithPath);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    uploadImage,
    searchImages
};
