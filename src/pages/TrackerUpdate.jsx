import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import TrackerForm from '../components/TrackerForm/TrackerForm'
import { useParams } from 'react-router'
import { useEffect } from 'react'


//// need to handel the user
function TrackerUpdate(props) {

    const FIELDS_LIST = [
        'company' , 'organization' , 'university' , 'location' , 'website' , 'link' , 
        'description' , 'referral' , 'contact' , 'notes' , 'priority' , 'date_applied' ,
        'deadline' , 'interview_date' , 'start_date' , 'end_date' , 'documents'
        ]

    const { id } = useParams()
    const [name, setName] = useState('')
    const [checkedFields , setCheckedFields] = useState([])



    //to get the clicked Tracker's data from its id!
    async function getCurrentResponceData() {
        const response = await axios.get(`http://127.0.0.1:8000/api/trackers/${id}/`)
        setName(response.data.name)
        setCheckedFields(response.data.fields)
    }


    useEffect(()=>{
        getCurrentResponceData()},[])



    async function handleSubmit(event){
        // we will get a Promise instead of the result if we did not use async
        // and to solve CORS issue add to django ()

        event.preventDefault()
        const fields = checkedFields
        const payload = {name, fields, user:1} ////MUST HANDEL USERS LATER!
        const url = `http://127.0.0.1:8000/api/trackers/${id}/update/`
        const response = await axios.patch(url, payload)
        console.log(response)
    }


    return (
    <div>
        <h2> TrackerUpdate </h2>
        <TrackerForm 
            name = {name}
            FIELDS_LIST = {FIELDS_LIST}
            setName = {setName}
            checkedFields = {checkedFields}
            setCheckedFields = {setCheckedFields}
            formTitle={`Edit ${name} Tracker`}
            submitButtonText = 'Done'
            handleSubmit = {handleSubmit}
        />
    </div>
    )
}



export default TrackerUpdate



