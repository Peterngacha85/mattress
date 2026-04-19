/**
 * Migration Script: Convert old Product schema to new Variant schema
 * 
 * Old format:
 *   { thickness: "10 Inches", image: "url", sizeOptions: [{size, price}] }
 * 
 * New format:
 *   { variants: [{ thickness: "10 Inches", image: "url", sizes: [{size, price}] }] }
 * 
 * Safe to run multiple times (idempotent).
 * Usage: node migrate.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const migrateProducts = async () => {
    try {
        await connectDB();

        // Access the raw collection to avoid schema validation issues
        const collection = mongoose.connection.db.collection('products');
        const products = await collection.find({}).toArray();

        let migrated = 0;
        let skipped = 0;

        for (const product of products) {
            // Skip if already migrated (has variants array with data)
            if (product.variants && product.variants.length > 0) {
                skipped++;
                continue;
            }

            // Build a single variant from old fields
            const variant = {
                thickness: product.thickness || 'Standard',
                image: product.image || '/images/products/mattress_1.png',
                sizes: (product.sizeOptions || []).map(opt => ({
                    size: opt.size,
                    price: opt.price
                }))
            };

            // Update the document: add variants, remove old fields
            await collection.updateOne(
                { _id: product._id },
                {
                    $set: { variants: [variant] },
                    $unset: { sizeOptions: '', thickness: '', image: '' }
                }
            );

            migrated++;
            console.log(`✅ Migrated: ${product.name} → 1 variant (${variant.thickness})`);
        }

        console.log(`\n🎉 Migration complete! Migrated: ${migrated}, Skipped: ${skipped}`);
        process.exit();
    } catch (error) {
        console.error('❌ Migration Error:', error);
        process.exit(1);
    }
};

migrateProducts();
