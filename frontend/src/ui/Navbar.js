import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../features/user/authSlice";

function Navbar() {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch()

    const logout_user = () => {
        dispatch(logout());
        navigate('/')
    }


    const guestLinks = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            </>
        )
    }

    const authLinks = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to='/' onClick={logout_user}>Logout</Link>
                </li>
            </>
        )
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Auth System</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {isAuthenticated ? authLinks() : guestLinks()}

                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
