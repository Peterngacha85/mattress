const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); // Loads .env from current directory

const Product = require('./models/Product');

const clearProducts = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI not found in .env');
        }
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
        
        const result = await Product.deleteMany({});
        console.log(`Deleted ${result.deletedCount} products`);
        
        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

clearProducts();
