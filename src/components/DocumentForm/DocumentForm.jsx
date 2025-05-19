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
            <div className=' container is-widescreen'>
                <section className="hero is-large " style={{ backgroundColor: '#FAF2F2' }}>
                    <div className="hero-body">

                        <h3 className='title is-2 has-text-black'>{props.formTitle}</h3>
                        <form onSubmit={props.handleSubmit}>
                            <div>
                                <label htmlFor='name' className='title is-4 has-text-black' >Name: </label>
                                <input
                                    className='input is-normal has-text-black'
                                    id='name'
                                    name='name'// as our django app expects!
                                    type='text'
                                    placeholder='Name'
                                    required
                                    value={props.name}
                                    onChange={event => props.setName(event.target.value)}
                                />
                            </div>

                            <label htmlFor='document_url' className='title is-4 mt-5 has-text-black' >Document:</label>
                            <div className='file  is-normal'>
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

                            <button className="button  is-success" type='submit' style={{ marginRight: '0.5vw' }}>
                                <span>{props.submitButtonText}</span>
                            </button>
                            <button className="button is-warning" type='button' onClick={handelCancel}>
                                <span>Cancel</span>
                            </button>

                        </form>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default DocumentForm