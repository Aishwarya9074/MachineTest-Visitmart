import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Ensure this CSS file is correctly linked
import { FaShoppingCart } from 'react-icons/fa'; // Importing cart icon from react-icons

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = (e) => {
        e.preventDefault(); // Prevent default action
        setShowDropdown(prev => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id'); 
        window.location.href = '/';
    };

    return (
        <nav className="navbar">
            
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/product">Products</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            <div className="user-options">
                <div className="cart-icon">
                    <Link to="/cart">
                        <FaShoppingCart />
                        <span className="cart-count">3</span> 
                    </Link>
                </div>
                <div className="user-icon" onClick={handleDropdownToggle}>
                    <div className="user-icon-circle">U</div>
                    <span>Account</span>
                </div>
                {showDropdown && (
                    <div className="dropdown-menu">
                        <Link to="/user/login" className="dropdown-item">Login</Link>
                        <a href="#!" onClick={handleLogout} className="dropdown-item">Logout</a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
