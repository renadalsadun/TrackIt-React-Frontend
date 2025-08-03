import React from 'react'
import { useNavigate, Link } from "react-router";

function MainPage() {
    return (
        <div className = 'has-background-white	'>

            <div className=' container is-widescreen has-background-white'>
                <section className="hero is-large has-text-primary-dark	" style={{ backgroundColor: '#FAF2F2' }}>
                    <div className="hero-body">
                        <p className="title is-1 bebas-neue-font has-text-black	">Track IT</p>
                        <p className="subtitle large has-text-black	">All in One Place</p>
                    </div>
                </section>

                <h1 className='title is-1 is-spaced has-text-black	'>Track & Organize Anything!</h1>
            </div>
            <div className=' container is-widescreen'>
                <p className='has-text-black'><Link to='/signup'>Sign Up</Link> to Start Tracking</p>
            </div>
        </div>
    )
}

export default MainPage