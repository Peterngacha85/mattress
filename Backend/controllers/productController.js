const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createProduct: async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (product && product.image) {
                // Optionally delete from cloudinary
                // await cloudinary.uploader.destroy(publicId);
            }
            await Product.findByIdAndDelete(req.params.id);
            res.json({ message: 'Product deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = productController;
