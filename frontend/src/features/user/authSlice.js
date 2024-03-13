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
        signupSuccess(state, action) {
            state.isAuthenticated = false;
        },
        signupFail(state, action) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            state.isAuthenticated = false;
            state.access = null;
            state.refresh = null;
            state.user = null
        },
        activationSuccess(state, action) {

        },
        activationFail(state, action) {

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
        passwordResetSuccess(state, action) {

        },
        passwordResetFail(state, action) {

        },
        passwordResetConfirmSuccess(state, action) {

        },
        passwordResetConfirmFail(state, action) {

        },
        googleAuthSuccess(state, action) {
            const {access, refresh} = action.payload;
            localStorage.setItem('access', access)
            localStorage.setItem("refresh", refresh);
            state.isAuthenticated = true;
            state.access = access;
            state.refresh = refresh;
        },
        googleAuthFail(state, action) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            state.isAuthenticated = false;
            state.access = null;
            state.refresh = null;
            state.user = null
        },
        facebookAuthSuccess(state, action) {
            const {access, refresh} = action.payload;
            localStorage.setItem('access', access);
            localStorage.setItem("refresh", refresh);
            state.isAuthenticated = true;
            state.access = access;
            state.refresh = refresh;
        },
        facebookAuthFail(state, action) {
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

export function googleAuthenticate(state, code) {
    return async function (dispatch, getState) {
        if (state && code && !localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }

            const details = {
                'state': state,
                'code': code,
            };

            const formBody = Object.keys(details)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

            try {
                const res = await axios
                    .post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config)

                dispatch({
                    type: 'auth/googleAuthSuccess',
                    payload: res.data,
                });
                dispatch(load_user())
            } catch (err) {
                dispatch({
                    type: 'auth/googleAuthFail',
                });
            }

        }
    }
}

export function facebookAuthenticate(state, code) {
    return async function (dispatch, getState) {
        if (state && code && !localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }

            const details = {
                'state': state,
                'code': code,
            };

            const formBody = Object.keys(details)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

            try {
                const res = await axios
                    .post(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?${formBody}`, config)

                dispatch({
                    type: 'auth/facebookAuthSuccess',
                    payload: res.data,
                });
                dispatch(load_user())
            } catch (err) {
                dispatch({
                    type: 'auth/facebookAuthFail',
                });
            }

        }
    }
}

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


export function signup(first_name, last_name, email, password, re_password) {
    return async function (dispatch, getState) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const body = JSON.stringify({first_name, last_name, email, password, re_password});
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/users/`, body, config)

            dispatch({
                type: 'auth/signupSuccess',
                payload: res.data
            });
        } catch (err) {
            console.error(err)
            dispatch({
                type: 'auth/signupFail'
            });
        }
    }
}

export function verify(uid, token) {
    return async function (dispatch, getState) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const body = JSON.stringify({uid, token});

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)

            dispatch({
                type: 'auth/activationSuccess',
            });
        } catch (err) {
            dispatch({
                type: 'auth/activationFail'
            });
        }
    }
}


export function reset_password(email) {
    return async function (dispatch, getState) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const body = JSON.stringify({email});

        try {
            await axios
                .post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config)

            dispatch({
                type: 'auth/passwordResetSuccess'
            })
        } catch (err) {
            dispatch({
                type: 'auth/passwordResetFail'
            })
        }
    }
}

export function reset_password_confirm(uid, token, new_password, re_new_password) {
    return async function (dispatch, getState) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const body = JSON.stringify({uid, token, new_password, re_new_password});

        try {
            await axios
                .post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config)

            dispatch({
                type: 'auth/passwordResetConfirmSuccess'
            })
        } catch (err) {
            dispatch({
                type: 'auth/passwordResetConfirmFail'
            })
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
