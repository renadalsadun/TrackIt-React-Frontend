import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { authorizedRequest } from '../../lib/api'



function DocumentList() {


    const [documents, setDocuments] = useState([])

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
            console.log(err)
        }
    }

    return (
        <div>
            <h2>Documents</h2>
            <ul>
                {documents.map(document => {
                    return (
                        <li key={document.id}>
                            {/* (noopener,noreferrer) from stack overflow */}
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