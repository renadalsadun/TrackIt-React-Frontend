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
            setLoading(false)

        }
        catch (error) {
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

    if (trackers.length === 0) {
        return (
            <div className='has-text-centered'>
                <h2 className='title is-3'> No Trackers Found</h2>
                <p><a href="/trackers/add">Add Some</a></p>
            </div>
        )
    }
    if (error) {
        return (
            <div className='has-text-centered'>
                <p>{error}</p>
            </div>
        )
    }
    return (
        <div className="container has-text-centered">
            <h2 className='title is-2 has-text-left	'>Trackers</h2>
            <div className='columns is-multiline is-centered'>
                {trackers.map(tracker => {
                    return (
                        <div className='column is-one-quarter' key={tracker.id}>
                            <Link to={`/trackers/${tracker.id}`} className="box title is-4">
                                {tracker.name}
                            </Link>
                        </div>
                    )
                })
                }
            </div>

        </div>

    )

}

export default TrackerList