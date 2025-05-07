import React from 'react'

function NotFound() {
    return (
        <section className="hero is-fullheight has-text-centered ">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title is-1 has-text-danger">404 - Page Not Found 🚫</h1>
                    <p className="subtitle is-4">Make sure you're visiting the correct link!</p>
                    <a className="button is-primary mt-4" href="/">Go Home</a>
                </div>
            </div>
        </section>

    )
}

export default NotFound