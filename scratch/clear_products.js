const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../Backend/.env') });

const Product = require('../Backend/models/Product');

const clearProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        const result = await Product.deleteMany({});
        console.log(`Deleted ${result.deletedCount} products`);
        
        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (err) {
        console.error('Error:', err);
    }
};

clearProducts();
