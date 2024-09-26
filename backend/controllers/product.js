const Product = require('../models/product');

async function getAllProducts(req, res) {
    try {
        const { category, minPrice, maxPrice } = req.query;
        let query = {};

        if (category) query.category = category;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
}

async function getProductByName(req, res) {
    try {
        const { name } = req.params;
        const product = await Product.findOne({ name });
        if (!product) return res.status(404).json({ error: "Product Not Found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Error fetching product" });
    }
}


module.exports = {
    getAllProducts,
    getProductByName,
};