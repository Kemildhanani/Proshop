import React,{useEffect, useState} from "react";
import {auth} from "../../firebase";
import { ToastContainer  } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword,signOut} from "firebase/auth";
import { useSelector,useDispatch } from "react-redux";
import { Alert} from "react-bootstrap";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete=()=>{
    const [email,setemail]=useState("");
    const [password,setpassword]=useState(""); 
    const [error,seterror]= useState("")
    const {user}=useSelector(state=>({...state}));
    const navigate=useNavigate();
     
    const roleBasedRedirect = (res) => {
        if(res.data.role === 'admin'){
            navigate("/admin/dashboard");
        }else{
            navigate("/user/history");
        }
    }
  
    let dispatch=useDispatch();
    useEffect(()=>{
        if(user && user.token){  
            navigate("/");}
    },[user, navigate]);

    useEffect(()=>{
        setemail(window.localStorage.getItem('emailForRegistration'))
    },[]);
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        
        //validation
        try{
            const result= 
            await createUserWithEmailAndPassword(auth,email,password);
            const {user}=result
            const idTokenResult=await user.getIdTokenResult();
            
            //remove user email for localstorage
            window.localStorage.removeItem('emailForRegistration'); 
            
            createOrUpdateUser(idTokenResult.token)
            signOut(auth);
            // .then(
            //     (res) => {
            //         dispatch({
            //             type:'LOGGED_IN_USER',
            //             payload:{
            //                 name:res.data.name,
            //                 email:user.email,
            //                 token:idTokenResult.token,
            //                 role:res.data.role,
            //                 _id:res.data._id,
            //             },
            //         });
            //         roleBasedRedirect(res);
            //     }
                
            // )
        navigate("/login");
        }catch(err){
            seterror(err.message);    
        }      
        
        
    };

    const completeRegisterForm=()=>(
       
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                disabled
            />
            <input
                type="password"
                className="form-control"
                onChange={(e)=>setpassword(e.target.value)}
                placeholder="Password"
                autoFocus 
            />
            <br/>
            <button type="submit" className="btn btn-raised">
                COMPLETE REGISTRATION
            </button>

        </form>
    );
    return(
        <div style={{marginBottom:"600px"}} className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Registration</h4>
                    {error && <Alert varient="danger">{error}</Alert>}
                    {completeRegisterForm()}
                </div>
            </div>
    
        </div>
    );
} 


export default RegisterComplete;
