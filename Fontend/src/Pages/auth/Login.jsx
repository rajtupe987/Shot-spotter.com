import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Perform login request to the backend
        try {
            const response = await fetch('https://your-api-url/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                // Login successful, navigate to studio page
                history.push('/studio');
            } else {
                // Login failed, display error message
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('An error occurred during login. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;
