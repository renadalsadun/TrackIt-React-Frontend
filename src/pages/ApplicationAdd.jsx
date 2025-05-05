import axios from 'axios'
import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router'

import ApplicationForm from '../components/ApplicationForm/ApplicationForm'
import { authorizedRequest } from '../lib/api'



function ApplicationAdd() {
    
    const DATE_FIELDS = [ 'date_applied' , 'deadline' , 'interview_date' , 'start_date' , 'end_date' ]
    const { trackerId } =  useParams() //trackerid
    const [formFields, setFormFields] = useState({})
    const [fields, setFields] = useState([])
    
    async function getFields(){
        //get the tracker object using id
        //get its fields attr
        const response = await authorizedRequest(
            'get',
            `trackers/${trackerId}/`
        )
        setFields(response.data.fields)
        console.log(response.data.fields)
    }


    useEffect( () => 
        { getFields() } ,[] )



    async function handleSubmit(event){
        event.preventDefault()
        const payload = { ...formFields, tracker:trackerId }
        try{
            const response = await authorizedRequest(
                'post',
                `applications/new/`,
                payload
            )
    
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



