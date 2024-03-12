import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {reset_password_confirm} from "../features/user/authSlice";

function ResetPasswordConfirm() {
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    })

    const {new_password, re_new_password} = formData;

    const { uid, token } = useParams();

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

        dispatch(reset_password_confirm(uid, token, new_password, re_new_password))
        setRequestSent(true);
    };

    return (
        <div className='container mt-5'>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        // minLength='6'
                        required
                    />
                </div>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        // minLength='6'
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

export default ResetPasswordConfirm
