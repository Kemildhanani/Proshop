import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {GoPackage} from "react-icons/go"
import {MdOutlinePassword} from "react-icons/md"
import {RiUser3Line} from "react-icons/ri"
import {BsBookmarkHeart} from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";


const UserSidebar = () => {

  let dispatch = useDispatch();

  const navigate = useNavigate();

  const logOut = () => {
    return signOut(auth);
  }

  const HandleClick = async () => {
    let answer = window.confirm(" Click OK To Logout");
    if (answer) {
      try {
        await logOut();
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        window.localStorage.removeItem("User Id");
        navigate("/login");
      } catch (err) {
        console.log(err.message);
      }
    }
  };


  return (

    <div className="sidebar">
      <div className="adminsidebar-center">
        <ul>
          <Link to="/user/history" style={{textDecoration:"none"}}>
            <li>
            <div className='div-li-main div-li-main-dashboard'>
              <div className='div-li-icon'>
                <GoPackage className="icon" />
              </div>
              <div className='div-li-span'>
                <span className='span-admin-dashboard'>Orders</span>
              </div>
            </div>
          </li>
          </Link><hr />


          <Link to="/user/profile" style={{ textDecoration: "none" }}>
            <li>
              <div className='div-li-main'>
                <div className='div-li-icon'>
                  <RiUser3Line className="icon" />
                </div>
                <div className='div-li-span'>
                  <span className='span-admin-dashboard'>Manage Profile</span>
                </div>
              </div>
            </li>
          </Link><hr />


          <Link to="/user/password" style={{ textDecoration: "none" }}>
            <li>
              <div className='div-li-main'>
                <div className='div-li-icon'>
                  <MdOutlinePassword className="icon" />
                </div>
                <div className='div-li-span'>
                  <span className='span-admin-dashboard'>Update Password</span>
                </div>
              </div>
            </li>
          </Link><hr />

          <Link to="/wishlist" style={{ textDecoration: "none" }}>
            <li>
                <div className='div-li-main'>
                  <div className='div-li-icon'>
                    <BsBookmarkHeart className="icon" />
                  </div>
                  <div className='div-li-span'>
                    <span className='span-admin-dashboard'>Wishlist</span>
                  </div>
                </div>
            </li>
          </Link><hr />

          <li>
                <div className='div-li-main' >
              <button onClick={HandleClick} className="btn btn-md btn-outline-dark ml-3" variant="light" style={{width: "88%",color: "#FF5959"}}>
                  <div className='div-li-span'>
                    <span className='span-admin-dashboard'>Logout</span>
                  </div>
              </button>
                </div>
            </li>

        {/* <Link to="/admin/allOrders">
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

        <Link to="/admin/category">
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

          <Link to="/admin/posters">
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

          <Link to="/admin/sub">
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


            <li>
              <div className='div-li-main'>
                <div className='div-li-icon'>
                  <MdOutlineSettingsSystemDaydream className="icon" />
                </div>
                <div className='div-li-span'>
                  <span className='span-admin-dashboard'>System Health</span>
                </div>
              </div>
            </li>
          <hr />

          <li>
            <div className='div-li-main'>
              <div className='div-li-icon'>
                <MdOutlinePsychology className="icon" />
              </div>
              <div className='div-li-span'>
                <span className='span-admin-dashboard'>Logs</span>
              </div>
            </div>
          </li>
          <hr />

          <li>
            <div className='div-li-main'>
              <div className='div-li-icon'>
                <MdOutlineSettingsApplications className="icon" />
              </div>
              <div className='div-li-span'>
                <span className='span-admin-dashboard'>Settings</span>
              </div>
            </div>
          </li>
          <hr />

          <li>
            <div className='div-li-main'>
              <div className='div-li-icon'>
                <MdOutlineAccountCircle className="icon" />
              </div>
              <div className='div-li-span'>
                <span className='span-admin-dashboard'>Profile</span>
              </div>
            </div>
          </li>
          <hr />

          <li style={{cursor: "pointer"}}>
              <div className='div-li-main'>
                <div className='div-li-icon'>
                  <MdExitToApp className="icon" />
                </div>
                <div className='div-li-span'>
                  <span className='span-admin-dashboard' onClick={HandleClick}>Log out</span>
                </div> */}
              {/* </div> */}
          {/* </li> */}
        </ul>
      </div>
    </div>

    // <div>
    //   <ul className="nav flex-column">
    //     <li className="nav-item">
    //       <Link to="/user/history" className="nav-link">
    //         History
    //       </Link>
    //     </li>

    //     <li className="nav-item">
    //       <Link to="/user/password" className="nav-link">
    //         Password
    //       </Link>
    //     </li>

    //     <li className="nav-item">
    //       <Link to="/user/wishlist" className="nav-link">
    //         Wishlist
    //       </Link>
    //     </li>

    //     <li className="nav-item">
    //       <Link to="/user/profile" className="nav-link">
    //         Profile
    //       </Link>
    //     </li>
    //   </ul>
    // </div>
  );
}

export default UserSidebar;
