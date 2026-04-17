const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const settingsController = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Auth
router.post('/auth/login', authController.login);

// Products
router.get('/products', productController.getAllProducts);
router.get('/products/stats', protect, productController.getStats);
router.post('/products', protect, productController.createProduct);
router.put('/products/:id', protect, productController.updateProduct);
router.delete('/products/:id', protect, productController.deleteProduct);

// Upload Route (Generic for Images/Audio)
router.post('/upload', protect, upload.single('file'), (req, res) => {
    res.json({
        url: req.file.path,
        publicId: req.file.filename
    });
});

// Settings
router.get('/settings', settingsController.getSettings);
router.put('/settings', protect, settingsController.updateSettings);
router.post('/settings/audio', protect, settingsController.addAudioTrack);
router.delete('/settings/audio/:trackId', protect, settingsController.deleteAudioTrack);

module.exports = router;
