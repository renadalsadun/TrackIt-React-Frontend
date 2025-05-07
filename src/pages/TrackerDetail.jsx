import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

import ApplicationList from '../components/ApplicationList/ApplicationList'
import { authorizedRequest } from '../lib/api'


function TrackerDetail() {

    const [tracker, setTracker] = useState(null)
    const { id } = useParams() //tracker id
    const [errMessage, setErrMessage] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const navigate = useNavigate()
    const [fields, setFields] = useState([])



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



    function navigateToEditTracker() {
        /**
         * A function that handles the Edit button, used to navigate to tracker edit page
         */
        navigate(`/trackers/${id}/edit`)
    }


    function navigateToAddApplication() {
        /**
         * A function that handles the Add application button, used to navigate to application add page
         */
        navigate(`/trackers/${id}/applications/add`)
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
            if (response.status === 204){
                navigate('/Home')

            }


        }
        catch (err) {
            setErrMessage('Something went Wrong')
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
            {tracker
                ?
                (//has-text-left
                    <>
                        <h2 className='title is-2'>{`${tracker.name} Tracker`}</h2>
                        <p>created on:  {tracker.date_created.slice(0, 10)}</p>
                        {/* tracker applications */}
                        <ApplicationList
                            id={id}
                            setFields={setFields}
                            fields={fields}
                        />
                        <button className="button is-success is-outlined" onClick={navigateToAddApplication}>Add Application</button>

                        {
                            deleteConfirm
                                ?
                                <button className="button is-danger" onClick={deleteTracker}>Are you Sure?</button>
                                :
                                <button className="button is-danger is-outlined"
                                    onClick={showConfirmDelete}>
                                    Delete
                                </button>

                        }

                        <button className="button is-warning is-outlined" onClick={navigateToEditTracker}>Edit</button>

                    </>
                ) :
                (<h1>Loading ...</h1>)
            }

        </>
    )
}

export default TrackerDetail