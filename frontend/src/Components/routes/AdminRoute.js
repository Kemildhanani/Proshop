import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import { Outlet } from "react-router-dom";
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';

const useAuth = () => {
    const {user} = useSelector((state) => ({...state})); 
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if(user && user.token){
            currentAdmin(user.token)
            .then(res => {
                // console.log('CURRENT ADMIN RES', res);
                setOk(true)
            })
            .catch(err => {
                console.log('ADMIN ROUTE', err);
            })
        }  else {
            
        }  
    }, [user])
    return ok && user && user.token;
}

const AdminRoute = () => {
    const isAuth = useAuth();
    return isAuth ? 
    (
    <Outlet/>
    ) : (
    <LoadingToRedirect />
    );
}

export default AdminRoute
