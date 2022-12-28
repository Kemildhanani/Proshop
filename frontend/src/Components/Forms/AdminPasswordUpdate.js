import React,{useState} from 'react'
import {ToastContainer,toast} from 'react-toastify';
import { updatePassword, getAuth } from 'firebase/auth';
import AdminSidebar from '../sidebar/AdminSidebar/AdminSidebar';

const AdminPasswordUpdate = () => {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const user=getAuth().currentUser;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        // console.log(password);

        await updatePassword(user,password)
        .then(() => {
            setLoading(false)
            setPassword("");
            toast.success('Password Updated')
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
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                className='form-control text-light' 
                placeholder='Enter New Password'
                disabled={loading}    
                value={password}
            />
            <br />
            <button 
            style={{width: "100%",color: "white"}}
            className="btn btn-dark btn-md" 
            disabled={!password || password.length < 6 || loading }
            >
                Submit
            </button>
        </div>
    </form>; 

    return (


<div className="poster-dashboard-home">
      <AdminSidebar />
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

export default AdminPasswordUpdate; 
