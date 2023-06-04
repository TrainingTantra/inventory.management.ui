import React from 'react';
import { Route, Routes as Router } from 'react-router-dom';
import Home from "./main/Home";
import NotFound from "./NotFound";
import LoginPage from './main/Login';
import SignupPage from './main/Signup';
import Dashboard from './internal/Dashboard'

const Routes = () => {
    return (
        <Router>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignupPage />} />
            <Route path="/admin/" exact element={<Dashboard />} />
            <Route path='/admin/Dashboard' exact element={<Dashboard />} />
            <Route path='*' element={<NotFound />} />
        </Router>);
}

export default Routes
