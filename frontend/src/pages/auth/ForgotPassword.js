import React,{ useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { sendPasswordResetEmail } from "firebase/auth";
import { Alert} from "react-bootstrap";
//Redux
import { useSelector } from "react-redux";
import { auth } from "../../firebase";    




const ForgotPassword=()=>{
    const [email,setEmail]=useState();
    const [loading,setloading]=useState(false)
    const navigate=useNavigate();
    const [error,seterror]= useState("")

    const {user}=useSelector(state=>({...state}));

  useEffect(()=>{
      if(user && user.token){ 
          navigate("/");}
  },[user, navigate]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setloading(true)

        const actionCodeSettings = {
            url: "http://localhost:3000/forgot/password",
             handleCodeInApp: true,
        };

        
            
            try
            {
                await sendPasswordResetEmail(auth,email,actionCodeSettings)
                .then(()=>{
                        setEmail("")
                       
                    })
                setloading(false)
                alert("Check your email for password reset link")
                navigate("/login")
            }
            catch(err)
            {
                seterror(err.message);
                setloading(false);
                console.log(err.message);
            }

        

        
    }

    return(
                <div className="container col-md-6 offset-md- p-5">
                     {loading ? (<h4 className="text-danger">Loading..</h4>
                     ):(<h4>ForgotPassword</h4>)}

                    {error && <Alert varient="danger">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <input type="email" 
                            className="form-control"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            placeholder="Enter Your Email"
                            autoFocus

                        />
                        <br />
                        <button className="btn btn-raised" disabled={!email}>
                            Submit
                        </button>
                        
                        

                    </form>

                 </div>

            );

}
export default ForgotPassword