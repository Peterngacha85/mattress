require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const Settings = require('./models/Settings');

const seedData = async () => {
    try {
        await connectDB();
        
        await Product.deleteMany({});
        // We keep Settings as they are likely configured already, 
        // but if someone wants a full reset, they can uncomment the line below:
        // await Settings.deleteMany({});

        const products = [
            {
                name: "Heavy Duty Quilted Mattress",
                category: "Heavy Duty",
                type: "High-Density",
                description: "Premium heavy-duty quilted mattress for maximum support and durability. Perfect for people who prefer a firm sleeping surface.",
                variants: [
                    {
                        thickness: "8 Inches",
                        image: "/images/products/mattress_3.png",
                        sizes: [
                            { size: "3x6", price: 12000 },
                            { size: "4x6", price: 16000 },
                            { size: "5x6", price: 20000 },
                            { size: "6x6", price: 24000 }
                        ]
                    },
                    {
                        thickness: "10 Inches",
                        image: "/images/products/mattress_2.png", // Different image to test swap
                        sizes: [
                            { size: "3x6", price: 15500 },
                            { size: "4x6", price: 21500 },
                            { size: "5x6", price: 26500 },
                            { size: "6x6", price: 31000 }
                        ]
                    }
                ],
                isFeatured: true
            },
            {
                name: "Superfoam Morning Glory",
                category: "Standard",
                type: "Medium Duty",
                description: "The classic Superfoam Morning Glory, providing a balanced feel for a great night's sleep.",
                variants: [
                    {
                        thickness: "6 Inches",
                        image: "/images/products/mattress_2.png",
                        sizes: [
                            { size: "3x6", price: 5500 },
                            { size: "4x6", price: 7000 },
                            { size: "5x6", price: 9500 },
                            { size: "6x6", price: 11500 }
                        ]
                    },
                    {
                        thickness: "8 Inches",
                        image: "/images/products/mattress_1.png", // Different image to test swap
                        sizes: [
                            { size: "3x6", price: 7500 },
                            { size: "4x6", price: 9500 },
                            { size: "5x6", price: 13000 },
                            { size: "6x6", price: 15500 }
                        ]
                    }
                ]
            },
            {
                name: "Moko Memory Foam",
                category: "Moko",
                type: "Memory Foam",
                description: "Advanced Moko memory foam mattress that contours to your body for pressure relief.",
                variants: [
                    {
                        thickness: "8 Inches",
                        image: "/images/products/mattress_1.png",
                        sizes: [
                            { size: "3x6", price: 16000 },
                            { size: "4x6", price: 20000 },
                            { size: "5x6", price: 25000 },
                            { size: "6x6", price: 30000 }
                        ]
                    },
                    {
                        thickness: "10 Inches",
                        image: "/images/products/about-mattress.png", // Different image to test swap
                        sizes: [
                            { size: "3x6", price: 19500 },
                            { size: "4x6", price: 24500 },
                            { size: "5x6", price: 30000 },
                            { size: "6x6", price: 36000 }
                        ]
                    }
                ],
                isFeatured: true
            },
            {
                name: "Johari Fibre Orthopedic",
                category: "Standard",
                type: "Orthopedic",
                description: "Ultra-supportive Johari Fibre orthopedic mattress for back health and spine alignment.",
                variants: [
                    {
                        thickness: "10 Inches",
                        image: "/images/products/mattress_3.png",
                        sizes: [
                            { size: "3x6", price: 28000 },
                            { size: "4x6", price: 34000 },
                            { size: "5x6", price: 40000 },
                            { size: "6x6", price: 46000 }
                        ]
                    },
                    {
                        thickness: "12 Inches",
                        image: "/images/products/mattress_2.png", // Different image to test swap
                        sizes: [
                            { size: "3x6", price: 35000 },
                            { size: "4x6", price: 42000 },
                            { size: "5x6", price: 48000 },
                            { size: "6x6", price: 55000 }
                        ]
                    }
                ]
            },
            {
                name: "Premium Bed Base",
                category: "Bed Base",
                type: "Furniture",
                description: "Solid bed base built to last.",
                variants: [
                    {
                        thickness: "Standard",
                        image: "/images/products/mattress_2.png",
                        sizes: [
                            { size: "3x6", price: 12000 },
                            { size: "4x6", price: 15000 },
                            { size: "5x6", price: 18000 },
                            { size: "6x6", price: 22000 }
                        ]
                    }
                ]
            }
        ];

        await Product.insertMany(products);
        console.log("Database Seeded with test-ready variants!");
        process.exit();
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedData();
