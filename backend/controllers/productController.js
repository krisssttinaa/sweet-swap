const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.getProductById(req.params.id);
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createProduct = async (req, res) => {
    const productData = req.body;
    try {
        const result = await Product.createProduct(productData);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};