import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { authorizedRequest } from '../lib/api'
import ApplicationForm from '../components/ApplicationForm/ApplicationForm'



function ApplicationUpdate() {
    // i will have the tracker id and the application id 
    const DATE_FIELDS = ['date_applied', 'deadline', 'interview_date', 'start_date', 'end_date']
    const { trackerId, applicationId } = useParams();
    const [formFields, setFormFields] = useState({})
    const [fields, setFields] = useState([])


    //error handling
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)



    async function getFields() {
        //get the tracker object using id
        //get its fields attr
        try {
            const response = await authorizedRequest(
                'get',
                `trackers/${trackerId}/`
            )
            setFields(response.data.fields)
            setLoading(false)
        }
        catch (error) {
            setError('Something went wrong. Please try again later')
            setLoading(false)
        }
    }

    async function getApplication() {
        //get the application object using id
        //get its attrs
        try {
            const response = await authorizedRequest(
                'get',
                `applications/${applicationId}/`
            )
            setFormFields(response.data)

        }
        catch (error) {
            setError('Something went wrong. Please try again later')
        }

    }

    useEffect(() => {
        getFields()
        getApplication()
    }, [])



    async function handleSubmit(event) {
        event.preventDefault()
        const payload = { ...formFields, tracker: trackerId }
        try {
            const response = await authorizedRequest(
                'patch',
                `applications/${applicationId}/update/`,
                payload
            )

        }
        catch {
            setError('Something went wrong. Please try again later')
        }
    }


    return (
        <div>
            <ApplicationForm
                formTitle='Update Application'
                fields={fields}
                DATE_FIELDS={DATE_FIELDS}
                formFields={formFields}
                setFormFields={setFormFields}
                submitButtonText='Update'
                handleSubmit={handleSubmit}
            />
            {error ? (<p>{error}</p>) : (<p></p>)}

        </div>
    )
}



export default ApplicationUpdate



