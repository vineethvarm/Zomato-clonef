import React, { useState, useEffect } from 'react';
import { API_URL } from '../../data/apiPath';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [firmId, setFirmId] = useState('');

  useEffect(() => {
    const storedFirmId = localStorage.getItem('firmId');
    if (storedFirmId) {
      setFirmId(storedFirmId);
    } else {
      setError('Firm ID not found. Please log in again.');
    }
  }, []);

  const handleCheckboxChange = (event, state, setState) => {
    const value = event.target.value;
    setState(state.includes(value) ? state.filter((item) => item !== value) : [...state, value]);
  };

  const handleImageChange = (event) => setImage(event.target.files[0]);

  const handleBestseller = (event) => setBestseller(event.target.value === 'true');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!productName || !price || !firmId) {
      setError('Please fill out all required fields.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('bestseller', bestseller);
      category.forEach((value) => formData.append('category', value));

      const response = await fetch(`${API_URL}/product/addproduct/${firmId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${loginToken}` },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert('Product added successfully');
        setProductName('');
        setPrice('');
        setCategory([]);
        setDescription('');
        setBestseller(false);
        setImage(null);
      } else {
        alert(data.message || 'Failed to add product.');
      }
    } catch (error) {
      setError('An error occurred while adding the product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3">
      <div className="card shadow-sm mx-auto p-3" style={{ maxWidth: '600px' }}>
        <div className="card-header text-center bg-primary text-white py-3">
          <h5 className="mb-0">Add Product</h5>
        </div>
        <div className="card-body p-3">
          {error && <div className="alert alert-danger p-2">{error}</div>}
          <form onSubmit={handleAddProduct}>
            <div className="mb-2">
              <input type="text" className="form-control" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
            </div>
            <div className="mb-2">
              <input type="text" className="form-control" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Category</label>
              <div className="d-flex flex-wrap gap-2">
                {['veg', 'non-veg'].map((type) => (
                  <div className="form-check" key={type}>
                    <input className="form-check-input" type="checkbox" value={type} checked={category.includes(type)} onChange={(e) => handleCheckboxChange(e, category, setCategory)} />
                    <label className="form-check-label">{type}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">Bestseller</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" value="true" checked={bestseller === true} onChange={handleBestseller} />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" value="false" checked={bestseller === false} onChange={handleBestseller} />
                  <label className="form-check-label">No</label>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <input className="form-control" type="file" onChange={handleImageChange} required />
            </div>
            <div className="mb-2">
              <textarea className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success w-100 btn-md" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
