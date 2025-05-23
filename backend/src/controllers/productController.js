const Product = require('../models/Product');

// Get all products
exports.getProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product
exports.getProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a product
exports.createProduct = async(req, res) => {
    const product = new Product({
        name: req.body.name,
        wholesalePrice: req.body.wholesalePrice,
        retailPrice: req.body.retailPrice,
        stockQuantity: req.body.stockQuantity
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a product
exports.updateProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        Object.assign(product, req.body);
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a product
exports.deleteProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.deleteOne();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get warehouse net worth
exports.getWarehouseNetWorth = async(req, res) => {
    try {
        const products = await Product.find();
        const netWorth = products.reduce((total, product) => {
            return total + (product.stockQuantity * product.wholesalePrice);
        }, 0);

        res.json({ netWorth });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};