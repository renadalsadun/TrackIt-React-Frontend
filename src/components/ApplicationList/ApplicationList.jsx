import React, { useEffect, useState } from 'react'

import { authorizedRequest } from '../../lib/api';



function ApplicationList(props) { // challenge 2 😾 use effect isn't effecting 

    const [applications, setApplications] = useState([])
    const [filteredApplications, setFilteredApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)



    async function getFieldsAndApplications() {
        // 1. get the TRACKER fields
        try {
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
            setApplications(applicationsResponse.data)
        }

        catch (error) {
            setError('Something went wrong while getting the data. Please try again later')
        }
    }




    async function getAllApplications() {

        try {
            // 3. filter the Applications so that we have the ones that belong to THE CURRENT TRACKER
            const this_tracker_applications = applications.filter(
                (application) => application.tracker === Number(props.id))

            // 4. filter application's fields 
            const applications_with_tracker_fields = []
            // loop over applications, loop over the fields
            for (let i = 0; i < this_tracker_applications.length; i++) {
                const application_with_filtered_fields = {}
                // 4.1. add its id to it for navigation
                application_with_filtered_fields['id'] = this_tracker_applications[i].id

                props.fields.forEach((field) => {
                    // 4.2. check if the field is priority to change it from a single letter to its meaning
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

            // 5. Pass the filtered applications
            setFilteredApplications(applications_with_tracker_fields)
        }
        catch (error){
            setError('Something went wrong while processing the data. Please try again later')
        }
    }



    useEffect(() => {
        async function getFieldsandLoading() {
            await getFieldsAndApplications()
            setLoading(false)
        }
        getFieldsandLoading()
    }, [])


    function fieldLabel(field){
        let newField = field.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        return newField.join(' ')
    }



    useEffect(() => {
        if (applications.length > 0) {
            getAllApplications()
        }
    },
        [applications])





    if (loading) {
        return <p className='title is-2 has-text-warning'>Loading applications...</p>
    }

    if (error) {
        return <p className='title is-2 has-text-danger'>{error}</p>
    }

    if (filteredApplications.length === 0) {
        return <p className='title is-2 '>No applications found</p>
    }

    return (
        <div>
            <h2 className='title is-4'>Applications</h2>
            <table className='table is-hoverable is-fullwidth'>
                <thead>
                    <tr>
                        {props.fields.map((field) => {
                            return (
                                <th>{fieldLabel(field)}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>

                    {filteredApplications.map((application) => {
                        return (
                            <tr key={application.id} >

                                {props.fields.map((field) => {
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