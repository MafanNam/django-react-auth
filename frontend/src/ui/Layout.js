import React, {useEffect} from "react";
import Navbar from "./Navbar";
import {useDispatch} from "react-redux";
import {checkAuthenticated, load_user} from "../features/user/authSlice";

function Layout({children}) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuthenticated())
        dispatch(load_user())
    }, [dispatch]);

    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}

export default Layout
