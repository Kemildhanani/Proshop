import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebase";
import Search from "../../Forms/Search";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import { TiUserOutline } from "react-icons/ti";
import ps5 from "../../../images/ps5logo.png";
import light from "../../../images/logowhite.png";

import "./visitorNavbar.css";
import { HiOutlineAdjustments } from "react-icons/hi";
import { MdShoppingCart } from "react-icons/md";
import { RiHeartFill } from "react-icons/ri";
import { FaUser, FaUserAlt, FaUserPlus } from "react-icons/fa";
import SubHeader from "../SubHeader";

const VisitorNavbar = () => {
  const [setCurrent] = useState("home");
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  // console.log(user);
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };
  function logOut() {
    return signOut(auth);
  }

  const HandleClick = async () => {
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

  return (
    <>
      <div className="navbar">
        <div className="wrapper">
          <div className="search pl-2">
            <span>
              <span style={{ width: "10%" }} className="mb-5">
                <Image style={{ width: "70px", height: "45px" }} src={ps5} />
              </span>
              <span>
                <Link style={{ color: "white", textDecoration: "none" }} to="/">
                  Proshop
                </Link>
              </span>
            </span>
          </div>
          <div className="items items-user-header">
            <div className="item mr-5">
              <Search />
              <Nav className="me-aut">
                <Tooltip title="Search By Filter" placement="top">
                  <Link to="/shop" className="link">
                    <HiOutlineAdjustments
                      style={{ transform: "rotate(90deg)", fontSize: "20px" }}
                    />
                  </Link>
                </Tooltip>
                <Tooltip title="Go To Cart" placement="top">
                  <Link to="/cart" className="link">
                    <MdShoppingCart style={{ fontSize: "20px" }} />
                  </Link>
                </Tooltip>

                <Link to="/register" key="register" className="link">
                  Register
                </Link>

                <Link to="/login" key="login" className="link">
                  Log in
                </Link>
              </Nav>
            </div>
          </div>
        </div>
      </div>
      {/* <SubHeader/> */}
    </>
  );
};
export default VisitorNavbar;
