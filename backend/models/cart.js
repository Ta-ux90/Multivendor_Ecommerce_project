const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
    items: [CartItemSchema], 
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
