import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Perform registration request to the backend
        try {
            const response = await fetch('https://your-api-url/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                // Registration successful, navigate to login page
                history.push('/login');
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

    return (
        <div>
            <h2>Register</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
