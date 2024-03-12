import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {reset_password} from "../features/user/authSlice";

function ResetPassword() {
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
    })

    const {email} = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (requestSent) {
            return navigate('/')
        }
    }, [requestSent, navigate]);

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()

        dispatch(reset_password(email))
        setRequestSent(true);
    };

    return (
        <div className='container mt-5'>
            <h1>Request Password Reset:</h1>

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

                <button className='btn btn-primary' type='submit'>
                    Reset Password
                </button>
            </form>


        </div>
    )
}

export default ResetPassword
