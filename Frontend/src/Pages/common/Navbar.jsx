import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo.jpg';

const Navbar = ({ loggedIn, username }) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token and userData from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        navigate(`/`);
    };


    return (
        <nav>
            <div>
                <div className="navbar__left">
                    <Link to="/">
                        <img src={logo} alt="ShotSpotter" />
                    </Link>
                </div>
                <div className="navbar__right">
                    <Link to="/studio">Explore</Link>
                    {userData ? (
                        <>
                            <Link to="/bookings">Bookings</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login">Sign In</Link>
                    )}
                </div>
            </div>
            <div>
                {userData ? (
                    <div style={{ backgroundColor: '#e0f2e9' }}>
                        <p><b>Hey, {userData.username}</b></p>
                    </div>
                ) : (
                    <div>
                        <p>You must login first !!!</p>
                    </div>
                )}
            </div>

        </nav>
    );
};

export default Navbar;
