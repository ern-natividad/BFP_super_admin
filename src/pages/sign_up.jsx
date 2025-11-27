import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/login.css'; 

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up form submitted!");
  };

  return (
    <div className="login-container">
      <form 
        onSubmit={handleSubmit}
        className="login-card"
      > 
        <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="back-button"
          >
            Back
          </button>
          <div className="login-header">
          
          
          
          <h2>Set Up your profile</h2>
          <p>Create your BFP account to manage emergency calls, post safety tips, and update reports securely.</p>
        </div>
        
        <div className="form-box">
          
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input 
              type="text" 
              name="firstname" 
              id="name" 
              required
              placeholder="Value"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Last Name</label>
            <input 
              type="text" 
              name="lastname" 
              id="name" 
              required
              placeholder="Value"
            />
          </div>

          <div className="form-group">
            <label htmlFor="id_number">ID Number</label>
            <input 
              type="number"
              name="ID_number" 
              id="id_number" 
              required
              placeholder="Value"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="rank">Rank</label>
            <input 
              type="text" 
              name="rank" 
              id="rank" 
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

          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input 
              type="password" 
              name="confirm_password" 
              id="confirm_password" 
              required
              placeholder="Value"
            />
          </div>

          <div>
            <button 
              type="submit"
              className="login-button"
            >
              Sign-Up
            </button>
          </div>
        </div>
        
        <div className="signup-link-container">
          Have an account? 
          <Link to="/" className="signup-link">
            Log-in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;