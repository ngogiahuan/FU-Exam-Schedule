import React from 'react'
import Login from '../Login/Login'
import './Navbar.css'

export default function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar-element">
                <div className='navbar-logo'>
                    <img src="../assets/images/logo/logo-noBG.png" alt="" />
                </div>

                <div className="navbar-title">
                    Exam Schedules
                </div>

                <Login />
            </div>
        </div>
    )
}
