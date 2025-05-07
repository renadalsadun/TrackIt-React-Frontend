import { ToastContainer, toast } from 'react-toastify'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import TrackerForm from '../components/TrackerForm/TrackerForm'
import { authorizedRequest } from '../lib/api'



function TrackerAdd() {

    const FIELDS_LIST = [
        'company', 'organization', 'university', 'location', 'website', 'link',
        'description', 'referral', 'contact', 'notes', 'priority', 'date_applied',
        'deadline', 'interview_date', 'start_date', 'end_date', 'documents'
    ]

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [checkedFields, setCheckedFields] = useState([])

    //error handling
    const [error, setError] = useState(null)


    async function handleSubmit(event) {

        event.preventDefault()
        const fields = checkedFields
        const payload = { name, fields }
        try {
            const response = await authorizedRequest(
                'post',
                `trackers/new/`,
                payload
            )
            setError(null)
            toast.success('Tracker Added Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setTimeout(() => {
                navigate(`/home`)
            }, 5000)


        }
        catch {
            setError('Something went wrong. Please try again later')
            toast.error('Something went wrong', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }

    }



    return (
        <div>

            <TrackerForm
                name={name}
                FIELDS_LIST={FIELDS_LIST}
                setName={setName}
                checkedFields={checkedFields}
                setCheckedFields={setCheckedFields}
                formTitle='Add New Tracker'
                submitButtonText='Add'
                handleSubmit={handleSubmit}
            />
            <ToastContainer />

        </div>
    )
}



export default TrackerAdd



