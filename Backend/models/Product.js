const mongoose = require('mongoose');

const variantSizeSchema = new mongoose.Schema({
    size: { type: String, required: true },   // e.g., "3x6", "4x6", "5x6", "6x6", "Standard", "King"
    price: { type: Number, required: true }
});

const variantSchema = new mongoose.Schema({
    thickness: { type: String, required: true },  // e.g., "8 Inches", "10 Inches", "Standard"
    image: { type: String, required: true },       // Cloudinary URL specific to this thickness
    sizes: [variantSizeSchema]
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, 
    type: { type: String, required: true }, 
    variants: [variantSchema],
    rating: { type: Number, default: 5 },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
