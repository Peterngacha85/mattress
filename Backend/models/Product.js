const mongoose = require('mongoose');

const variantSizeSchema = new mongoose.Schema({
    size: { type: String, required: true },   // e.g., "3x6", "4x6", "5x6", "6x6"
    price: { type: Number, required: true },
    image: { type: String, required: true }    // Image for this specific size
});

const variantSchema = new mongoose.Schema({
    thickness: { type: String, required: true },  // e.g., "8 Inches", "10 Inches"
    sizes: [variantSizeSchema]
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },     // Foam Mattress, Spring Mattress, Fibre Mattress
    subCategory: { type: String, required: true },  // Morning Glory, Moko, Johari, Sicily, etc.
    duty: { type: String },                         // Heavy Duty, Medium Duty, Heavy, Medium (Optional)
    variants: [variantSchema],
    rating: { type: Number, default: 5 },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
