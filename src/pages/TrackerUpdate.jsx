import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import { authorizedRequest } from '../lib/api'
import TrackerForm from '../components/TrackerForm/TrackerForm'


//// need to handel the user
function TrackerUpdate(props) {

    const FIELDS_LIST = [
        'company', 'organization', 'university', 'location', 'website', 'link',
        'description', 'referral', 'contact', 'notes', 'priority', 'date_applied',
        'deadline', 'interview_date', 'start_date', 'end_date', 'documents'
    ]

    const { id } = useParams()
    const [name, setName] = useState('')
    const [checkedFields, setCheckedFields] = useState([])
    const navigate = useNavigate()
    const [error, setError] = useState('') //error handling



    //to get the clicked Tracker's data from its id!
    async function getCurrentResponceData() {
        try {

            const response = await authorizedRequest(
                'get',
                `trackers/${id}/`
            )
            setName(response.data.name)
            setCheckedFields(response.data.fields)
        }
        catch {
            if (err.response?.status === 404) {
                navigate('/not-found')
            } else {
                setError('Failed to fetch tracker. Please try again later')
            }

        }
    }


    useEffect(() => {
        getCurrentResponceData()
    }, [])



    async function handleSubmit(event) {
        // 200 : 400

        event.preventDefault()
        const fields = checkedFields
        const payload = { name, fields }
        try {

            const response = await authorizedRequest(
                'patch',
                `trackers/${id}/update/`,
                payload
            )

            navigate(`/trackers/${id}`)
        }
        catch {
            setError('Failed to update tracker. Please try again')
        }
    }


    return (
        <div>
            <h2> TrackerUpdate </h2>

            <TrackerForm
                name={name}
                FIELDS_LIST={FIELDS_LIST}
                setName={setName}
                checkedFields={checkedFields}
                setCheckedFields={setCheckedFields}
                formTitle={`Edit ${name} Tracker`}
                submitButtonText='Done'
                handleSubmit={handleSubmit}
            />
            {error ? (<p>{error}</p>) : (<p></p>)}

        </div>
    )
}



export default TrackerUpdate



