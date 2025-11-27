import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    substation: "",
    idNumber: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = "ID Number is required";
    } else if (!/^BFP-\d{5,}$/.test(formData.idNumber)) {
      newErrors.idNumber = "Invalid ID format (e.g., BFP-01234)";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Clear login error when user makes changes
    if (loginError) {
      setLoginError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Remove validation - allow login even with empty fields
    setIsLoading(true);
    setLoginError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication logic - check if fields have content
      if (formData.idNumber === "BFP-01234" && formData.password === "admin123" && formData.substation) {
        // Store auth token or user info in localStorage/sessionStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({
          id: formData.idNumber,
          name: "Admin User",
          substation: formData.substation
        }));
        navigate("/");
      } else {
        // Allow navigation even with empty fields for demo
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({
          id: formData.idNumber || "Guest",
          name: "Guest User",
          substation: formData.substation || "Not specified"
        }));
        navigate("/");
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-left-content">
          <h1 className="login-left-title">Welcome back to BFP Super Admin Portal</h1>
          <p className="login-left-subtitle">Secure access to fire incident management system</p>
          
          <div className="login-features">
            <h3>How does it work?</h3>
            <ul>
              <li>Enter your ID number and password</li>
              <li>Access your dashboard instantly</li>
            </ul>
          </div>
          
          <div className="login-footer">
            <p>Powered by BFP IT Department</p>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Let's get started</h1>
            <p className="login-sub">Sign-up your account</p>
          </div>

          {loginError && (
            <div className="auth-error">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>

            <div className="auth-group">
              <label>ID Number</label>
              <input 
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                placeholder="Enter your ID (e.g., BFP-01234)" 
                className={errors.idNumber ? "error" : ""}
              />
              {errors.idNumber && (
                <span className="error-message">{errors.idNumber}</span>
              )}
            </div>

            <div className="auth-group">
              <label>Password</label>
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password" 
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <button className="login-btn" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Log-in"}
            </button>
          </form>

          <div className="auth-bottom">
            <span>Don't have an account?</span>
            <Link to="/signup">Sign Up</Link>
          </div>

        </div>
      </div>
    </div>
  );
}