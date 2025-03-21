

import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/ApiPath';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const firmId = localStorage.getItem('firmId');
      try {
        const response = await fetch(`${API_URL}/product/${firmId}/products`);
        const newProductsData = await response.json();
        setProducts(newProductsData.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
        alert('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const deleteProductById = async (productId) => {
    if (window.confirm("Are you sure you want to remove the product?")) {
      try {
        const response = await fetch(`${API_URL}/product/${productId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProducts(products.filter(product => product._id !== productId));
          alert("Product deleted successfully");
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error("deleteProductById", error);
        alert('Failed to delete product');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4 text-primary">All Products</h2>
        {products.length === 0 ? (
          <p className="text-center text-muted">No products found</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={item._id} className="table-light">
                    <th scope="row">{index + 1}</th>
                    <td className="fw-bold">{item.productName}</td>
                    <td className="text-success">{item.price}</td>
                    <td>
                      {item.image && (
                        <img
                          src={`${API_URL}/uploads/${item.image}`}
                          alt={item.productName}
                          className="img-thumbnail rounded"
                          width="80"
                          height="81"
                        />
                      )}
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteProductById(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
