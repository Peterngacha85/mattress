const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const isAudio = file.mimetype.startsWith('audio');
        return {
            folder: 'kisau_mattress',
            resource_type: isAudio ? 'video' : 'image', // Cloudinary uses 'video' for audio files
            allowed_formats: isAudio ? ['mp3', 'wav', 'ogg'] : ['jpg', 'png', 'jpeg', 'webp'],
        };
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
