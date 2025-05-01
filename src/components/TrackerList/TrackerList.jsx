import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router";



function TrackerList() {


    const [trackers, setTrackers] = useState([])

    async function getAllTrackers() {
        // we will get a Promise instead of the result if we did not use async
        // and to solve CORS issue add to django ()

        const response = await axios.get('http://127.0.0.1:8000/api/trackers/')
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