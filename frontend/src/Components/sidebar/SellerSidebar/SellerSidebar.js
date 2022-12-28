import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SellerSidebar.css";

import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineStore } from "react-icons/md";
import { MdCreditCard } from "react-icons/md";

import { MdOutlineSettingsApplications } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BsBoxSeam, BsFillCreditCard2BackFill } from "react-icons/bs"
import { RiMailSendLine } from "react-icons/ri"
import { TiTicket } from "react-icons/ti"
import {MdAssignmentReturn} from "react-icons/md"
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import  { signOut } from 'firebase/auth';

function SellerSidebar() {


  let dispatch = useDispatch();
  const navigate = useNavigate();

  function logOut() {
    return signOut(auth);
  }


  const HandleClick = async () => {
    let answer = window.confirm(' Click OK To Logout');
    if (answer) {

      try {
        await logOut();
        dispatch({
          type: "LOGOUT",
          payload: null,
        })
        window.localStorage.removeItem("User Id")

        navigate('/login');
      } catch (err) {
        console.log(err.message);
      }
    }
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  return (
    <>
      <div className="sidebar-seller">
        <div className="sellersidebar-center">
          <ul>
            <Link to="/seller/dashboard" style={{ textDecoration: "none" }}>
              <li>
                <div className="div-li-main-seller div-li-main-dashboard-seller">
                  <div className="div-li-icon">
                    <MdOutlineDashboard className="icon" />
                  </div>
                  <div className="div-li-span">
                    <span className="span-seller-dashboard">Dashboard</span>
                  </div>
                </div>
              </li>
            </Link>
            <hr />

            <Link to="/seller/product" style={{ textDecoration: "none" }}>
              <li>
                <div className="div-li-main-seller">
                  <div className="div-li-icon">
                    <MdOutlineStore className="icon" />
                  </div>
                  <div className="div-li-span">
                    <span className="span-seller-dashboard">Products</span>
                  </div>
                </div>
              </li>
            </Link>
            <hr />


            <Link to="/seller/orders">
              <li>
                <div className="div-li-main-seller">
                  <div className="div-li-icon">
                    <BsBoxSeam className="icon" />
                  </div>
                  <div className="div-li-span">
                    <span className="span-seller-dashboard">Orders</span>
                  </div>
                </div>
              </li>
            </Link>
            <hr />
            <Link to="/seller/return">
              <li>
                <div className="div-li-main-seller">
                  <div className="div-li-icon">
                    <MdAssignmentReturn className="icon" />
                  </div>
                  <div className="div-li-span">
                    <span className="span-seller-dashboard">Return Orders</span>
                  </div>
                </div>
              </li>
            </Link>
            <hr />

            <Link to="/seller/returnPayment">
              <li>
                <div className="div-li-main-seller">
                  <div className="div-li-icon">
                    <BsFillCreditCard2BackFill className="icon" />
                  </div>
                  <div className="div-li-span">
                    <span className="span-seller-dashboard">Return Payment</span>
                  </div>
                </div>
              </li>
            </Link>
            <hr />

            <Link onClick={scrollToTop} to="/seller/coupon">
              <li>
                <div className='div-li-main'>
                  <div className='div-li-icon'>
                    <TiTicket style={{ color: "white" }} className="icon" />
                  </div>
                  <div className='div-li-span'>
                    <span className='span-admin-dashboard'>Coupon</span>
                  </div>
                </div>
              </li>
            </Link>
            <hr />

            <Link to="/seller/couponsend">
              <li>
                <div className="div-li-main-seller">
                  <div className="div-li-icon">
                    <RiMailSendLine className="icon" />
                  </div>
                  <div className="div-li-span">
                    <span className="span-seller-dashboard">Send Coupon</span>
                  </div>
                </div>
              </li>
            </Link>
            <hr />



            <Link to="/seller/couponhistory">
              <li>
                <div className="div-li-main-seller">
                  <div className="div-li-icon">
                    <MdCreditCard className="icon" />
                  </div>
                  <div className="div-li-span">
                    <span className="span-seller-dashboard">Coupon History</span>
                  </div>
                </div>
              </li>
            </Link>
            <hr />

            <Link to="/seller/password">
              <li>
                <div className="div-li-main-seller">
                  <div className="div-li-icon">
                    <MdOutlineSettingsApplications className="icon" />
                  </div>
                  <div className="div-li-span">
                    <span className="span-seller-dashboard">Password</span>
                  </div>
                </div>
              </li>
            </Link>
            <hr />

            <Link to="/seller/profile">
              <li>
                <div className="div-li-main-seller">
                  <div className="div-li-icon">
                    <MdOutlineAccountCircle className="icon" />
                  </div>
                  <div className="div-li-span">
                    <span className="span-seller-dashboard">Profile</span>
                  </div>
                </div>
              </li>
            </Link>
            <hr />
            <li>
              <div className='div-li-main' >
                <button onClick={HandleClick} className="btn btn-md btn-outline-dark ml-3" variant="light" style={{ width: "88%", color: "#FF5959" }}>
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

export default SellerSidebar;
