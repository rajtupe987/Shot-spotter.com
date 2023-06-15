import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ loggedIn, username }) => {
    return (
        <nav>
            <div className="navbar__left">
                <Link to="/">
                    <img src="/path/to/shotspotter-logo.png" alt="ShotSpotter Logo" />
                </Link>
            </div>
            <div className="navbar__right">
                <Link to="/studio">Explore</Link>
                {loggedIn ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <span>{username}</span>
                    </>
                ) : (
                    <Link to="/login">Sign In</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
