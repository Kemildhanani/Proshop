import React,{useState} from 'react'
import {toast} from 'react-toastify';
import { auth } from '../../firebase';
import { updatePassword,getAuth, sendPasswordResetEmail } from 'firebase/auth';
// import { updatePassword, getAuth } from 'firebase/auth';
// import AdminSidebar from '../sidebar/AdminSidebar/AdminSidebar';
import SellerSidebar from '../../Components/sidebar/SellerSidebar/SellerSidebar';
import AgencySidebar from '../../Components/sidebar/AgencySidebar/AgencySidebar';

const AgencyPasswordUpdate = () => {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const user=getAuth().currentUser;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        // console.log(password);

        const actionCodeSettings = {
            url: "http://localhost:3000/seller/password",
             handleCodeInApp: true,
        };

        await sendPasswordResetEmail(auth,user.email,actionCodeSettings)
        .then(() => {
            setLoading(false)
            // setemail("");
            toast.success('Password Update link is Sent To email')
        })
        .catch(err => {
            setLoading(false)
            toast.error(err.message);
        });
    };

    const passwordUpdateForm = () => 
    <form className='ml-3' style={{width: "30%"}} onSubmit={handleSubmit} >
        <div className="form-group">
            <input 
            // style={}
                type="text" 
                // onChange={(e) => setPassword(e.target.value)} 
                className='form-control text-dark' 
                placeholder='Enter New Password'
                disabled  
                value={user.email}
            />
            <br />
            <button 
            style={{width: "100%",color: "white"}}
            className="btn btn-dark btn-md" 
            // disabled={!password || password.length < 6 || loading }
            >
                Submit
            </button>
        </div>
    </form>; 

    return (


<div className="poster-dashboard-home">
      <AgencySidebar />
      <div className="poster-dashboard-homeContainer">
        <div className="poster-dashboard-listContainer">
            <h3 style={{color: "white"}}>Password update </h3>
            <hr style={{border: '1px solid gray'}} />
                {passwordUpdateForm()}
    </div>  
    </div>
</div>
    )
}

export default AgencyPasswordUpdate; 


