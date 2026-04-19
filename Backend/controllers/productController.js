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
            if (product && product.variants) {
                // Optionally delete variant images from cloudinary
                // for (const v of product.variants) {
                //     if (v.image) await cloudinary.uploader.destroy(publicId);
                // }
            }
            await Product.findByIdAndDelete(req.params.id);
            res.json({ message: 'Product deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getStats: async (req, res) => {
        try {
            const totalProducts = await Product.countDocuments();
            const categories = await Product.distinct('category');
            const totalCategories = categories.length;
            
            // Get count per category
            const categoryDistribution = await Product.aggregate([
                { $group: { _id: '$category', count: { $sum: 1 } } }
            ]);

            // Get total variants count and price range
            const priceStats = await Product.aggregate([
                { $unwind: '$variants' },
                { $unwind: '$variants.sizes' },
                { $group: {
                    _id: null,
                    totalVariants: { $sum: 1 },
                    minPrice: { $min: '$variants.sizes.price' },
                    maxPrice: { $max: '$variants.sizes.price' }
                }}
            ]);

            res.json({
                totalProducts,
                totalCategories,
                categoryDistribution,
                priceRange: priceStats[0] || { totalVariants: 0, minPrice: 0, maxPrice: 0 }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = productController;
