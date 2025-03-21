

import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ showGreetingsHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/supplier/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert("User Logged In Successfully");
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken', data.token);
        showGreetingsHandler()
      };
        const supplierId = data.supplierId;
        console.log(supplierId);
        const supplierResponse = await fetch(`${API_URL}/supplier/onesupplier/${supplierId}`);
        const supplierData = await supplierResponse.json();
        if(supplierResponse.ok){
          const supplierFirmId = supplierData.supplierFirmId;
          console.log("checking for firmId", supplierFirmId);
          const supplierFirmName = supplierData.supplier.firm[0].restaurantName;
          localStorage.setItem("firmId", supplierFirmId);
          localStorage.setItem("restaurantName", supplierFirmName);
          window.location.reload()
        
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className='box container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-6 col-lg-4'>
          <div className='card'>
            <div className='card-header text-center'>
              <h3>Log In</h3>
            </div>
            <div className='card-body'>
              <form className='loginform' onSubmit={loginHandler}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  <div id="emailHelp" className="form-text">Enter Your Email Id</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" aria-describedby="PasswordHelp" />
                  <div id="PasswordHelp" className="form-text"> Enter Your Password</div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;