import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signup} from "../features/user/authSlice";

function Signup() {
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
    })

    const {
        first_name,
        last_name,
        email,
        password,
        re_password
    } = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/')
        }
        if (accountCreated) {
            return navigate('/login')
        }
    }, [accountCreated, isAuthenticated, navigate]);

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()

        if (password === re_password) {
            console.log(first_name, last_name, email, password, re_password)
            dispatch(signup(first_name, last_name, email, password, re_password))
            setAccountCreated(true);
        }
    };

    return (
        <div className='container mt-5'>
            <h1>Sing Up</h1>
            <p>Create your Account</p>

            <form onSubmit={e => onSubmit(e)}>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='First name'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        // minLength='6'
                        required
                    />
                </div>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Last name'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        // minLength='6'
                        required
                    />
                </div>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        // minLength='6'
                        required
                    />
                </div>


                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        // minLength='6'
                        required
                    />
                </div>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        // minLength='6'
                        required
                    />
                </div>

                <button className='btn btn-primary' type='submit'>
                    Register
                </button>
            </form>
            <p className='mt-3'>
                Already have an account? <Link to='/login'>Sing In</Link>
            </p>
        </div>
    )
}

export default Signup
