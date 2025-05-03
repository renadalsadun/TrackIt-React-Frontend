import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import TrackerForm from '../components/TrackerForm/TrackerForm'



function TrackerAdd() {
    
    const FIELDS_LIST = [
        'company' , 'organization' , 'university' , 'location' , 'website' , 'link' , 
        'description' , 'referral' , 'contact' , 'notes' , 'priority' , 'date_applied' ,
        'deadline' , 'interview_date' , 'start_date' , 'end_date' , 'documents'
        ]

    const [name, setName] = useState('')
    const [checkedFields , setCheckedFields] = useState([])
    
    async function handleSubmit(event){
        // we will get a Promise instead of the result if we did not use async
        // and to solve CORS issue add to django ()

        event.preventDefault()
        const fields = checkedFields
        const payload = {name, fields, user:1} ////MUST HANDEL USERS LATER!
        const url = 'http://127.0.0.1:8000/api/trackers/new/'
        const response = await axios.post(url, payload)
        console.log(response)
        // setName('')
        // setCheckedFields('')
    }



    return (
    <div>
        <h2> TrackerAdd </h2>
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



