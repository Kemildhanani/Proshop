import React,{useState} from 'react'
import {ToastContainer,toast} from 'react-toastify';
import { updatePassword,getAuth, sendPasswordResetEmail } from 'firebase/auth';
import UserSidebar from '../../Components/sidebar/UserSidebar/UserSidebar';
import { auth } from '../../firebase';

const Password = () => {

    const [email, setemail] = useState();
    const [loading, setLoading] = useState(false);
    const user=getAuth().currentUser

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        // console.log(password);

        const actionCodeSettings = {
            url: "http://localhost:3000/user/password",
             handleCodeInApp: true,
        };

        await sendPasswordResetEmail(auth,email,actionCodeSettings)
        .then(() => {
            setLoading(false)
            setemail("");
            toast.success('Password Updated')
        })
        .catch(err => {
            setLoading(false)
            toast.error(err.message);
        });
    };

    const passwordUpdateForm = () => 
    <form onSubmit={handleSubmit} >
        <div style={{width: "20%"}} className="ml-5 form-group">
            {/* <label> Enter Your Email </label> */}
            <input 
                type="" 
                onChange={(e) => setemail(e.target.value)} 
                className='mt-5 form-control' 
                placeholder='Enter email id'
                disabled={loading}    
                value={email}
            />
            <button className="mt-3 btn btn-dark" >
                <span style={{color:"white"}}>
                    Submit
                </span>
            </button>
        </div>
    </form>; 

    return (

        <div className="category-dashboard-home">
        <UserSidebar />
          <div className="category-dashboard-homeContainer">
            <div className="category-dashboard-listContainer">
             <h3 style={{color: "white"}}>Update Password</h3>
              <hr />
                    {passwordUpdateForm()} 
             </div>
            </div>
          </div>
    //   </div>
        // <div className='container-fluid'>
        //     <div className="row">
        //         <div className="">
        //         {/* <UserNav/> */}
        //         <UserSidebar/>
        //         </div>
        //         <div className="col">
        //             {loading ? (
        //             <h4 className='text-danger'>Loading..</h4>
        //             ) : (
        //                 <h4>Password Update</h4>
        //             )}
        //             {passwordUpdateForm()} 
        //         </div>
        //     </div>
        // </div>
    )
}

export default Password; 
