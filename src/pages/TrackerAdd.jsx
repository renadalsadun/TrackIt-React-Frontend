import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import TrackerForm from '../components/TrackerForm/TrackerForm'
import { authorizedRequest } from '../lib/api'



function TrackerAdd() {
    
    const FIELDS_LIST = [
        'company' , 'organization' , 'university' , 'location' , 'website' , 'link' , 
        'description' , 'referral' , 'contact' , 'notes' , 'priority' , 'date_applied' ,
        'deadline' , 'interview_date' , 'start_date' , 'end_date' , 'documents'
        ]

    const [name, setName] = useState('')
    const [checkedFields , setCheckedFields] = useState([])
    
    //error handling
    const [error,setError] = useState(null)


    async function handleSubmit(event){

        event.preventDefault()
        const fields = checkedFields
        const payload = {name, fields}
        try{
            const response = await authorizedRequest(
                'post',
                `trackers/new/`,
                payload
            )
    
        }
        catch{
            setError('Something went wrong. Please try again later')
        }
        
    }



    return (
    <div>
        <h2> TrackerAdd </h2>
        {error ? (<p>{error}</p>) : {}}

        <TrackerForm 
            name = {name}
            FIELDS_LIST = {FIELDS_LIST}
            setName = {setName}
            checkedFields = {checkedFields}
            setCheckedFields = {setCheckedFields}
            formTitle='Add New Tracker'
            submitButtonText = 'Add'
            handleSubmit = {handleSubmit}
        />
    </div>
    )
}



export default TrackerAdd



