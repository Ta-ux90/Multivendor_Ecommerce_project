const express = require("express");

const {
    getAllProducts,
    getProductByName,
} = require('../controllers/product');

const router = express.Router();

router.route('/')
    .get(getAllProducts)

router.route('/:name')
    .get(getProductByName)

module.exports = router;