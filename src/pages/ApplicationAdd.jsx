import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import ApplicationForm from '../components/ApplicationForm/ApplicationForm'
import { useParams } from 'react-router'
import { useEffect } from 'react'



function ApplicationAdd() {
    
    const DATE_FIELDS = [ 'date_applied' , 'deadline' , 'interview_date' , 'start_date' , 'end_date' ]
    const { trackerId } =  useParams() //trackerid
    const [formFields, setFormFields] = useState({})
    const [fields, setFields] = useState([])
    const [tracker, setTracker] = useState({})
    
    async function getFields(){
        //get the tracker object using id
        //get its fields attr
        const response = await axios.get(`http://127.0.0.1:8000/api/trackers/${trackerId}`)
        setFields(response.data.fields)
        setTracker(response.data)
        console.log(response.data.fields)
    }


    useEffect( () => 
        { getFields() } ,[] )



    async function handleSubmit(event){
        event.preventDefault()
        const payload = { ...formFields, tracker:trackerId }
        const url = 'http://127.0.0.1:8000/api/applications/new/'
        const response = await axios.post(url, payload)
        console.log(response)
    }


// formTitle handleSubmit fields DATE_FIELDS formFields setFormFields submitButtonText

    return (
    <div>
        <h2> ApplicationAdd </h2>
        <ApplicationForm 
            formTitle='Add New Application'
            fields = {fields}
            DATE_FIELDS = {DATE_FIELDS}
            formFields = {formFields}
            setFormFields = {setFormFields}
            submitButtonText = 'Add'
            handleSubmit = {handleSubmit}
        />
    </div>
    )
}



export default ApplicationAdd



