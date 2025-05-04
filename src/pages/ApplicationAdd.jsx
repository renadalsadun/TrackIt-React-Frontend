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
    
    async function getFields(){
        //get the tracker object using id
        //get its fields attr
        const response = await axios.get(`http://127.0.0.1:8000/api/trackers/${trackerId}`)
        setFields(response.data.fields)
        console.log(response.data.fields)
    }


    useEffect( () => 
        { getFields() } ,[] )



    async function handleSubmit(event){
        event.preventDefault()
        const payload = { ...formFields, tracker:trackerId }
        console.log('Payload being sent:', payload) // <-- add this
        const url = 'http://127.0.0.1:8000/api/applications/new/'
        try{
            const response = await axios.post(url, payload)
        }
        catch (error){
            console.error("Server error:", error.response?.data || error.message)

        }

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



