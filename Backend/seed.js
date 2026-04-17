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
                name: "Heavy Duty Quilted Mattress",
                category: "Heavy Duty",
                type: "High-Density",
                thickness: "10 Inches",
                description: "Premium heavy-duty quilted mattress for maximum support and durability. Perfect for people who prefer a firm sleeping surface.",
                image: "/images/products/mattress_3.png",
                sizeOptions: [
                    { size: "3x6", price: 15500 },
                    { size: "4x6", price: 21500 },
                    { size: "5x6", price: 26500 },
                    { size: "6x6", price: 31000 }
                ],
                isFeatured: true
            },
            {
                name: "Superfoam Morning Glory",
                category: "Standard",
                type: "Medium Duty",
                thickness: "8 Inches",
                description: "The classic Superfoam Morning Glory, providing a balanced feel for a great night's sleep.",
                image: "/images/products/mattress_2.png",
                sizeOptions: [
                    { size: "3x6", price: 7500 },
                    { size: "4x6", price: 9500 },
                    { size: "5x6", price: 13000 },
                    { size: "6x6", price: 15500 }
                ]
            },
            {
                name: "Moko Memory Foam",
                category: "Moko",
                type: "Memory Foam",
                thickness: "10 Inches",
                description: "Advanced Moko memory foam mattress that contours to your body for pressure relief.",
                image: "/images/products/mattress_1.png",
                sizeOptions: [
                    { size: "3x6", price: 19500 },
                    { size: "4x6", price: 24500 },
                    { size: "5x6", price: 30000 },
                    { size: "6x6", price: 36000 }
                ]
            },
            {
                name: "Johari Fibre Orthopedic",
                category: "Standard",
                type: "Orthopedic",
                thickness: "12 Inches",
                description: "Ultra-supportive Johari Fibre orthopedic mattress for back health and spine alignment.",
                image: "/images/products/mattress_3.png",
                sizeOptions: [
                    { size: "3x6", price: 35000 },
                    { size: "4x6", price: 42000 },
                    { size: "5x6", price: 48000 },
                    { size: "6x6", price: 55000 }
                ]
            },
            {
                name: "Premium Bed Base (Dark Wood)",
                category: "Bed Base",
                type: "Furniture",
                thickness: "N/A",
                description: "Solid dark wood bed base, perfectly built to last and support any mattress type.",
                image: "/images/products/mattress_2.png",
                sizeOptions: [
                    { size: "3x6", price: 12000 },
                    { size: "4x6", price: 15000 },
                    { size: "5x6", price: 18000 },
                    { size: "6x6", price: 22000 }
                ]
            },
            {
                name: "Soft Cloud Pillow",
                category: "Pillow",
                type: "Accessory",
                thickness: "Other",
                description: "Luxurious soft cloud pillow for that extra touch of comfort.",
                image: "/images/products/mattress_1.png",
                sizeOptions: [
                    { size: "Standard", price: 1500 },
                    { size: "King", price: 2500 }
                ]
            }
        ];

        await Product.insertMany(products);
        console.log("Database Seeded Successfully with All Categories!");
        process.exit();
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedData();
