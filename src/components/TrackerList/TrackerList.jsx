import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router"

import { authorizedRequest } from '../../lib/api'



function TrackerList() {


    const [trackers, setTrackers] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)


    async function getAllTrackers() { // 401 unautherized
        try {
            const response = await authorizedRequest(
                'get',
                `trackers/`
            )
            setTrackers(response.data)
            setLoading(false)

        }
        catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                toast.error('Forbidden', {
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'colored'
                })
            } 
            else 
            {
                setError('Something went wrong. Please try again later')
            }
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
                        <div className='column is-four-fifths' key={tracker.id}>
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