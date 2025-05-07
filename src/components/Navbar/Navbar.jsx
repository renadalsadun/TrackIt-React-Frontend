import React from 'react'
import { useNavigate, Link } from "react-router";


function Navbar() {

    const navigate = useNavigate();
    const refreshToken = localStorage.getItem('refresh_token')



    function logout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/'
    }


    if (refreshToken) {
        return (
            <nav className='navbar is-size-4 p-4 is-light mb-5' role='navigation' aria-label='main navigation'>
                <div className="navbar-brand">
                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <div className='navbar-item is-tab'>
                                <Link to="/home">Trackers</Link>
                            </div>
                            <div className='navbar-item is-tab'>
                                <Link to='trackers/add'>Add New Tracker</Link>
                            </div>
                            <div className='navbar-item is-tab'>
                                <Link to='/documents'>Documents</Link>
                            </div>
                            <div className='navbar-item is-tab'>
                                <button id='logout' onClick={logout} >Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
    else {
        return (
            <nav className='navbar' role='navigation' aria-label='main navigation'>
                <div className="navbar-brand">
                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <div className='navbar-item is-tab'>
                                <Link to="/login">Log In</Link>
                            </div>
                            <div className='navbar-item is-tab'>
                                <Link to='/signup'>Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        )

    }
}

export default Navbar