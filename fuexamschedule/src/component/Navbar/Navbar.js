import React from 'react'
import Login from '../Login/Login'
import './Navbar.css'

export default function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar-element">
                <Login />
            </div>
        </div>
    )
}
