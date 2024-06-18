import React from 'react'

import { Navigate, Outlet } from 'react-router-dom';
const UseAuth = () => {
    const id = localStorage.getItem('id');
    const type = parseInt(localStorage.getItem('type'));
    if (id != "" && type === 2) {
        return true;
    } else {
        return false;
    }

}

const ClientAuth = () => {
    const isAuth = UseAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />

}
export default ClientAuth;
