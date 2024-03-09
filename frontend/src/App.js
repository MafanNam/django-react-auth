import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./hocs/Layout";
import Home from "./containers/Home";
import Activate from "./containers/Activate";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import ResetPassword from "./containers/ResetPassword";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="signup" element={<Signup/>}/>
                    <Route path="reset-password" element={<ResetPassword/>}/>
                    <Route path="password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>}/>
                    <Route path="activate/:uid/:token" element={<Activate/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
