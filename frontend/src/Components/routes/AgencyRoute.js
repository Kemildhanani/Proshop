import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import { Outlet } from "react-router-dom";
import LoadingToRedirect from './LoadingToRedirect';
import { currentAgency } from '../../functions/auth';

const useAuth = () => {
    const {user} = useSelector((state) => ({...state})); 
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if(user && user.token){
            currentAgency(user.token)
            .then(res => {
                // console.log('CURRENT ADMIN RES', res);
                setOk(true)
            })
            .catch(err => {
                console.log('AGENCY ROUTE', err);
            })
        }  else {
            
        }  
    }, [user])
    return ok && user && user.token;
}

const AgencyRoute = () => {
    const isAuth = useAuth();
    return isAuth ? 
    (
    <Outlet/>
    ) : (
    <LoadingToRedirect />
    );
}

export default AgencyRoute
