import { ToastContainer, toast } from 'react-toastify'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import ApplicationForm from '../components/ApplicationForm/ApplicationForm'
import { authorizedRequest } from '../lib/api'



function ApplicationAdd() {

    const DATE_FIELDS = ['date_applied', 'deadline', 'interview_date', 'start_date', 'end_date']
    const { trackerId } = useParams() //trackerid
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


    useEffect(() => { getFields() }, [])



    async function handleSubmit(event) {
        event.preventDefault()
        const payload = { ...formFields, tracker: trackerId }
        try {
            const response = await authorizedRequest(
                'post',
                `applications/new/`,
                payload
            )
            if (response.status === 201) {
                setError(null)
                // sourse : React-Toastify Docs
                toast.success('Application Added Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })

            }
            else{
            // sourse : React-Toastify Docs

            toast.error('Something went wrong', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })

            }

        }
        catch (error) {
            setError('Adding Application Failed. Please try again later')
        }

    }


    if (loading) {
        return <p>Loading form...</p>
    }


    return (
        <div>
            <ApplicationForm
                formTitle='Add New Application'
                fields={fields}
                DATE_FIELDS={DATE_FIELDS}
                formFields={formFields}
                setFormFields={setFormFields}
                submitButtonText='Add'
                handleSubmit={handleSubmit}
            />
            <ToastContainer/>
            {error ? (<p>{error}</p>) : (<p></p>)}

        </div>
    )
}



export default ApplicationAdd



