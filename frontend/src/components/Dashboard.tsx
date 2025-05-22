import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Dashboard: React.FC = () => {
  const [netWorth, setNetWorth] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [netWorthData, productsData] = await Promise.all([
          api.getWarehouseNetWorth(),
          api.getProducts()
        ]);
        
        setNetWorth(netWorthData.netWorth);
        setTotalProducts(productsData.length);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Warehouse Dashboard</h1>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Net Worth</h5>
              <h2 className="card-text text-primary">
                ${netWorth.toFixed(2)}
              </h2>
              <p className="card-text text-muted">
                Total value of all products at wholesale price
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <h2 className="card-text text-success">
                {totalProducts}
              </h2>
              <p className="card-text text-muted">
                Number of unique products in inventory
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 