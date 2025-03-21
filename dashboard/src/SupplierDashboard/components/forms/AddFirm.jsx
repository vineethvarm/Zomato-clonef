
import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddFirm = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [number, setNumber] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState([]);
  const [offer, setOffer] = useState('');
  const [regionalFood, setRegionalFood] = useState([]);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckboxChange = (event, state, setState) => {
    const value = event.target.value;
    setState(state.includes(value) ? state.filter((item) => item !== value) : [...state, value]);
  };

  const handleImageChange = (event) => setFile(event.target.files[0]);

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantName || !number || !location) {
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
      formData.append('restaurantName', restaurantName);
      formData.append('ownerName', ownerName);
      formData.append('number', number);
      formData.append('offer', offer);
      formData.append('location', location);
      formData.append('image', file);
      category.forEach((value) => formData.append('category', value));
      regionalFood.forEach((value) => formData.append('regionalFood', value));

      const response = await fetch(`${API_URL}/firm/addfirm`, {
        method: 'POST',
        headers: { token: `${loginToken}` },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert('Firm added successfully');
        setRestaurantName('');
        setOwnerName('');
        setNumber('');
        setFile(null);
        setCategory([]);
        setOffer('');
        setRegionalFood([]);
        setLocation('');
        localStorage.setItem('firmId', data.firmId);
      } else {
        alert(data.message || 'Failed to add firm.');
      }
    } catch (error) {
      setError('An error occurred while adding the firm.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3">
      <div className="card shadow-sm mx-auto p-3" style={{ maxWidth: '600px' }}>
        <div className="card-header text-center bg-primary text-white py-3">
          <h5 className="mb-0">Add Firm</h5>
        </div>
        <div className="card-body p-3">
          {error && <div className="alert alert-danger p-2">{error}</div>}
          <form onSubmit={handleFirmSubmit}>
            <div className="mb-2">
              <input type="text" className="form-control" placeholder="Restaurant Name" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required />
            </div>
            <div className="mb-2">
              <input type="text" className="form-control" placeholder="Owner Name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required />
            </div>
            <div className="mb-2">
              <input type="number" className="form-control" placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} required />
            </div>
            <div className="mb-2">
              <input className="form-control" type="file" onChange={handleImageChange} required />
            </div>
            <div className="mb-2">
              <input type="text" className="form-control" placeholder="Offer" value={offer} onChange={(e) => setOffer(e.target.value)} />
            </div>
            <div className="mb-2">
              <input type="text" className="form-control" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <div className="mb-2">
              <label className="form-label mb-1">Category</label>
              <div className="d-flex flex-wrap gap-2">
                {['veg', 'non-veg'].map((type) => (
                  <div className="form-check" key={type}>
                    <input className="form-check-input" type="checkbox" value={type} checked={category.includes(type)} onChange={(e) => handleCheckboxChange(e, category, setCategory)} />
                    <label className="form-check-label">{type}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label mb-1">Regional Food</label>
              <div className="d-flex flex-wrap gap-2">
                {['breakfast', 'fast-food', 'biryani', 'chinese', 'snacks', 'meals'].map((food) => (
                  <div className="form-check" key={food}>
                    <input className="form-check-input" type="checkbox" value={food} checked={regionalFood.includes(food)} onChange={(e) => handleCheckboxChange(e, regionalFood, setRegionalFood)} />
                    <label className="form-check-label">{food}</label>
                  </div>
                ))}
              </div>
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

export default AddFirm;
