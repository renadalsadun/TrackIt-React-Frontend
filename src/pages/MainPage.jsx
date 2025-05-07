import React from 'react'

function MainPage() {
    return (
        <>

            <div className=' container is-widescreen'>
                <section class="hero is-large is-link">
                    <div class="hero-body">
                        <p class="title is-1">Track IT</p>
                        <p class="subtitle">All in One Place</p>
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