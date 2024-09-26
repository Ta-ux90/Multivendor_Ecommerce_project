const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

// ---------------------------------
router.post('/add', async (req, res) => {
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne();

        if (!cart) {
            cart = new Cart({ items: [] });
        }
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ productId, quantity: 1 });
        }
        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add product to cart', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const cart = await Cart.findOne();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
    }
});

module.exports = router;
