import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link for navigation
import './navbar.css'; // Importing CSS for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="logo">MyApp</h1>
            <ul className="nav-links">
                <li><Link to="/services">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>

            </ul>
        </nav>
    );
};

export default Navbar;