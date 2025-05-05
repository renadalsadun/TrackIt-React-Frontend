import React, { useState } from 'react'
import { useNavigate } from 'react-router'



function DocumentForm(props) {

// formTitle handleSubmit name setName setDocumentURL submitButtonText

    const navigate = useNavigate()

    function handelCancel(){
        navigate(-1)
    }


    return ( 
        <div>
            <h3>{props.formTitle}</h3>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input
                    id='name'
                    name='name'// as our django app expects!
                    type='text'
                    required
                    value={props.name}
                    onChange={event => props.setName(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='document_url'>Document</label>
                    <input 
                        type='file'
                        onChange={event => props.setDocumentURL(event.target.files[0])}
                    />
                </div>

                <button type='submit'>{props.submitButtonText}</button>
                <button onClick={handelCancel}>Cancel</button>

            </form>
        </div>
    )
}

export default DocumentForm