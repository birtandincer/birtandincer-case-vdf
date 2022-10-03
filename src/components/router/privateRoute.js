import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const PrivateRoute = () => {

    return 1===1 ? <Outlet /> : <Navigate to="Login" />;
}

export default PrivateRoute
