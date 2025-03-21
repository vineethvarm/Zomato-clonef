import React, { useState } from 'react';
import { API_URL } from '../../data/ApiPath';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/supplier/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("User Registered Successfully");
        showLoginHandler();
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("User Registration Failed");
    }
  }

  return (
    <div className='box container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header text-center'>
              <h3>Sign Up</h3>
            </div>
            <div className='card-body'>
              <form className='registerform' onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
                  <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="exampleInputUsername1" aria-describedby="UserHelp" />
                  <div id="UsernameHelp" className="form-text">Enter Username</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  <div id="emailHelp" className="form-text">Enter Email Id</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" aria-describedby="PasswordHelp" />
                  <div id="PasswordHelp" className="form-text">Enter Password</div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;