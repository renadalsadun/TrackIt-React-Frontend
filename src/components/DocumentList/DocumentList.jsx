import React, { useEffect, useState } from 'react'
import 'reactjs-popup/dist/index.css';

import { authorizedRequest } from '../../lib/api'



function DocumentList() {


    const [documents, setDocuments] = useState([])

    //error handling
    const [error, setError] = useState()

    async function getAllDocuments() {
        try{
        const response = await authorizedRequest(
            'get',
            `documents/`
        )
        setDocuments(response.data)
    }
    catch (error){
        setError('Something went wrong. Please try again later')
    }
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
        }
        catch (err) {
            setError('Something went wrong while deleting the document. Please try again later') 
        }
    }

    return (
        <div>
            <h2>Documents</h2>
            {error? (<p>{error}</p>):{}}
            <ul>
                {documents.map(document => {
                    return (
                        <li key={document.id}>
                            {/* (noopener,noreferrer) source : stack overflow */}
                            <a href={document.document_url} target  = '_blank' rel='noopener,noreferrer'>
                            {document.name}
                            </a>


                            <button onClick={() => { deleteDocument(document.id) }}>Delete</button>

                        </li>
                    )
                })
                }
            </ul>

        </div>

    )

}

export default DocumentList