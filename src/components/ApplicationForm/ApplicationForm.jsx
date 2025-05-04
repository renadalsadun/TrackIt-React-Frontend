import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { useNavigate , useParams } from 'react-router'



function ApplicationForm(props) {



    const navigate = useNavigate() //there is an issue here i guess, maybe because i didnot use buttons 


    function handelCancel(){
        navigate(-1)
    }



    return ( 
        <div>
            <h3>{props.formTitle}</h3>
            <form onSubmit={props.handleSubmit}>
                {
                    
                    props.fields.map(field =>{
                        const type = props.DATE_FIELDS.includes(field) ?  'date' : 'text'
                        if (field === 'priority'){
                            return(
                                <>
                                    <label htmlFor={field}>{field} </label>
                                    <select
                                        id={field}
                                        name={field}
                                    
                                        value = {props.formFields[field]}
                                        onChange={event =>
                                            props.setFormFields({
                                                ...props.formFields,
                                                [field]: event.target.value
                                            })
                                        }
                                    >
                                    <option value="C">Critical</option>
                                    <option value="H">High</option>
                                    <option value="M">Medium</option>
                                    <option value="L">Low</option>
                                    </select>

                                </>
                            )
                        }
                        return(
                            <>
                                <label htmlFor={field}>{field} </label>
                                <input
                                id={field}
                                name={field}// as our django app expects!
                                type = {type}
                                required
                                value={props.formFields[field]}
                                onChange={event =>
                                    props.setFormFields({
                                        ...props.formFields,
                                        [field]: event.target.value
                                    })
                                }
                                />
                            </>
                        )
                    }
                    )
                }


                <button type='submit'>{props.submitButtonText}</button>
                <button onClick={handelCancel}>Cancel</button>

            </form>
        </div>
    )
}

export default ApplicationForm