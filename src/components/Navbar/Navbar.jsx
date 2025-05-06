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
            <>
                <li><Link to="/home">Trackers</Link></li>
                <li><Link to='trackers/add'>Add New Tracker</Link></li>
                <li><Link to='/documents'>Documents</Link></li>
                <li><button id='logout' onClick={logout} >Log Out</button></li>
            </>
        )
    }
    else{
        return (
            <ul>
                <li><Link to="/login">Log In</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
            </ul>
        )
    
    }
}

export default Navbar