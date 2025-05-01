import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'



function TrackerDetail() {

    const [tracker, setTracker] = useState(null)
    const { id } = useParams()
    const [errMessage, setErrMessage] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const navigate = useNavigate()



    async function getTracker() {
        // we will get a Promise instead of the result if we did not use async
        // and to solve CORS issue add to django ()
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/trackers/${id}`)
            console.log(response)
            setTracker(response.data)

        }
        catch (err) {
            if (err.status === 404) {
                navigate('/not-found')
            }
            else {
                setErrMessage('Something went Wrong')
            }
        }
    }

    useEffect(() => {
        getTracker()
    }, [])



    async function deleteTracker() {
        //get the post from the API
        // `http://127.0.0.1:8000/api/trackers/${id}/delete/`
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/trackers/${id}/delete/`)
            // we got the id from the user params !
            if (response.status === 204)
                navigate('/Home')

        }
        catch (err) {
            console.log(err)
        }
    }

    function showConfirmDelete() {
        setDeleteConfirm(true)
    }


    if (errMessage) return <h1>{errMessage}</h1>

    return (
        <>
            <h2>TrackerDetail</h2>
            {tracker
                ?
                (
                    <>
                        <h2>{tracker.name}</h2>
                        <p>created on:  {tracker.date_created.slice(0, 10)}</p>
                        {/* tracker applications */}
                        {/* <button>Delete</button> */}
                        {
                            deleteConfirm
                                ?
                                <button onClick={deleteTracker}>Are you Sure?</button>
                                :
                                <button onClick={showConfirmDelete}>Delete</button>

                        }

                        <button>Edit</button>

                    </>
                ) :
                (<h1>Loading Your Tracker</h1>)
            }

        </>
    )
}

export default TrackerDetail