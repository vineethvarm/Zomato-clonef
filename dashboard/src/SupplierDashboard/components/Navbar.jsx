
import React, { useState, useEffect } from 'react';

const Navbar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler }) => {
  const [firmName, setFirmName] = useState('');

  useEffect(() => {
    setFirmName(localStorage.getItem('restaurantName') || 'No Name');
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarTogglerDemo01" 
          aria-controls="navbarTogglerDemo01" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand fscontainer" href="#">Dashboard</a>

          <div className="restaurantName navbar-nav ms-auto mb-2 mb-lg-0">
            <h4>Restaurant Name: {firmName}</h4>
          </div>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!showLogOut ? (
              <>
                <li className="nav-item">
                  <a className="nav-link fscontainer" href="#" onClick={showLoginHandler}>
                    Log In
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fscontainer" href="#" onClick={showRegisterHandler}>
                    Sign Up
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link fscontainer" href="#" onClick={logOutHandler}>
                  Log Out
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

