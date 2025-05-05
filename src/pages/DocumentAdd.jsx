import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import DocumentForm from '../components/DocumentForm/DocumentForm'
import { authorizedRequest } from '../lib/api'



function DocumentAdd() {

    const [name, setName] = useState('')
    const [documentURL, setDocumentURL] = useState(null)

    async function handleSubmit(event){
        event.preventDefault()


        let cloudinaryFileUrl = ''
        const formData = new FormData()
        formData.append('file', documentURL)
        formData.append('upload_preset', 'track_it_app')

        try{
            const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/raw/upload`,
            formData
            )
            console.log(cloudinaryResponse.data)


            cloudinaryFileUrl = cloudinaryResponse.data.secure_url
        }
        catch (error){
            console.log(error)

        }
        


        const payload = {name, document_url:cloudinaryFileUrl} 
        const response = await authorizedRequest(
            'post',
            `documents/new/`,
            payload
        )
        
        console.log(response)
        // setName('')
        // setCheckedFields('')
    }




    return (
    <div>
        <h2> DocumentAdd </h2>
        <DocumentForm 
            name = {name}
            setName = {setName}
            setDocumentURL = {setDocumentURL}
            formTitle='Add New Document'
            submitButtonText = 'Add'
            handleSubmit = {handleSubmit}
        />
    </div>
    )
}



export default DocumentAdd



