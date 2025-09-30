import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Simulate API call - replace with your actual authentication service
      // const result = await authService.login(formData);
      
      // For demo purposes, we'll simulate a successful login
      if (formData.email && formData.password) {
        // Store user data in localStorage
        const userData = {
          email: formData.email,
          name: formData.email.split('@')[0], // Use part of email as name for demo
          avatar: formData.email.charAt(0).toUpperCase()
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', 'demo-token-' + Date.now());
        
        alert('Login Successful');
        navigate('/dashboard'); // Redirect to home or dashboard
      } else {
        alert('Please enter both email and password');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div>
    <Navbar />
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter email" 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="Enter password" 
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">SUBMIT</button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#00ffff' }}>
            Signup
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;