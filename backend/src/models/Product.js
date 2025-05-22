const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    wholesalePrice: {
        type: Number,
        required: true,
        min: 0
    },
    retailPrice: {
        type: Number,
        required: true,
        min: 0
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
}, {
    timestamps: true
});

// Virtual field for product value
productSchema.virtual('value').get(function() {
    return this.stockQuantity * this.wholesalePrice;
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;