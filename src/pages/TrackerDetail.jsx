import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'



function TrackerDetail() {

    const [tracker, setTracker] = useState(null)
    const { id } = useParams()
    // const [errMessage, setErrMessage] = useState('')
    // const [deleteConfirm, setDeleteConfirm] = useState(false)


    async function getTracker() {
        // we will get a Promise instead of the result if we did not use async
        // and to solve CORS issue add to django ()

        const response = await axios.get(`http://127.0.0.1:8000/api/trackers/${id}`)
        console.log(response)
        setTracker(response.data)
    }

    useEffect(() => {
        getTracker()
    }, [])



    return (
        <>
            <h2>TrackerDetail</h2>
            {tracker
            ?
            (
                <>
                <h2>{tracker.name}</h2>
                <p>{tracker.date_created}</p>
                            {/* tracker applications */}

                </>            
            ):
            (<h1>No Tracker</h1>)
            }

        </>
    )
}

export default TrackerDetail