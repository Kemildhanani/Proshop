import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useDispatch } from "react-redux";

// import "./AdminSidebar.css";

import {  MdOutlineDashboard, MdOutlinePassword } from "react-icons/md";

function AgencySidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logOut() {
    return signOut(auth);
  }
  const HandleClick = async () => {
    window.scrollTo({ top: 1, behavior: "smooth" });
    let answer = window.confirm(" Click OK To Logout");
    if (answer) {
      // console.log("Send Delete request", slug);

      try {
        await logOut();
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        window.localStorage.removeItem("User Id");
        // alert("Logged Out");

        navigate("/login");
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  return (
    <>
      <div className="sidebar">
        <div className="adminsidebar-center">
          <ul>
          <Link onClick={scrollToTop}  to="/agency/dashboard" style={{textDecoration:"none"}}>
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

          <Link to="/agency/password" style={{ textDecoration: "none" }}>
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
  );
}

export default AgencySidebar;
