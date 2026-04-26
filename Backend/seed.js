require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

// Helper: build sizes array with empty image placeholder
const s = (size, price) => ({ size, price, image: "" });

const seedData = async () => {
    try {
        await connectDB();

        // Wipe everything first
        await Product.deleteMany({});
        console.log("Cleared all existing products.");

        const products = [

            // ─────────────────────────────────────────────────────────────
            // MORNING GLORY HEAVY DUTY – PLAIN COVER
            // ─────────────────────────────────────────────────────────────
            {
                name: "Morning Glory Heavy Duty Plain Cover Mattress",
                description: "Durable heavy duty plain cover mattress by Morning Glory. Built for long-lasting support and firm comfort.",
                category: "Foam Mattress",
                subCategory: "Morning Glory",
                duty: "Heavy Duty",
                isFeatured: true,
                variants: [
                    {
                        thickness: "6 Inches",
                        sizes: [
                            s("3x6",  6000),
                            s("3.5x6",7000),
                            s("4x6",  7500),
                            s("4.5x6",8000),
                            s("5x6",  8500),
                            s("6x6", 10000),
                        ]
                    },
                    {
                        thickness: "8 Inches",
                        sizes: [
                            s("3x6",  8000),
                            s("3.5x6",8500),
                            s("4x6",  9500),
                            s("4.5x6",10500),
                            s("5x6", 11000),
                            s("6x6", 13000),
                        ]
                    },
                    {
                        thickness: "10 Inches",
                        sizes: [
                            s("3.5x6",13000),
                            s("4x6", 12000),
                            s("4.5x6",13000),
                            s("5x6", 14000),
                            s("6x6", 17000),
                        ]
                    },
                    {
                        thickness: "12 Inches",
                        sizes: [
                            s("4x6", 15000),
                            s("5x6", 17000),
                            s("6x6", 20000),
                        ]
                    },
                ]
            },

            // ─────────────────────────────────────────────────────────────
            // MORNING GLORY HEAVY DUTY – QUILTED COVER
            // ─────────────────────────────────────────────────────────────
            {
                name: "Morning Glory Heavy Duty Quilted Cover Mattress",
                description: "Premium heavy duty quilted cover mattress by Morning Glory. Superior comfort with quilted finish.",
                category: "Foam Mattress",
                subCategory: "Morning Glory",
                duty: "Heavy Duty",
                isFeatured: true,
                variants: [
                    {
                        thickness: "6 Inches",
                        sizes: [
                            s("3x6",  7000),
                            s("3.5x6",7500),
                            s("4x6",  8000),
                            s("4.5x6",8500),
                            s("5x6",  9000),
                            s("6x6", 10500),
                        ]
                    },
                    {
                        thickness: "8 Inches",
                        sizes: [
                            s("3x6",  8500),
                            s("3.5x6",9000),
                            s("4x6", 10000),
                            s("4.5x6",11000),
                            s("5x6", 12000),
                            s("6x6", 14000),
                        ]
                    },
                    {
                        thickness: "10 Inches",
                        sizes: [
                            s("3.5x6",12000),
                            s("4x6", 13000),
                            s("4.5x6",14000),
                            s("5x6", 15000),
                            s("6x6", 18000),
                        ]
                    },
                    {
                        thickness: "12 Inches",
                        sizes: [
                            s("4x6", 16000),
                            s("5x6", 18000),
                            s("6x6", 22000),
                        ]
                    },
                    {
                        thickness: "14 Inches",
                        sizes: [
                            s("4x6", 18000),
                            s("4.5x6",20000),
                            s("5x6", 21000),
                            s("6x6", 25000),
                        ]
                    },
                    {
                        thickness: "16 Inches",
                        sizes: [
                            s("4x6", 20000),
                            s("4.5x6",22000),
                            s("5x6", 23000),
                            s("6x6", 27000),
                        ]
                    },
                ]
            },

            // ─────────────────────────────────────────────────────────────
            // MORNING GLORY MEDIUM DUTY – PLAIN COVER
            // ─────────────────────────────────────────────────────────────
            {
                name: "Morning Glory Medium Duty Plain Cover Mattress",
                description: "Morning Glory medium duty plain cover mattress offering everyday comfort at great value.",
                category: "Foam Mattress",
                subCategory: "Morning Glory",
                duty: "Medium Duty",
                isFeatured: false,
                variants: [
                    {
                        thickness: "6 Inches",
                        sizes: [
                            s("3x6",  5500),
                            s("3.5x6",6000),
                            s("4x6",  6500),
                            s("4.5x6",7000),
                            s("5x6",  7500),
                            s("6x6",  8500),
                        ]
                    },
                    {
                        thickness: "8 Inches",
                        sizes: [
                            s("3x6",  7000),
                            s("3.5x6",7500),
                            s("4x6",  8000),
                            s("4.5x6",8500),
                            s("5x6",  9000),
                            s("6x6", 10000),
                        ]
                    },
                    {
                        thickness: "10 Inches",
                        sizes: [
                            s("3.5x6",9000),
                            s("4x6", 10000),
                            s("4.5x6",11000),
                            s("5x6", 12000),
                            s("6x6", 13000),
                        ]
                    },
                ]
            },

            // ─────────────────────────────────────────────────────────────
            // MORNING GLORY MEDIUM DUTY – QUILTED COVER
            // ─────────────────────────────────────────────────────────────
            {
                name: "Morning Glory Medium Duty Quilted Cover Mattress",
                description: "Morning Glory medium duty quilted cover mattress. Comfortable, affordable, and elegantly finished.",
                category: "Foam Mattress",
                subCategory: "Morning Glory",
                duty: "Medium Duty",
                isFeatured: false,
                variants: [
                    {
                        thickness: "6 Inches",
                        sizes: [
                            s("3x6",  6000),
                            s("3.5x6",6500),
                            s("4x6",  7000),
                            s("4.5x6",7500),
                            s("5x6",  8000),
                            s("6x6",  9000),
                        ]
                    },
                    {
                        thickness: "8 Inches",
                        sizes: [
                            s("3x6",  7500),
                            s("3.5x6",8000),
                            s("4x6",  8500),
                            s("4.5x6",9000),
                            s("5x6", 10000),
                            s("6x6", 11000),
                        ]
                    },
                    {
                        thickness: "10 Inches",
                        sizes: [
                            s("3.5x6",9500),
                            s("4x6", 11000),
                            s("4.5x6",12000),
                            s("5x6", 13000),
                            s("6x6", 14000),
                        ]
                    },
                ]
            },

            // ─────────────────────────────────────────────────────────────
            // SUPERFOAM ORTHOBLISS SPRING MATTRESS
            // ─────────────────────────────────────────────────────────────
            {
                name: "Superfoam Orthobliss Spring Mattress",
                description: "Superfoam Orthobliss spring mattress designed for orthopedic support and restful sleep.",
                category: "Spring Mattress",
                subCategory: "Orthobliss",
                duty: "",
                isFeatured: true,
                variants: [
                    {
                        thickness: "10 Inches",
                        sizes: [
                            s("3x6",  21000),
                            s("3.5x6",22000),
                            s("4x6",  23000),
                            s("4.5x6",25000),
                            s("5x6",  27000),
                            s("6x6",  30000),
                        ]
                    },
                ]
            },

            // ─────────────────────────────────────────────────────────────
            // MAHARAJA SPRING MATTRESS (5 / 7 Year Warranty)
            // ─────────────────────────────────────────────────────────────
            {
                name: "Maharaja Spring Mattress",
                description: "Maharaja spring mattress with 5-year warranty (standard) and 7-year warranty on pocket spring variant. Premium support for king-like comfort.",
                category: "Spring Mattress",
                subCategory: "Maharaja",
                duty: "",
                isFeatured: true,
                variants: [
                    {
                        thickness: "8 Inches",
                        sizes: [
                            s("3.5x6",18000),
                            s("4x6",  20000),
                            s("4.5x6",23000),
                            s("5x6",  25000),
                            s("6x6",  28000),
                        ]
                    },
                    {
                        thickness: "9 Inches",
                        sizes: [
                            s("3.5x6",22000),
                            s("4x6",  23000),
                            s("4.5x6",25000),
                            s("5x6",  27000),
                            s("6x6",  30000),
                        ]
                    },
                    {
                        thickness: "10 Inches (Pocket Spring)",
                        sizes: [
                            s("4x6",  25000),
                            s("5x6",  30000),
                            s("6x6",  35000),
                        ]
                    },
                    {
                        thickness: "12 Inches",
                        sizes: [
                            s("4x6",  30000),
                            s("4.5x6",33000),
                            s("5x6",  35000),
                            s("6x6",  40000),
                        ]
                    },
                ]
            },

            // ─────────────────────────────────────────────────────────────
            // MIMI SPRING MATTRESS (10 Year Warranty)
            // ─────────────────────────────────────────────────────────────
            {
                name: "Mimi Spring Mattress",
                description: "Mimi spring mattress with 10-year warranty. High quality spring system for lasting support and comfort.",
                category: "Spring Mattress",
                subCategory: "Mimi",
                duty: "",
                isFeatured: true,
                variants: [
                    {
                        thickness: "10 Inches",
                        sizes: [
                            s("4x6",  23000),
                            s("4.5x6",25000),
                            s("5x6",  27000),
                            s("6x6",  30000),
                        ]
                    },
                    {
                        thickness: "12 Inches",
                        sizes: [
                            s("4x6",  30000),
                            s("4.5x6",33000),
                            s("5x6",  35000),
                            s("6x6",  40000),
                        ]
                    },
                ]
            },

            // ─────────────────────────────────────────────────────────────
            // DURA POA SPRING MATTRESS (10 Year Warranty)
            // ─────────────────────────────────────────────────────────────
            {
                name: "Dura Poa Spring Mattress",
                description: "Dura Poa spring mattress with 10-year warranty. Exceptional durability and spring comfort at every size.",
                category: "Spring Mattress",
                subCategory: "Dura Poa",
                duty: "",
                isFeatured: false,
                variants: [
                    {
                        thickness: "10 Inches",
                        sizes: [
                            s("3x6",  21000),
                            s("3.5x6",22000),
                            s("4x6",  23000),
                            s("4.5x6",25000),
                            s("5x6",  27000),
                            s("6x6",  30000),
                        ]
                    },
                    {
                        thickness: "12 Inches",
                        sizes: [
                            s("4x6",  30000),
                            s("4.5x6",33000),
                            s("5x6",  35000),
                            s("6x6",  40000),
                        ]
                    },
                ]
            },

            // ─────────────────────────────────────────────────────────────
            // PILLOWS
            // ─────────────────────────────────────────────────────────────
            {
                name: "Morning Glory Fibre Pillow",
                description: "Morning Glory fibre pillow – 500g. Soft and lightweight for comfortable sleep.",
                category: "Pillow",
                subCategory: "Morning Glory",
                duty: "",
                isFeatured: false,
                variants: [
                    {
                        thickness: "Standard",
                        sizes: [
                            s("500g", 500),
                        ]
                    }
                ]
            },
            {
                name: "Johari Fibre Pillow",
                description: "Johari fibre pillow – 600g. Supportive and durable for everyday use.",
                category: "Pillow",
                subCategory: "Johari",
                duty: "",
                isFeatured: false,
                variants: [
                    {
                        thickness: "Standard",
                        sizes: [
                            s("600g", 400),
                        ]
                    }
                ]
            },
            {
                name: "Luxury Fibre Pillow",
                description: "Luxury fibre pillow – 1000g. Plush and premium for a hotel-like sleep experience.",
                category: "Pillow",
                subCategory: "Luxury",
                duty: "",
                isFeatured: false,
                variants: [
                    {
                        thickness: "Standard",
                        sizes: [
                            s("1000g", 1200),
                        ]
                    }
                ]
            },
            {
                name: "Mimi Fibre Pillow",
                description: "Mimi fibre pillow – 800g. High quality filling for comfortable and restful sleep.",
                category: "Pillow",
                subCategory: "Mimi",
                duty: "",
                isFeatured: false,
                variants: [
                    {
                        thickness: "Standard",
                        sizes: [
                            s("800g", 800),
                        ]
                    }
                ]
            },
        ];

        await Product.insertMany(products);
        console.log(`✅ Database seeded successfully! ${products.length} products added.`);
        console.log("   → Log in as Admin to upload images for each product.");
        process.exit(0);

    } catch (error) {
        console.error("❌ Seeding Error:", error.message);
        process.exit(1);
    }
};

seedData();
