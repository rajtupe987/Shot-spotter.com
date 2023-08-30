import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Import the CSS file

const Register = ({baseURL}) => {

  useEffect(() => {
    document.title = 'Signup on ShotSpotter';
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        // Registration successful, navigate to login page
        navigate('/login');
      } else {
        // Registration failed, display error message
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('An error occurred during registration. Please try again.');
    }
  };
  const google = () => {
    window.location.href = `${baseURL}/auth/google/callback`;
  };

  const github = () => {
    window.location.href = `${baseURL}/auth/github/callback`;
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="register-button">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login" className="login-link">Login</Link>
      </p>
      <div className="oauth-buttons">
        <button className="google-button" onClick={google} >
          <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" /> Sign up with Google</button>
        <button className="github-button" onClick={github} >
          <img src="https://cdn-icons-png.flaticon.com/128/179/179323.png" /> Sign up with GitHub</button>
      </div>
    </div>
  );
};

export default Register;
