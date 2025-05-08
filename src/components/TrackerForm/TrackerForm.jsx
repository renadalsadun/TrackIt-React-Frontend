import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

import React, { use, useState } from 'react'
import { useNavigate } from 'react-router'



function TrackerForm(props) {


    const [error, setError] = useState(false);
    const navigate = useNavigate()

    function handelCancel() {
        navigate(-1)
    }



    function handleFormSubmit(event) {
        event.preventDefault()
        if (props.checkedFields.length < 2) {
            setError(true);
        } else {
            setError(false);
            props.handleSubmit(event)
        }
    }



    function fieldLabel(field) {
        let newField = field.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        return newField.join(' ')
    }

    return ( // challenge 1: fields list
        <div className='container'>

            <div className="block">
                <h1 className='title is-3'>{props.formTitle}</h1>
            </div>
            <div className=' container is-widescreen'>
                <section class="hero is-large " style={{ backgroundColor: '#FAF2F2' }}>
                    <div class="hero-body">

                        <form onSubmit={handleFormSubmit}>
                            <div className='field'>
                                <label htmlFor='name' className='label'>Name: </label>
                                <div className="control">

                                    <input
                                        className="input"
                                        id='name'
                                        name='name'// as our django app expects!
                                        type='text'
                                        required
                                        placeholder='Job Applications'
                                        value={props.name}
                                        onChange={event => props.setName(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='block'>
                                <FormControl
                                    required
                                    error={error}
                                    component="fieldset"
                                    variant="standard"
                                    sx={{ mb: 3 }}
                                >
                                    <label htmlFor='fields' className='label'>Fields:</label>
                                    {error ? (
                                        <FormHelperText> Pick at least 2 fields </FormHelperText>
                                    ) : (<p></p>)}

                                    {/* MUI */}
                                    <FormGroup row sx={{ flexWrap: 'wrap', gap: 2 }}>

                                        {props.FIELDS_LIST.map(field => (
                                            <FormControlLabel
                                                key={field}
                                                control={
                                                    <Checkbox
                                                        value={field}
                                                        checked={props.checkedFields.includes(field)}
                                                        onChange={event => {
                                                            if (event.target.checked) {
                                                                props.setCheckedFields([...props.checkedFields, event.target.value])
                                                            }
                                                            else {
                                                                props.setCheckedFields(props.checkedFields.filter(
                                                                    (field) => field !== event.target.value
                                                                ))
                                                            }
                                                        }}
                                                    />
                                                }
                                                label={fieldLabel(field)}
                                            />
                                        ))}
                                    </FormGroup>
                                </FormControl>

                            </div>


                            <button className="button is-success" style={{ marginRight: '10px' }} type='submit'>
                                <span>{props.submitButtonText}</span>
                                <span className="icon is-normal">
                                    <i className="fas fa-check"></i>
                                </span>

                            </button>
                            <button className="button is-warning" type="button" onClick={handelCancel}>
                                <span>Cancel</span>
                                <span className="icon is-normal">
                                    <i className="fas fa-times"></i>
                                </span>
                            </button>

                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TrackerForm