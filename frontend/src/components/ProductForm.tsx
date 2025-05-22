import React, { useState, useEffect } from 'react';
import { Product, api } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<Product>({
    name: '',
    wholesalePrice: 0,
    retailPrice: 0,
    stockQuantity: 0
  });

  useEffect(() => {
    if (id) {
      api.getProduct(id).then(product => setFormData(product));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await api.updateProduct(id, formData);
      } else {
        await api.createProduct(formData);
      }
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value)
    }));
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            aria-label="Product name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="wholesalePrice" className="form-label">Wholesale Price</label>
          <input
            type="number"
            className="form-control"
            id="wholesalePrice"
            name="wholesalePrice"
            value={formData.wholesalePrice}
            onChange={handleChange}
            aria-label="Wholesale price"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="retailPrice" className="form-label">Retail Price</label>
          <input
            type="number"
            className="form-control"
            id="retailPrice"
            name="retailPrice"
            value={formData.retailPrice}
            onChange={handleChange}
            aria-label="Retail price"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stockQuantity" className="form-label">Stock Quantity</label>
          <input
            type="number"
            className="form-control"
            id="stockQuantity"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            aria-label="Stock quantity"
            min="0"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Create'} Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm; 