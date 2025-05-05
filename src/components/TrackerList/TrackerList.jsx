import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router"

import { authorizedRequest } from '../../lib/api'



function TrackerList() {


    const [trackers, setTrackers] = useState([])

    async function getAllTrackers() {

        const response = await authorizedRequest(
            'get',
            `trackers/`
        )

        console.log(response)
        setTrackers(response.data)
    }

    useEffect(() => {
        getAllTrackers()
    }, [])



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