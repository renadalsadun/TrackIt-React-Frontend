import { ToastContainer, toast, Bounce } from 'react-toastify';
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
                transition: Bounce,
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
        <div>
            <div className="block">

                <h3 className='title is-3'>{props.formTitle}</h3>

            </div>
            {loading ? (<p> Loading ...</p>) : (
                <form onSubmit={props.handleSubmit}>
                    {

                        props.fields.map(field => {
                            const type = props.DATE_FIELDS.includes(field) ? 'date' : 'text'
                            if (field === 'priority') {
                                return (
                                    <>
                                        <div className='field'>

                                            <label htmlFor={field}>{fieldLabel(field)} </label>
                                            <div className='controls'>
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

                                    </>
                                )
                            }
                            if (field === 'documents') {

                                return (
                                    <>
                                        <div className='field'>

                                            <label htmlFor={field}>{fieldLabel(field)} </label>
                                            <div className='controls'>
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

                                    </>
                                )
                            }
                            return (
                                <>
                                    <div className='field'>

                                        <label htmlFor={field}>{fieldLabel(field)} </label>
                                        <div className='controls'>
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
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        )
                    }


                    <button className="button is-success" type='submit'>
                        <span className="icon is-normal">
                            <i className="fas fa-check"></i>
                        </span>
                        <span>{props.submitButtonText}</span>
                    </button>


                    <button className="button is-warning" onClick={handelCancel}>
                        <span>Cancel</span>
                        <span className="icon is-normal">
                            <i className="fas fa-times"></i>
                        </span>
                    </button>

                </form>
                
            )}
            <ToastContainer />

        </div>
    )
}

export default ApplicationForm