import React from 'react'
import { useNavigate } from 'react-router'

import TrackerList from '../components/TrackerList/TrackerList'

function Home() {

    const navigate = useNavigate()

    function navigateToAddTracker() {
        navigate(`/trackers/add`)
    }

    return (
        <>
            <TrackerList />
            <div className='has-text-right' style={{ marginTop: '7rem', marginRight: '10rem' }}>
                <button className="button is-success is-large " type='button' onClick={navigateToAddTracker}>
                    <span>Add New Tracker</span>
                </button>
            </div>


        </>
    )
}

export default Home