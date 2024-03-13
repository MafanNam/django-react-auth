import React, {useEffect} from "react";
import Navbar from "./Navbar";
import {useDispatch} from "react-redux";
import {checkAuthenticated, googleAuthenticate, load_user} from "../features/user/authSlice";
import {useLocation} from "react-router-dom";
import queryString from 'query-string';

function Layout({children}) {

    const dispatch = useDispatch()
    let location = useLocation()

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        if (state && code) {
            dispatch(googleAuthenticate(state, code))
        } else {
            dispatch(checkAuthenticated())
            dispatch(load_user())
        }
    }, [dispatch, location]);

    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}

export default Layout
