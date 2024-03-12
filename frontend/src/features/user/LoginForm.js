import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {login} from "./authSlice";

function LoginForm() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const dispatch = useDispatch();


    const {email, password} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()

        dispatch(login(email, password))

    };

    return (
        <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required
                />
            </div>

            <div className='form-group'>
                <input
                    className='form-control'
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    // minLength='6'
                    required
                />
            </div>

            <button className='btn btn-primary' type='submit'>
                Login
            </button>
        </form>
    )
}

export default LoginForm
