import React from 'react'
import { useNavigate } from 'react-router'

import '@uploadcare/react-uploader/core.css';



function DocumentForm(props) {


    const navigate = useNavigate()

    function handelCancel() {
        navigate(-1)
    }


    return (
        <div>
            <h3 className='title is-2'>{props.formTitle}</h3>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label htmlFor='name' className='title is-4' >Name: </label>
                    <input
                        className='input '
                        id='name'
                        name='name'// as our django app expects!
                        type='text'
                        placeholder='Name'
                        required
                        value={props.name}
                        onChange={event => props.setName(event.target.value)}
                    />
                </div>

                <label htmlFor='document_url' className='title is-4 ' >Document:</label>
                <div className='file is-info is-normal'>
                    <label className='file-label' htmlFor='document_url'>
                        <input
                            id='document_url'
                            className='file-input'
                            type='file'
                            onChange={props.handleFileSelect}
                        />
                        <span className='file-cta'>
                            <span className='file-icon'>
                                <i className='fas fa-upload'></i>
                            </span>
                            <span className='file-label'>Choose a file…</span>
                        </span>
                    </label>
                </div>

                <button className="button is-outlined is-success" type='submit'>
                    <span>{props.submitButtonText}</span>
                </button>
                <button className="button is-outlined is-warning" type='button' onClick={handelCancel}>
                    <span>Cancel</span>
                </button>


            </form>
        </div>
    )
}

export default DocumentForm