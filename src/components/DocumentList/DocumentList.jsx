import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router';
import { authorizedRequest } from '../../lib/api'



function DocumentList() {


    const [documents, setDocuments] = useState([])
    const navigate = useNavigate()

    //error handling
    const [error, setError] = useState()

    async function getAllDocuments() {
        try {
            const response = await authorizedRequest(
                'get',
                `documents/`
            )
            setDocuments(response.data)
        }
        catch (error) {
            setError('Something went wrong. Please try again later')
        }
    }



    function navigateToAddDocument() {
        navigate(`/documents/add`)
    }



    useEffect(() => {
        getAllDocuments()
    }, [])


    async function deleteDocument(id) {
        /**
         * A function that handles the delete button, it deletes the Document by calling the API
         */
        try {
            const response = await authorizedRequest(
                'delete',
                `documents/${id}/delete/`
            )
            setError(null)
            toast.success('Document Deleted Successfully', {
                position: 'top-right',
                autoClose: 4000,
                theme: 'colored',
            })
            getAllDocuments()
        }

        catch (err) {
            setError('Something went wrong while deleting the document. Please try again later')
            toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 4000,
                theme: 'colored',
            })

        }
    }

    return (
        <div className='container '>
            <h2 className='title is-2'>Documents</h2>
            {error ? (<p className='title is-3'>{error}</p>) : (<p></p>)}
            <ul>
                {documents.map(document => {
                    return (
                        <li key={document.id} className='box '>
                            <div className='is-flex is-justify-content-space-between is-align-items-center'>

                                {/* (noopener,noreferrer) source : stack overflow */}
                                <a href={document.document_url} target='_blank' rel='noopener,noreferrer' className='title is-4 has-text-danger-light	'>
                                    {document.name}
                                </a>


                                <button className='delete is-large' onClick={() => { deleteDocument(document.id) }}></button>

                            </div>
                        </li>

                    )
                })
                }
                <button className="button is-success" type='button' onClick={navigateToAddDocument}>
                    <span>Add Document</span>
                </button>

            </ul>
            <ToastContainer />
        </div>

    )

}

export default DocumentList