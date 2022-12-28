import {useSelector} from 'react-redux'
import { Outlet } from "react-router-dom";
import LoadingToRedirect from './LoadingToRedirect';

const useAuth = () => {
    const {user} = useSelector((state) => ({...state}));
    return user &&  user.token;
}

const UserRoute = () => {
    const isAuth = useAuth();
    return isAuth ? 
    (
    <Outlet/>
    ) : (
    <LoadingToRedirect />
    );
}

export default UserRoute
