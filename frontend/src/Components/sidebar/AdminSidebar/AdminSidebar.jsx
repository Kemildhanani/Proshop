// import React from 'react'
// import {Link, useNavigate} from 'react-router-dom'
// import { signOut} from "firebase/auth";
// import { auth } from '../../../firebase';
// import { useDispatch,useSelector } from "react-redux";

// import "./AdminSidebar.css"

// import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md"
// import {MdOutlinePersonOutline } from "react-icons/md"
// import { MdOutlineStore  } from "react-icons/md"
// import { MdCreditCard } from "react-icons/md"
// import { MdOutlineSettingsSystemDaydream } from "react-icons/md"
// import { MdOutlinePsychology } from "react-icons/md"
// import { MdOutlineSettingsApplications } from "react-icons/md"
// import { MdOutlineAccountCircle } from "react-icons/md"
// import { MdExitToApp } from "react-icons/md"
// import {MdOutlineViewCompact} from "react-icons/md"
// import {BiCategory} from "react-icons/bi"
// import {TiTicket} from "react-icons/ti"

// function AdminSidebar() {
//   const {user}=useSelector((state)=>({...state}));
//  const  dispatch=useDispatch();
//   const  navigate  =useNavigate();

//   function logOut() {
//     return signOut(auth);
// }
//   const HandleClick=async()=>{
//     window.scrollTo({top: 1,behavior: "smooth"})
//     let answer = window.confirm(' Click OK To Logout');
//     if(answer) {
//       // console.log("Send Delete request", slug);
    
//       try{
//         await logOut();
//         dispatch({
//             type:"LOGOUT",
//             payload:null,
//         })
//         window.localStorage.removeItem("User Id")
//         // alert("Logged Out");
        
//         navigate('/login');   
//     }catch(err){
//         console.log(err.message);
//     }
//     }
//   };

//   const scrollToTop = () =>{
//     window.scrollTo({
//       top: 0, 
//       behavior: 'smooth'
//       /* you can also use 'auto' behaviour
//          in place of 'smooth' */
//     });
//   };

//     return (
//         <>
//     <div className="sidebar">
//       <div className="adminsidebar-center">
//         <ul>
//           <Link onClick={scrollToTop}  to="/admin/dashboard" style={{textDecoration:"none"}}>
//             <li>
//             <div className='div-li-main div-li-main-dashboard'>
//               <div className='div-li-icon'>
//                 <MdOutlineDashboard className="icon" />
//               </div>
//               <div className='div-li-span'>
//                 <span className='span-admin-dashboard'>Dashboard</span>
//               </div>
//             </div>
//           </li>
//           </Link><hr />


//           <Link onClick={scrollToTop} to="/admin/users" style={{ textDecoration: "none" }}>
//             <li>
//               <div className='div-li-main'>
//                 <div className='div-li-icon'>
//                   <MdOutlinePersonOutline className="icon" />
//                 </div>
//                 <div className='div-li-span'>
//                   <span className='span-admin-dashboard'>Users</span>
//                 </div>
//               </div>
//             </li>
//           </Link><hr />

//           <Link onClick={scrollToTop} to="/admin/sellers" style={{ textDecoration: "none" }}>
//             <li>
//               <div className='div-li-main'>
//                 <div className='div-li-icon'>
//                   <MdOutlinePersonOutline className="icon" />
//                 </div>
//                 <div className='div-li-span'>
//                   <span className='span-admin-dashboard'>Sellers</span>
//                 </div>
//               </div>
//             </li>
//           </Link><hr />


//           <Link onClick={scrollToTop} to="/admin/products" style={{ textDecoration: "none" }}>
//             <li>
//                 <div className='div-li-main'>
//                   <div className='div-li-icon'>
//                     <MdOutlineStore className="icon" />
//                   </div>
//                   <div className='div-li-span'>
//                     <span className='span-admin-dashboard'>Products</span>
//                   </div>
//                 </div>
//             </li>
//           </Link><hr />

//         <Link onClick={scrollToTop} to="/admin/allOrders">
//           <li>
//             <div className='div-li-main'>
//               <div className='div-li-icon'>
//                 <MdCreditCard className="icon" />
//               </div>
//               <div className='div-li-span'>
//                 <span className='span-admin-dashboard'>Orders</span>
//               </div>
//             </div>
//           </li>
//         </Link><hr />

//         <Link onClick={scrollToTop} to="/admin/category">
//           <li>
//             <div className='div-li-main'>
//               <div className='div-li-icon'>
//                 <BiCategory className="icon" />
//               </div>
//               <div className='div-li-span'>
//                 <span className='span-admin-dashboard'>Category</span>
//               </div>
//             </div>
//           </li>
//         </Link><hr />


        
//         <Link onClick={scrollToTop} to="/admin/sub">
//             <li>
//               <div className='div-li-main'>
//                 <div className='div-li-icon'>
//                   <MdOutlineCategory className="icon" />
//                 </div>
//                 <div className='div-li-span'>
//                   <span className='span-admin-dashboard'>Sub category</span>
//                 </div>
//               </div>
//             </li>
//           </Link><hr />

//         <Link onClick={scrollToTop} to="/admin/brand/">
//           <li>
//             <div className='div-li-main'>
//               <div className='div-li-icon'>
//                 <MdOutlineSettingsApplications className="icon" />
//               </div>
//               <div className='div-li-span'>
//                 <span className='span-admin-dashboard'>Brands</span>
//               </div>
//             </div>
//           </li>
//           <hr />
//         </Link>

//           <Link onClick={scrollToTop} to="/admin/posters">
//             <li>
//               <div className='div-li-main'>
//                 <div className='div-li-icon'>
//                     <MdOutlineViewCompact className="icon" />
//                 </div>
//                 <div className='div-li-span'>
//                   <span className='span-admin-dashboard'>Posters</span>
//                 </div>
//               </div>
//             </li>
//           </Link>
//           <hr />
          
//           <Link onClick={scrollToTop} to="/admin/package">
//             <li>
//               <div className='div-li-main'>
//                 <div className='div-li-icon'>
//                   <MdOutlineSettingsSystemDaydream className="icon" />
//                 </div>
//                 <div className='div-li-span'>
//                   <span className='span-admin-dashboard'>Packages</span>
//                 </div>
//               </div>
//             </li>
//           </Link>
//           <hr />

//           <Link onClick={scrollToTop} to="/admin/password">
//           <li>
//             <div className='div-li-main'>
//               <div className='div-li-icon'>
//                 <MdOutlinePsychology className="icon" />
//               </div>
//               <div className='div-li-span'>
//                 <span className='span-admin-dashboard'>Update Password</span>
//               </div>
//             </div>
//           </li>
//           </Link>
//           <hr />

//           <li>
//                 <div className='div-li-main' >
//               <button onClick={HandleClick} className="btn btn-md btn-outline-dark ml-3" variant="light" style={{width: "88%",color: "#FF5959"}}>
//                   <div className='div-li-span'>
//                     <span className='span-admin-dashboard'>Logout</span>
//                   </div>
//               </button>
//                 </div>
//             </li>
//         </ul>
//       </div>
//     </div>
        
//         </>
    
//     )
// }

// export default AdminSidebar
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { signOut} from "firebase/auth";
import { auth } from '../../../firebase';
import { useDispatch,useSelector } from "react-redux";

import "./AdminSidebar.css"

import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md"
import {MdOutlinePersonOutline } from "react-icons/md"
import { MdOutlineStore  } from "react-icons/md"
import { MdCreditCard } from "react-icons/md"
import { MdOutlineSettingsSystemDaydream } from "react-icons/md"
import { MdOutlinePsychology } from "react-icons/md"
import { MdOutlineSettingsApplications } from "react-icons/md"
import { MdOutlineAccountCircle } from "react-icons/md"
import { MdExitToApp } from "react-icons/md"
import {MdOutlineViewCompact} from "react-icons/md"
import {BiCategory} from "react-icons/bi"
import {RiLockPasswordLine} from "react-icons/ri"
import {MdOutlineCardMembership} from "react-icons/md"
import {RiPriceTag2Line} from "react-icons/ri"
import {CgUserList} from "react-icons/cg"
import {TiTicket} from "react-icons/ti"

function AdminSidebar() {
  const {user}=useSelector((state)=>({...state}));
 const  dispatch=useDispatch();
  const  navigate  =useNavigate();

  function logOut() {
    return signOut(auth);
}
  const HandleClick=async()=>{
    window.scrollTo({top: 1,behavior: "smooth"})
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

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

    return (
        <>
    <div className="sidebar">
      <div className="adminsidebar-center">
        <ul>
          <Link onClick={scrollToTop}  to="/admin/dashboard" style={{textDecoration:"none"}}>
            <li>
            <div className='div-li-main div-li-main-dashboard'>
              <div className='div-li-icon'>
                <MdOutlineDashboard className="icon" />
              </div>
              <div className='div-li-span'>
                <span className='span-admin-dashboard'>Dashboard</span>
              </div>
            </div>
          </li>
          </Link><hr />


          <Link onClick={scrollToTop} to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <div className='div-li-main'>
                <div className='div-li-icon'>
                  <MdOutlinePersonOutline className="icon" />
                </div>
                <div className='div-li-span'>
                  <span className='span-admin-dashboard'>Users</span>
                </div>
              </div>
            </li>
          </Link><hr />

          <Link onClick={scrollToTop} to="/admin/sellers" style={{ textDecoration: "none" }}>
            <li>
              <div className='div-li-main'>
                <div className='div-li-icon'>
                  <CgUserList className="icon" />
                </div>
                <div className='div-li-span'>
                  <span className='span-admin-dashboard'>Sellers</span>
                </div>
              </div>
            </li>
          </Link><hr />


          <Link onClick={scrollToTop} to="/admin/products" style={{ textDecoration: "none" }}>
            <li>
                <div className='div-li-main'>
                  <div className='div-li-icon'>
                    <MdOutlineStore className="icon" />
                  </div>
                  <div className='div-li-span'>
                    <span className='span-admin-dashboard'>Products</span>
                  </div>
                </div>
            </li>
          </Link><hr />

        <Link onClick={scrollToTop} to="/admin/allOrders">
          <li>
            <div className='div-li-main'>
              <div className='div-li-icon'>
                <MdCreditCard className="icon" />
              </div>
              <div className='div-li-span'>
                <span className='span-admin-dashboard'>Orders</span>
              </div>
            </div>
          </li>
        </Link><hr />

        <Link onClick={scrollToTop} to="/admin/category">
          <li>
            <div className='div-li-main'>
              <div className='div-li-icon'>
                <BiCategory className="icon" />
              </div>
              <div className='div-li-span'>
                <span className='span-admin-dashboard'>Category</span>
              </div>
            </div>
          </li>
        </Link><hr />


        
        <Link onClick={scrollToTop} to="/admin/sub">
            <li>
              <div className='div-li-main'>
                <div className='div-li-icon'>
                  <MdOutlineCategory className="icon" />
                </div>
                <div className='div-li-span'>
                  <span className='span-admin-dashboard'>Sub category</span>
                </div>
              </div>
            </li>
          </Link><hr />

        <Link onClick={scrollToTop} to="/admin/brand/">
          <li>
            <div className='div-li-main'>
              <div className='div-li-icon'>
                <RiPriceTag2Line className="icon" />
              </div>
              <div className='div-li-span'>
                <span className='span-admin-dashboard'>Brands</span>
              </div>
            </div>
          </li>
          <hr />
        </Link>

          <Link onClick={scrollToTop} to="/admin/posters">
            <li>
              <div className='div-li-main'>
                <div className='div-li-icon'>
                    <MdOutlineViewCompact className="icon" />
                </div>
                <div className='div-li-span'>
                  <span className='span-admin-dashboard'>Posters</span>
                </div>
              </div>
            </li>
          </Link>
          <hr />
          
          <Link onClick={scrollToTop} to="/admin/package">
            <li>
              <div className='div-li-main'>
                <div className='div-li-icon'>
                  <MdOutlineCardMembership className="icon" />
                </div>
                <div className='div-li-span'>
                  <span className='span-admin-dashboard'>Packages</span>
                </div>
              </div>
            </li>
          </Link>
          <hr />

          <Link onClick={scrollToTop} to="/admin/password">
          <li>
            <div className='div-li-main'>
              <div className='div-li-icon'>
                <RiLockPasswordLine className="icon" />
              </div>
              <div className='div-li-span'>
                <span className='span-admin-dashboard'>Update Password</span>
              </div>
            </div>
          </li>
          </Link>
          <hr />

          <li>
                <div className='div-li-main' >
              <button onClick={HandleClick} className="btn btn-md btn-outline-dark ml-3" variant="light" style={{width: "88%",color: "#FF5959"}}>
                  <div className='div-li-span'>
                    <span className='span-admin-dashboard'>Logout</span>
                  </div>
              </button>
                </div>
            </li>
        </ul>
      </div>
    </div>
        
        </>
    
    )
}

export default AdminSidebar