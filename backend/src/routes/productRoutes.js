const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get warehouse net worth
router.get('/net-worth', productController.getWarehouseNetWorth);

// CRUD routes
router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;