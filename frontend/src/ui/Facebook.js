import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {facebookAuthenticate} from "../features/user/authSlice";
import {Link, useLocation} from "react-router-dom";
import queryString from 'query-string';

function Facebook() {
    const dispatch = useDispatch()
    let location = useLocation()

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        if (state && code) {
            dispatch(facebookAuthenticate(state, code))
        }
    }, [dispatch, location]);

    return (
        <div className='container'>
            <div className="jumbotron mt-5">
                <h1 className="display-4">Welcome to Auth System!</h1>
                <p className="lead">This is an incredible authentication system with production level features.</p>
                <hr className="my-4"/>
                <p>Click the Log In button</p>
                <Link className="btn btn-primary btn-lg" to="/login" role="button">Login</Link>
            </div>

        </div>
    )
}

export default Facebook
