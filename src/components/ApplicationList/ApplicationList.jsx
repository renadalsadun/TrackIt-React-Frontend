import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router";

import { authorizedRequest } from '../../lib/api';



function ApplicationList(props) { // challenge 2 😾 use effect isn't effecting 

    const [applications, setApplications] = useState([])
    const [filteredApplications, setFilteredApplications] = useState([])
    const [loading, setLoading] = useState(true)


    async function getFieldsAndApplications() {
        // 1. get the TRACKER fields
        const trackerResponse = await authorizedRequest(
            'get',
            `trackers/${props.id}/`
        )
        props.setFields(trackerResponse.data.fields)

        // 2. get all the Applications 
        const applicationsResponse = await authorizedRequest(
            'get',
            `applications/`
        )
        console.log('applicationsResponse')
        console.log(applicationsResponse)
        setApplications(applicationsResponse.data)
    }




    async function getAllApplications() {
        // 2) filter them to the current Tracker
        // 3) filter their fields 
        // 3.1) add its id to it for navigation
        // 3.2) check if the field is priority to change it from a single letter to its meaning
        // 4) pass the clean applications ✨



        // 2 filter the Applications so that we have the ones that belong to THE CURRENT TRACKER
        const this_tracker_applications = applications.filter(
            (application) => application.tracker === Number(props.id))

        // 3
        const applications_with_tracker_fields = []
        // loop over applications, loop over the fields
        for (let i = 0; i < this_tracker_applications.length; i++) {
            const application_with_filtered_fields = {}
            // 3.1
            application_with_filtered_fields['id'] = this_tracker_applications[i].id

            props.fields.forEach((field) => {
                // 3.2 
                if (field === 'priority') {
                    const priority_dict = {
                        C: 'Critical',
                        H: 'High',
                        M: 'Medium',
                        L: 'Low'
                    }
                    application_with_filtered_fields[field] = priority_dict[this_tracker_applications[i][field]]

                }
                else {
                    application_with_filtered_fields[field] = this_tracker_applications[i][field]
                }
            })
            applications_with_tracker_fields.push(application_with_filtered_fields)
        }

        // 4
        setFilteredApplications(applications_with_tracker_fields)
    }






    // useEffect(() => {
    //     getFieldsAndApplications()
    // }, [])
    
    // useEffect(() => {
    //     getAllApplications()
    // }, [applications])

    useEffect(() => {
        async function getFieldsandLoading() {
            await getFieldsAndApplications()
            setLoading(false)
        }
        getFieldsandLoading()
    }, [])
    
    useEffect(() => {
        if (applications.length > 0) {
            getAllApplications()
        }
    }, [applications])
    
    if (loading) {
        return <p>Loading applications...</p>
    }
    
    if (filteredApplications.length === 0) {
        return <p>No applications found</p>
    }
    return (
        <div>
            <h2>Applications</h2>
            <table>
                <thead>
                    <tr>
                        {props.fields.map( (field) => {
                            return (
                                <th>{field}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>

                    {filteredApplications.map((application) => {
                        return (
                            <tr key = {application.id} >

                                { props.fields.map( (field) => {
                                    return (
                                        <td key={field}>{application[field]}</td>
                                    )
                                })}

                            </tr>
                        )
                    })}

                </tbody>
            </table>

        </div>

    )

}

export default ApplicationList