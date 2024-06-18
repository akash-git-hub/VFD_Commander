import React from 'react'

import { Navigate, Outlet } from 'react-router-dom';
const UseAuth = () =>{
 const id = localStorage.getItem('id');
 const type = parseInt(localStorage.getItem('type'));
 if(id !="" && type ===1){
  return true;
 }else{
  return false;
 }
   
}

const Auth = () => {
    const isAuth= UseAuth();
  return isAuth ? <Outlet />: <Navigate to = "/" />

}
export default Auth;
