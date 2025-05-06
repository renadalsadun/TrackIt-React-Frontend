import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router"

import { authorizedRequest } from '../../lib/api'



function TrackerList() {


    const [trackers, setTrackers] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)


    async function getAllTrackers() {
        try {
            const response = await authorizedRequest(
                'get',
                `trackers/`
            )
            setTrackers(response.data)

        }
        catch (error){
            setError('Something went wrong. Please try again later')
            setLoading(false) 
        }
    }

    useEffect(() => {
        getAllTrackers()
    }, [])



    if (loading) {
        return <p>Loading trackers...</p>
    }

    if (trackers.length === 0){
        return(
            <div>
                <h2>No Trackers Found</h2>
                <p><a href="/trackers/add">Add Some</a></p>
            </div>
        )
    }
    if(error){
        return(
            <p>{error}</p>
        )
    }
    return (
        <div>
            <h2>Trackers</h2>
            <ul>
                {trackers.map(tracker => {
                    return (
                        <li key={tracker.id}>
                            <Link to={`/trackers/${tracker.id}`}> {tracker.name} </Link>
                        </li>
                    )
                })
                }
            </ul>

        </div>

    )

}

export default TrackerList