import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../auth/Login.css'; // Import the CSS file

const Login = ({baseURL}) => {
  useEffect(() => {
    document.title = 'User Login';
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
      
    try {
      const response = await fetch(`${baseURL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        
        alert(data.msg);
        console.log(data);

        localStorage.setItem('token', data.token);
        localStorage.setItem('userData',JSON.stringify(data));
        // setToken(token);
        navigate('/studio');
      } else {
        // Login failed, display error message
        const errorData = await response.json();
        setErrorMessage(errorData.msg);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  }
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register" className="register-link">Register</Link>
      </p>
    </div>
  );
};

export default Login;