import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product, api } from '../services/api';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [netWorth, setNetWorth] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadNetWorth = async () => {
    try {
      const data = await api.getWarehouseNetWorth();
      setNetWorth(data.netWorth);
    } catch (error) {
      console.error('Error loading net worth:', error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadNetWorth();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        await loadProducts();
        await loadNetWorth();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid px-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center my-4">
        <h2 className="mb-3 mb-md-0">Products</h2>
        <Link to="/products/new" className="btn btn-primary w-100 w-md-auto">
          Add New Product
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title h5">Net Worth</h3>
              <p className="card-text h3 text-primary">
                ${netWorth.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title h5">Total Products</h3>
              <p className="card-text h3 text-success">
                {products.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="search"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search products"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <div className="d-block d-md-none">
            {filteredProducts.map((product) => (
              <div key={product._id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <div className="mb-2">
                    <small className="text-muted">Wholesale Price:</small>
                    <div>₹{product.wholesalePrice.toFixed(2)}</div>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Retail Price:</small>
                    <div>₹{product.retailPrice.toFixed(2)}</div>
                  </div>
                  <div className="mb-3">
                    <small className="text-muted">Stock:</small>
                    <div>{product.stockQuantity}</div>
                  </div>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/products/edit/${product._id}`}
                      className="btn btn-sm btn-outline-primary flex-grow-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => product._id && handleDelete(product._id)}
                      className="btn btn-sm btn-outline-danger flex-grow-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-none d-md-block">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Wholesale Price</th>
                  <th>Retail Price</th>
                  <th>Stock Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>₹{product.wholesalePrice.toFixed(2)}</td>
                    <td>₹{product.retailPrice.toFixed(2)}</td>
                    <td>{product.stockQuantity}</td>
                    <td>
                      <Link
                        to={`/products/edit/${product._id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => product._id && handleDelete(product._id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList; 