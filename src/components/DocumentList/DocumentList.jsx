import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router"

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
                            <p>{document.name}</p>
                            <embed
                                src={document.document_url}
                            type="application/pdf"
                            // frameBorder="0"
                            // scrolling="auto"
                            // height="100%"
                            // width="100%"
                            ></embed>
                            <button onClick={()=>{deleteDocument(document.id)}}>Delete</button>

                        </li>
                    )
                })
                }
            </ul>

        </div>

    )

}

export default DocumentList