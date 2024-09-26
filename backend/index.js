const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const Product = require('./models/product');
const categoryData = require('./data/categoryData');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart'); 

const app = express();

// -----------------------------
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MultiVendor')
    .then(() => {
        console.log("Connected to MongoDB");
        insertCategoryData();
    })
    .catch(err => console.error("MongoDB connection error:", err));

// Function to insert category data
const insertCategoryData = async () => {
    try {
        const existingProducts = await Product.countDocuments();
        if (existingProducts > 0) {
            console.log('Products already exist in the database. Skipping data insertion.');
            return;
        }
        const products = [];

        Object.keys(categoryData).forEach((category) => {
            categoryData[category].forEach((product) => {
                products.push({
                    category: category,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    imageUrl: product.imageUrl,
                });
            });
        });

        const result = await Product.insertMany(products);
        console.log('Inserted products:', result);
    } catch (error) {
        console.error('Error inserting category data:', error);
    }
};

app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API', version: '1.0' });
});

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); 

app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
