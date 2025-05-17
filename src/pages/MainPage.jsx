import React from 'react'

function MainPage() {
    return (
        <>

            <div className=' container is-widescreen'>
                <section className="hero is-large " style={{ backgroundColor: '#FAF2F2' }}>
                    <div className="hero-body">
                        <p className="title is-1 bebas-neue-font">Track IT</p>
                        <p className="subtitle large">All in One Place</p>
                    </div>
                </section>

                <h1 className='title is-1 is-spaced'>Track & Organize Anything!</h1>
            </div>
            <div className=' container is-widescreen'>
                <p><a href='http://localhost:5173/signup'>Sign Up</a> to Start Tracking</p>
            </div>
        </>
    )
}

export default MainPage