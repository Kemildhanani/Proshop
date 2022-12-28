import React from 'react'
import {useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth,sendSignInLinkToEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { Alert ,Form} from "react-bootstrap";
import "./SellerRegistration.css";

const SellerRegistration = () => {

    const  [email, setEmail] = useState("")
    const navigate = useNavigate();
    const [error,seterror]= useState("")
    const {user}=useSelector(state=>({...state}));

    useEffect(()=>{
        if(user && user.token){ 
            navigate("/seller/registration");
        }
    },[user, navigate]);

    const handleSubmit=async(e)=>{
        e.preventDefault()
         
            const config = {
                url: "http://localhost:3000/seller/registration/complete",
                 handleCodeInApp: true,
            };
        const auth=getAuth();
        // await sendSignInLinkToEmail(auth,email,config);
        await sendSignInLinkToEmail(auth,email,config).then((res)=>{
            window.localStorage.setItem('email',email);
            toast.success("Email is sent to registered mail");  
        })
    
        .catch((error)=>{
            // const errocode=error.code;
            toast.error(error.message  )
            seterror(error.message);
        })  
    };
 
  return (
    <>
             <div className="x-1" style={{height: "1000px"}}>
             <div className='container mt-0 mb-0 p-5'>
           
            <div className='row re-2 '>
                <div className='col-md-6 offset-md-3'>
                <h2 className="mb-3">Seller Register</h2>
                {error && <Alert varient="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="Email" placeholder="Email Address" autoFocus onChange={(e)=>{setEmail(e.target.value)}}/>
                        </Form.Group>

                            <div className="d-grid gap-2">
                                <button type='submit' className='button-31'>
                                        Register
                                </button>
                            </div>
                    </Form>
                    <hr />
                    <div className="p-4 box mt-3 text-center">
                        already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        
        </div>
         </div> 
    </>
  )
}

export default SellerRegistration