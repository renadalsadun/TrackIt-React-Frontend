import { useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'

import { setTokens } from '../lib/api'

function Signup() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}signup/`,
                { username, email, password }
            )
            console.log(response.data)
            setTokens(response.data)
            navigate('/home')

        } catch (err) {
            console.log(err)
        }
    }
    return (

        <div className='container'
            style={{
                marginTop: '10vw', maxWidth: '40vw', minHeight: '60vh',
                backgroundColor: '#FAF2F2', padding: '70px'
            }}>
            <h1 className=' title is-1 has-text-black'>Sign Up</h1>
            <form className='box py-6 has-background-white' onSubmit={handleSubmit}>

                <div className='field'>
                    <label htmlFor='username' className='label has-text-black'>Username</label>
                    <div className="control">
                        <input
                            className='input'
                            type="text"
                            name="username"
                            placeholder='Username'
                            onChange={event => setUsername(event.target.value)}
                            value={username}
                        />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='password' className='label has-text-black'>Password</label>
                    <div className="control">
                        <input
                            className='input'
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            onChange={event => setPassword(event.target.value)}
                            value={password}
                        />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='email' className='label has-text-black'>Email</label>
                    <div className="control">
                        <input
                            className='input'
                            type="email"
                            name="email"
                            placeholder='example@email.com'
                            onChange={event => setEmail(event.target.value)}
                            value={email}
                        />
                    </div>
                </div>
                <div className='has-text-centered'>
                    <button class='button is-primary is-large' type="submit">Sign Up!</button>
                </div>
            </form>
        </div>
    )

}

export default Signup