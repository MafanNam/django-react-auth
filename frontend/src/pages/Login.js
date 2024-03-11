import React, {useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";

import LoginForm from "../features/user/LoginForm";
import {useSelector} from "react-redux";

function Login() {
    // Is the user authenticated?
    // Redirect them to the home page
    const navigate = useNavigate()

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/')
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className='container mt-5'>
            <h1>Sign In</h1>
            <p>Sign into your Account</p>

            <LoginForm/>

            <p className='mt-3'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
            <p className='mt-3'>
                Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
            </p>

        </div>
    )
}

export default Login
