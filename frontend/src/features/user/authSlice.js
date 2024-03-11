import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    isAuthenticated: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            const {access, refresh} = action.payload;
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);
            state.isAuthenticated = true;
            state.access = access;
            state.refresh = refresh;
        },
        loginFail(state) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            state.isAuthenticated = false;
            state.access = null;
            state.refresh = null;
            state.user = null;
        },
        userLoadedSuccess(state, action) {
            state.user = action.payload;
        },
        userLoadedFail(state) {
            state.user = null;
        },
        authenticatedSuccess(state, action) {
            state.isAuthenticated = true
        },
        authenticatedFail(state, action) {
            state.isAuthenticated = false
        },
        logout(state, action) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            state.isAuthenticated = false;
            state.access = null;
            state.refresh = null;
            state.user = null
        },
    },
});

export const {loginSuccess, loginFail, userLoadedSuccess, userLoadedFail} =
    authSlice.actions;


export function checkAuthenticated() {
    return async function (dispatch, getState) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            };

            const body = JSON.stringify({token: localStorage.getItem('access')})

            try {
                const res = await axios
                    .post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

                if (res.data.code !== 'token_not_valid') {
                    dispatch({
                        type: 'auth/authenticatedSuccess'
                    })
                } else {
                    dispatch({
                        type: 'auth/authenticatedFail'
                    })
                }
            } catch (err) {
                dispatch({
                    type: 'auth/authenticatedFail'
                })
            }

        } else {
            dispatch({
                type: 'auth/authenticatedFail'
            })
        }
    }
}


export function load_user() {
    return async function (dispatch, getState) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json',
                }
            }

            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/auth/users/me/`, config)

                dispatch({
                    type: 'auth/userLoadedSuccess',
                    payload: res.data
                })
            } catch (err) {
                dispatch({
                    type: 'auth/userLoadedFail'
                })
            }
        } else {
            dispatch({
                type: 'auth/userLoadedFail'
            })
        }
    }
}


export function login(email, password) {
    return async function (dispatch, getState) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const body = JSON.stringify({email, password});

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)

            dispatch({
                type: 'auth/loginSuccess',
                payload: res.data
            });

            dispatch(load_user());
        } catch (err) {
            dispatch({
                type: 'auth/loginFail'
            });
        }
    }
}

export function logout() {
    return async function (dispatch, getState) {
        dispatch({
            type: 'auth/logout'
        })
    }
}


export default authSlice.reducer;
