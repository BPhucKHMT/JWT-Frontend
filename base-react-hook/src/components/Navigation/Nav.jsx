import React from 'react';
import './Nav.scss'
import {NavLink} from 'react-router-dom'
const Nav = props => {
    return (
        <div className="topnav">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/news" className={({ isActive }) => isActive ? "active" : ""}>News</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
      </div>
    );
};


export default Nav;