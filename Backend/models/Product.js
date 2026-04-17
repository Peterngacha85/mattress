const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, 
    type: { type: String, required: true }, 
    thickness: { type: String }, 
    // New Size Options Schema
    sizeOptions: [{
        size: { type: String, required: true },
        price: { type: Number, required: true }
    }],
    image: { type: String, required: true }, 
    rating: { type: Number, default: 5 },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
