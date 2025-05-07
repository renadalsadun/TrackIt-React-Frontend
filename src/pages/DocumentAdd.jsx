import { ToastContainer, toast } from 'react-toastify'
import React from 'react'
import { useState } from 'react'

import DocumentForm from '../components/DocumentForm/DocumentForm'
import { authorizedRequest } from '../lib/api'
import { uploadDirect } from '@uploadcare/upload-client';



function DocumentAdd() {

    const [name, setName] = useState('')
    const [documentURL, setDocumentURL] = useState(null)
    const [error, setError] = useState(null) //error handling



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
            setError('File upload failed. Try again')
            toast.error('File upload failed. Try again', {
                position: 'top-right',
                autoClose: 4000,
                theme: 'colored',
            })



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
            toast.success('Document Added Successfully!', {
                position: 'top-right',
                autoClose: 4000,
                theme: 'colored',
            })

        } catch (error) {
            setError('Something went wrong. Please try again later')
            toast.error('File upload failed. Try again', {
                position: 'top-right',
                autoClose: 4000,
                theme: 'colored',
            })

        }
    }




    return (
        <div>
            {error ? (<p className='title is-3'>{error}</p>) : (<p></p>)}

            <DocumentForm
                name={name}
                setName={setName}
                setDocumentURL={setDocumentURL}
                formTitle='Add New Document'
                submitButtonText='Add'
                handleFileSelect={handleFileSelect}
                handleSubmit={handleSubmit}
            />
        <ToastContainer/>
        </div>
    )
}



export default DocumentAdd



