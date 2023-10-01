import React from 'react'
import Login from '../Login/Login'
import './Navbar.css'

export default function Navbar() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    return (
        <div className="navbar-container">
            <div className="navbar-element">
                <img src="./logo/logo-no-text-nobg.png" alt="logo" className='navbar-logo' />
                <img src="./logo/logo-text.png" alt="logo text" className='logo-text' />
            </div>

            <div className="navbar-element">
                <Login />
            </div>
        </div>
    )
}
