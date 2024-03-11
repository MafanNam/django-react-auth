import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./ui/Layout";
import Home from "./pages/Home";
import Activate from "./pages/Activate";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

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
