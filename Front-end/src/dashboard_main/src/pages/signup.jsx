import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../components/services/authService';
import './style.css';
import Navbar from '../../../components/Navbar';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const result = await authService.signup({
        email,
        password
      });

      if (result.status === 'ok') {
        alert("Signup Successful");
        navigate('/login');
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div><Navbar/>
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Retype Password</label>
        <input
          type="password"
          placeholder="Re-enter password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleSignup}>SUBMIT</button>

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#00ffff' }}>
            Login
          </Link>
        </p>
        

      </div>
    </div>
    </div>
  );
}

export default Signup;
