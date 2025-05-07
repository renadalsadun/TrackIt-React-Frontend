import React from 'react'
import { useNavigate } from 'react-router'

import TrackerList from '../components/TrackerList/TrackerList'

function Home() {

    const navigate = useNavigate()

    function navigateToAddTracker(){
        navigate(`/trackers/add`)
    }

    return (
        <>
            <TrackerList />
            <button className="button is-success" type='button' onClick={navigateToAddTracker}>
                <span>Add Tracker</span>
            </button>

        </>
    )
}

export default Home