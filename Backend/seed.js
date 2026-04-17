require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const Settings = require('./models/Settings');

const seedData = async () => {
    try {
        await connectDB();
        
        await Product.deleteMany({});
        await Settings.deleteMany({});

        const settings = new Settings({
            whatsappNumber: '254792581067',
            mapLocation: 'Ruiru, Nairobi - Kenya',
            heroBgImage: '/images/products/hero-bg.jpg',
            audioTracks: [
                { title: 'Relaxing Sleep', url: 'https://audio.jukehost.co.uk/HLHIgWNBh4xMdiQaauu5iCebqm56vPsE', publicId: 'track_1' }
            ]
        });
        await settings.save();

        const products = [
            {
                name: "Heavy Duty Furnish (HDF) - 6 Inches",
                category: "Heavy Duty Furnish",
                type: "High-Density",
                thickness: "6 Inches",
                description: "Premium heavy-duty mattress for maximum support and durability. Perfect for people who prefer a firm sleeping surface.",
                image: "/images/products/mattress_3.png",
                sizeOptions: [
                    { size: "3x6", price: 5500 },
                    { size: "3.5x6", price: 6500 },
                    { size: "4x6", price: 7500 },
                    { size: "4.5x6", price: 8500 },
                    { size: "5x6", price: 9500 },
                    { size: "6x6", price: 11000 }
                ],
                isFeatured: true
            },
            {
                name: "Heavy Duty Furnish (HDF) - 8 Inches",
                category: "Heavy Duty Furnish",
                type: "High-Density",
                thickness: "8 Inches",
                description: "The 8-inch variant of our heavy-duty furnish selection, providing extra height and support.",
                image: "/images/products/mattress_2.png",
                sizeOptions: [
                    { size: "3x6", price: 7500 },
                    { size: "3.5x6", price: 8500 },
                    { size: "4x6", price: 9500 },
                    { size: "4.5x6", price: 11000 },
                    { size: "5x6", price: 13000 },
                    { size: "6x6", price: 15500 }
                ]
            },
            {
                name: "Moko Mattress - 8 Inches",
                category: "Moko",
                type: "Memory Foam",
                thickness: "8 Inches",
                description: "The original Moko mattress with advanced sleep technology for pressure relief.",
                image: "/images/products/mattress_1.png",
                sizeOptions: [
                    { size: "3x6", price: 9500 },
                    { size: "4x6", price: 12500 },
                    { size: "5x6", price: 15000 },
                    { size: "6x6", price: 18000 }
                ]
            }
        ];

        await Product.insertMany(products);
        console.log("Database Seeded Successfully - 100% Fidelity!");
        process.exit();
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedData();
