import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">📚 BookStore</Link>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/" exact="true" activeclassname="active">Home</NavLink></li>
        <li><NavLink to="/login" activeclassname="active">Login</NavLink></li>
        <li><NavLink to="/register" activeclassname="active">Register</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
