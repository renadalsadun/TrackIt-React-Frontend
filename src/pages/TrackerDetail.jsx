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
            if (response.status === 204) {
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
                        <h2 className='title is-2 has-text-black' style={{ marginLeft: '20px' }}>{`${tracker.name} Tracker`}</h2>
                        <p className= 'has-text-black'style={{ marginLeft: '25px', marginBottom: '20px' }}>created on:  {tracker.date_created.slice(0, 10)}</p>
                        {/* tracker applications */}
                        <ApplicationList
                            id={id}
                            setFields={setFields}
                            fields={fields}
                        />
                        <div className='has-text-right'>
                            <button className="button is-success" style={{ marginRight: '20px', marginBottom: '20px' }} onClick={navigateToAddApplication}>Add Application</button>

                            {
                                deleteConfirm
                                    ?
                                    <button className="button is-danger" style={{ marginRight: '20px', marginBottom: '20px' }} onClick={deleteTracker}>Are you Sure?</button>
                                    :
                                    <button className="button is-danger"
                                        style={{ marginRight: '20px', marginBottom: '20px' }}
                                        onClick={showConfirmDelete}>
                                        Delete Tracker
                                    </button>

                            }

                            <button className="button is-warning " style={{ marginRight: '20px', marginBottom: '20px' }} onClick={navigateToEditTracker}>Edit Tracker</button>
                        </div>
                    </>
                ) :
                (<h1>Loading ...</h1>)
            }

        </>
    )
}

export default TrackerDetail