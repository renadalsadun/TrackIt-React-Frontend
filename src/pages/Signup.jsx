import { useState } from 'react'
import axios from 'axios'

import { setTokens } from '../lib/api'

function Signup() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    async function handleSubmit(event){
        event.preventDefault()
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}signup/`,
                {username, email, password}
            )
            console.log(response.data)
            setTokens(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Sign Up To Track It All!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        onChange={event => setUsername(event.target.value)}
                        value={username}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        placeholder='password'
                        name='password'
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='email'
                        name='email'
                        onChange={event => setEmail(event.target.value)}
                        value={email}
                    />
                </div>
                <button type='submit'>Sign Up!</button>
            </form>
        </div>
    )
}

export default Signup