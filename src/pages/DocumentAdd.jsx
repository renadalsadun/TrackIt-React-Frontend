import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import DocumentForm from '../components/DocumentForm/DocumentForm'
import { authorizedRequest } from '../lib/api'
import { uploadDirect } from '@uploadcare/upload-client';



function DocumentAdd() {

    const [name, setName] = useState('')
    const [documentURL, setDocumentURL] = useState(null)
    
    
    
    
    // From Uploadcare Documentations 
    async function handleFileSelect(event) {
        console.log(event)
        const file = event.target.files[0];
        if (!file) return;
        try {
            const response = await uploadDirect(file, {
                publicKey: import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY,
                store: 'auto',
            });

            setDocumentURL(response.cdnUrl)
        } 
        catch (err) {
            console.error('Upload error:', err);
        }

    }

    async function handleSubmit(event) {
        event.preventDefault()

        const payload = {
            name,
            document_url: documentURL
        }

        try {
            const response = await authorizedRequest('post', `documents/new/`, payload)
            console.log('Saved!', response)
        } catch (error) {
            console.log('Submit error:', error)
        }
    }


    return (
        <div>
            <h2> DocumentAdd </h2>
            <DocumentForm
                name={name}
                setName={setName}
                setDocumentURL={setDocumentURL}
                formTitle='Add New Document'
                submitButtonText='Add'
                handleFileSelect = {handleFileSelect}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}



export default DocumentAdd



