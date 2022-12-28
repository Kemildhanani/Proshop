import {useNavigate} from "react-router-dom" 
import { useDispatch,useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import React,{useState} from 'react';
import { auth } from "../../../firebase";  
import "./mainNavbar.css"
import AdminNavbar from "../Admin Navbar/AdminNavbar";
import VisitorNavbar from "../Visitor Navbar/VisitorNavbar";
import SellerNavbar from "../Seller Navbar/SellerNavbar";
import UserNavbar from "../User Navbar/UserNavbar";
import AgencyNavbar from "../Agency Navbar/AgencyNavbar";

const MainNavbar =()=>{
  const [ setCurrent] = useState('home');
  let dispatch = useDispatch();
  let {user}=useSelector((state)=>({...state}));  

  // console.log(user);
  const navigate=useNavigate();
 
  const handleClick =(e)=>{  
    console.log(e.key);
    setCurrent(e.key);
  };
  function logOut() {
    return signOut(auth);
}

  const HandleClick=async()=>{
    let answer = window.confirm(' Click OK To Logout');
    if(answer) {
      // console.log("Send Delete request", slug);
    
      try{
        await logOut();
        dispatch({
            type:"LOGOUT",
            payload:null,
        })
        window.localStorage.removeItem("User Id")
        // alert("Logged Out");
        
        navigate('/login');   
    }catch(err){
        console.log(err.message);
    }
    }
  };

    return(
          <>
              {user && user.role === "admin" && (<AdminNavbar/>)}
              {user && user.role === "subscriber" && (<UserNavbar/>)}
              {user && user.role === "seller" && (<SellerNavbar/>)} 
              {user && user.role === "agency" && (<AgencyNavbar/>)} 
              {!user && <VisitorNavbar/>}
            </>      
    )
}
export default MainNavbar;