import React from 'react';
import { Link } from 'react-router-dom';
import '../style/login.css'; 

const LogIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted!");
  };

  return (
    <div className="login-container">
      
      <form 
        onSubmit={handleSubmit}
        className="login-card"
      > 
        <div className="login-header">
          <h2>Welcome Back Admin</h2>
          <p>Please enter your details</p>
        </div>
        
        <div className="form-box">
          <div className="form-group">
            <label htmlFor="id_number">ID number</label>
            <input 
              type="number" 
              name="ID_number" 
              id="id_number" 
              required
              placeholder="Value"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              required
              placeholder="Value"
            />
          </div>

          <div>
            <Link to="/dashboard" className="dashboard-link">
            <button 
              type="submit"
              className="login-button"
            >
              Log In
            </button>
            </Link>
          </div>
        </div>
        
        <div className="text-links">
          <a href="#" className="forgot-password-link">
            Forgot password?
          </a>
        </div>

        <div className="signup-link-container">
          Don't have an account? 
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LogIn;