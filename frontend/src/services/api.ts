import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface Product {
  _id?: string;
  name: string;
  wholesalePrice: number;
  retailPrice: number;
  stockQuantity: number;
  createdAt?: string;
  updatedAt?: string;
}

export const api = {
  // Get all products
  getProducts: async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },

  // Get a single product
  getProduct: async (id: string) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  },

  // Create a product
  createProduct: async (product: Product) => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  },

  // Update a product
  updateProduct: async (id: string, product: Product) => {
    const response = await axios.put(`${API_URL}/products/${id}`, product);
    return response.data;
  },

  // Delete a product
  deleteProduct: async (id: string) => {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    return response.data;
  },

  // Get warehouse net worth
  getWarehouseNetWorth: async () => {
    const response = await axios.get(`${API_URL}/products/net-worth`);
    return response.data;
  }
}; 