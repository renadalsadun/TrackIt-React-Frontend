import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { authorizedRequest } from '../../lib/api'



function ApplicationForm(props) {


    const [documents, setDocuments] = useState([])
    const navigate = useNavigate()

    // error handling
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    async function getAllDocuments() {
        try {
            const response = await authorizedRequest(
                'get',
                `documents/`
            )
            setLoading(false)
            setDocuments(response.data)
        }
        catch (error) {
            setLoading(false)
            setError('Something went wrong. Please try again later')
            // sourse : React-Toastify Docs

            toast.error('Something went wrong', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }



    function fieldLabel(field) {
        let newField = field.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        return newField.join(' ')
    }



    useEffect(() => {
        getAllDocuments()
    }, [])



    function handelCancel() {
        navigate(-1)
    }


    if (error) {
        return (
            <h2>{error}</h2>
        )
    }

    return (
        <div className='container'>
            <div className="block">

                <h3 className='title is-3'>{props.formTitle}</h3>


                {loading ? (<p> Loading ...</p>) : (
                    <form onSubmit={props.handleSubmit}>
                        <div className=' container is-widescreen'>
                            <section class="hero is-large " style={{ backgroundColor: '#FAF2F2' }}>
                                <div class="hero-body">

                                    {

                                        props.fields.map(field => {
                                            const type = props.DATE_FIELDS.includes(field) ? 'date' : 'text'
                                            if (field === 'priority') {
                                                return (

                                                    <div className='field'>

                                                        <label htmlFor={field} className='label'>{fieldLabel(field)} </label>
                                                        <div className='select is-rounded'>
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
                                                        </div>
                                                    </div>

                                                )
                                            }
                                            if (field === 'documents') {

                                                return (

                                                    <div className='field' key={field}>

                                                        <label htmlFor={field} className='label'>{fieldLabel(field)} </label>
                                                        <div className='select is-multiple'>
                                                            <select
                                                                multiple // source : w3school
                                                                id={field}
                                                                name={field}

                                                                value={props.formFields[field] || []}
                                                                onChange={event => {
                                                                    const selectedDocuments = []
                                                                    for (let i = 0; i < event.target.selectedOptions.length; i++) {
                                                                        selectedDocuments.push(event.target.selectedOptions[i].value)
                                                                    }
                                                                    props.setFormFields({
                                                                        ...props.formFields,
                                                                        [field]: selectedDocuments
                                                                    })
                                                                }
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
                                                        </div>
                                                    </div>


                                                )
                                            }
                                            return (

                                                <div className='field' key={field}>

                                                    <label htmlFor={field} className='label'>{fieldLabel(field)} </label>
                                                    <div className='controls'>
                                                        <input
                                                            className='input is-normal'
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
                                                    </div>
                                                </div>

                                            )
                                        }
                                        )
                                    }

                                    <div className='has-text-right'>
                                        <button className="button is-success" type='submit'>
                                            <span>{props.submitButtonText}</span>

                                            <span className="icon is-normal">
                                                <i className="fas fa-check"></i>
                                            </span>
                                        </button>


                                        <button className="button is-warning" type='button' style={{ marginLeft: '10px' }} onClick={handelCancel}>
                                            <span>Cancel</span>
                                            <span className="icon is-normal">
                                                <i className="fas fa-times"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </form>
                )}
                <ToastContainer />
            </div>

        </div>
    )
}

export default ApplicationForm