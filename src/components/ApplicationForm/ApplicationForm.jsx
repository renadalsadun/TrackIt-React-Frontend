import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { useNavigate , useParams } from 'react-router'



function ApplicationForm(props) {

    const DATE_FIELDS = [ 'date_applied' , 'deadline' , 'interview_date' , 'start_date' , 'end_date' ]
    const { trackerId } =  useParams() //trackerid
    const navigate = useNavigate()
    const [formFields, setFormFields] = useState({})
    let fields = []



    function handelCancel(){
        navigate(-1)
    }


    async function getFields(){
        //get the tracker object using id
        //get its fields attr
        const response = await axios.get(`http://127.0.0.1:8000/api/trackers/${trackerId}`)
        fields = response.data.fields
        console.log(fields)
    }


    useEffect( () => 
        { getFields() } ,[] )



    return ( 
        <div>
            <h3>{props.formTitle}</h3>
            <form onSubmit={props.handleSubmit}>
                {
                    
                    fields.map(field =>{
                        const type = DATE_FIELDS.includes(field) ?  'date' : 'text'
                        if (field === 'priority'){
                            return(
                                <>
                                    <label htmlFor={field}>{field} </label>
                                    <select
                                    value = {formFields[field]}
                                    onChange={event =>
                                        setFormFields({
                                            ...formFields,
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
                                value={formFields[field]}
                                onChange={event =>
                                    setFormFields({
                                        ...formFields,
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