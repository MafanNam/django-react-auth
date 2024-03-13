import React, {useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";

import LoginForm from "../features/user/LoginForm";
import {useSelector} from "react-redux";
import axios from "axios";

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

    async function continueWithGoogle() {
        try {
            const res = await axios
                .get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_BASE_URL}/google`)
            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    }

    async function continueWithFacebook() {
        try {
            const res = await axios
                .get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_BASE_URL}/facebook`)
            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    }

    return (
        <div className='container mt-5'>
            <h1>Sign In</h1>
            <p>Sign into your Account</p>

            <LoginForm/>

            <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
                Continue With Google
            </button>
            <br/>
            <button className='btn btn-primary mt-3' onClick={continueWithFacebook}>
                Continue With Facebook
            </button>

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
