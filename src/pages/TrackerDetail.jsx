import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import ApplicationList from '../components/ApplicationList/ApplicationList'



function TrackerDetail() {

    const [tracker, setTracker] = useState(null)
    const { id } = useParams() //tracker id
    const [errMessage, setErrMessage] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const navigate = useNavigate()
    const [fields, setFields] = useState([])
//id fields setFields 



    async function getTracker() {
        /**
         *  a function that gets the tracker using its id
         *  if the Tracker doesn't exist, navigate to not found page
         */

        try {
            const response = await authorizedRequest(
                'get',
                `trackers/${id}/`
            )
    
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



    function navigateToEditTracker(){
        /**
         * A function that handles the Edit button, used to navigate to tracker edit page
         */
        navigate(`/trackers/${id}/edit`)
    }



    async function deleteTracker() {
        /**
         * A function that handles the delete button, it deletes the Tracker by calling the API
         */
        //get the post from the API
        try {
            const response = await authorizedRequest(
                'delete',
                `trackers/${id}/delete/`
            )
    
            // we got the id from the user params !
            if (response.status === 204)
                navigate('/Home')

        }
        catch (err) {
            console.log(err)
        }
    }



    function showConfirmDelete() {
        /**
         * A function for confirming deletion
         */
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
                        <ApplicationList
                        id = {id}
                        setFields = {setFields}
                        fields = {fields}
                        />

                        {
                            deleteConfirm
                                ?
                                <button onClick={deleteTracker}>Are you Sure?</button>
                                :
                                <button onClick={showConfirmDelete}>Delete</button>

                        }

                        <button onClick={navigateToEditTracker}>Edit</button>

                    </>
                ) :
                (<h1>Loading ...</h1>)
            }

        </>
    )
}

export default TrackerDetail