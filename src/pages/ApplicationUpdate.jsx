import axios from 'axios'
import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router'

import { authorizedRequest } from '../lib/api'
import ApplicationForm from '../components/ApplicationForm/ApplicationForm'



function ApplicationUpdate() {
    // i will have the tracker id and the application id 
    const DATE_FIELDS = [ 'date_applied' , 'deadline' , 'interview_date' , 'start_date' , 'end_date' ]
    const { trackerId, applicationId } = useParams();
    const [formFields, setFormFields] = useState({})
    const [fields, setFields] = useState([])
    const [tracker, setTracker] = useState({})
    const [application, setApplication] = useState({})
    
    async function getFields(){
        //get the tracker object using id
        //get its fields attr
        const response = await authorizedRequest(
            'get',
            `trackers/${trackerId}/`
        )
        setFields(response.data.fields)
        setTracker(response.data)
        console.log(response.data.fields)
    }

    async function getApplication(){
        //get the application object using id
        //get its attrs
        const response = await authorizedRequest(
            'get',
            `applications/${applicationId}/`
        )
        console.log(response.data)
        setApplication(response.data)
        setFormFields(response.data)
    
    }

    useEffect( () => { 
        getFields()
        getApplication()
    } ,[] )



    async function handleSubmit(event){
        event.preventDefault()
        const payload = { ...formFields, tracker:trackerId }
        const response = await authorizedRequest(
            'patch',
            `applications/${applicationId}/update/`,
            payload
        )
        console.log(response)
    }


// formTitle handleSubmit fields DATE_FIELDS formFields setFormFields submitButtonText

    return (
    <div>
        <h2> ApplicationUpdate </h2>
        <ApplicationForm 
            formTitle='Update Application'
            fields = {fields}
            DATE_FIELDS = {DATE_FIELDS}
            formFields = {formFields}
            setFormFields = {setFormFields}
            submitButtonText = 'Update'
            handleSubmit = {handleSubmit}
        />
    </div>
    )
}



export default ApplicationUpdate



