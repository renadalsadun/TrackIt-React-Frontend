import React, { use, useState } from 'react'
import { useNavigate } from 'react-router'



function TrackerForm(props) {



    const navigate = useNavigate()

    function handelCancel(){
        navigate(-1)
    }


    return ( // challenge 1: fields list
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
                    placeholder='Job Applications'
                    value={props.name}
                    onChange={event => props.setName(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='fields'>Fields: </label>
                    {
                        props.FIELDS_LIST.map(field => (
                            
                            <>
                                <input
                                id={field}
                                name={field}
                                type = 'checkbox'
                                value={field}
                                checked = {props.checkedFields.includes(field)}
                                onChange={event => 
                                    {
                                        if (event.target.checked){
                                            props.setCheckedFields([...props.checkedFields, event.target.value])
                                        }
                                        else{
                                            props.setCheckedFields(props.checkedFields.filter(
                                                (field)=> field !== event.target.value
                                            ))
                                        }
                                        
                                    }}
                                />
                                <label htmlFor={field} > {field}</label>
                            </>
        
                        ))
                    }
                </div>

                <button type='submit'>{props.submitButtonText}</button>
                <button onClick={handelCancel}>Cancel</button>

            </form>
        </div>
    )
}

export default TrackerForm