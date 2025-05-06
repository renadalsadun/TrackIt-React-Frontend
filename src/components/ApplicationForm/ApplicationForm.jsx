import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { authorizedRequest } from '../../lib/api'



function ApplicationForm(props) {


    const [documents, setDocuments] = useState([])
    const navigate = useNavigate() //there is an issue here i guess, maybe because i didnot use buttons 


    async function getAllDocuments() {
        const response = await authorizedRequest(
            'get',
            `documents/`
        )
        console.log(response)
        setDocuments(response.data)
    }

    useEffect(() => {
        getAllDocuments()
    }, [])



    function handelCancel() {
        navigate(-1)
    }



    return (
        <div>
            <h3>{props.formTitle}</h3>
            <form onSubmit={props.handleSubmit}>
                {

                    props.fields.map(field => {
                        const type = props.DATE_FIELDS.includes(field) ? 'date' : 'text'
                        if (field === 'priority') {
                            return (
                                <>
                                    <label htmlFor={field}>{field} </label>
                                    <select
                                        id={field}
                                        name={field}

                                        value={props.formFields[field]}
                                        onChange={event =>
                                            props.setFormFields({
                                                ...props.formFields,
                                                [field]: event.target.value
                                            })
                                        }
                                    >
                                        <option value="C">Critical</option>
                                        <option value="H">High</option>
                                        <option value="M">Medium</option>
                                        <option value="L">Low</option>
                                    </select>

                                </>
                            )
                        }
                        if (field === 'documents') {
                        
                            return (
                                <>
                                    <label htmlFor={field}>{field} </label>
                                    <select
                                        multiple // source : w3school
                                        id={field}
                                        name={field}

                                        value={props.formFields[field] || []}
                                        onChange={event =>{
                                            const selectedDocuments = []
                                            for (let i=0; i<event.target.selectedOptions.length; i++){
                                                selectedDocuments.push(event.target.selectedOptions[i].value)
                                            }
                                            props.setFormFields({
                                                ...props.formFields,
                                                [field]: selectedDocuments
                                            })}
                                        }
                                    >
                                        {documents.length ? (
                                            documents.map(document => (
                                                <option key={document.id} value={document.id}>
                                                    {document.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No Documents Found</option>
                                        )}

                                    </select>

                                </>
                            )
                        }
                        return (
                            <>
                                <label htmlFor={field}>{field} </label>
                                <input
                                    id={field}
                                    name={field}// as our django app expects!
                                    type={type}
                                    required
                                    value={props.formFields[field]}
                                    onChange={event =>
                                        props.setFormFields({
                                            ...props.formFields,
                                            [field]: event.target.value
                                        })
                                    }
                                />
                            </>
                        )
                    }
                    )
                }


                <button type='submit'>{props.submitButtonText}</button>
                <button onClick={handelCancel}>Cancel</button>

            </form>
        </div>
    )
}

export default ApplicationForm