import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {verify} from "../features/user/authSlice";

function Activate() {
    const [verified, setVerified] = useState()

    const navigate = useNavigate()
    const {uid, token} = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        if (verified) {
            return navigate('/')
        }
    }, [verified, navigate]);

    const verify_account = e => {
        dispatch(verify(uid, token));
        setVerified(true);
    }

    return (
        <div className='container mt-5'>
            <div className='d-flex flex-column justify-content-center align-items-center'
                 style={{marginTop: '200px'}}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={verify_account}
                    style={{marginTop: '50px'}}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>

            </div>

        </div>
    )
}

export default Activate
