import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import { Outlet } from "react-router-dom";
import LoadingToRedirect from './LoadingToRedirect';
import { currentSeller } from '../../functions/auth';

const useAuth = () => {
    const {user} = useSelector((state) => ({...state})); 
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if(user && user.token){
            currentSeller(user.token)
            .then(res => {
                // console.log('CURRENT ADMIN RES', res);
                setOk(true)
            })
            .catch(err => {
                console.log('SELLER ROUTE', err);
            })
        }  else {
            
        }  
    }, [user])
    return ok && user && user.token;
}

const SellerRoute = () => {
    const isAuth = useAuth();
    return isAuth ? 
    (
    <Outlet/>
    ) : (
    <LoadingToRedirect />
    );
}

export default SellerRoute
