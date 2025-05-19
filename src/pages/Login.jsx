import { useState } from 'react'
import { useNavigate } from 'react-router'
import { setTokens } from '../lib/api'
import axios from 'axios'

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState('')

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}token/`, formData)
            setTokens({
                access: response.data.access,
                refresh: response.data.refresh
            })
            navigate('/Home')
        } catch (err) {
            console.log(err)
            setError('Invalid username or password')
        }
    }

    return (

        <div className='container' style={{
            marginTop: '10vw', maxWidth: '40vw', minHeight: '60vh',
            backgroundColor: '#FAF2F2', padding: '70px'
        }}>
            <h1 className=' title is-1 has-text-black'>Login</h1>
            <form className='box py-6 has-background-white' onSubmit={handleSubmit}
            >

                <div className='field'>
                    <label htmlFor='username' className='label has-text-black'>Username</label>
                    <div className="control">
                        <input
                            className='input'
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
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
                            placeholder="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button className='button is-primary' type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Login