import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../../firebase";
import { NavDropdown } from "react-bootstrap";
import profile2 from "../../../images/profile2.jpg";
import { Tooltip } from "@mui/material";

const AgencyNavbar = () => {
  let { user } = useSelector((state) => ({ ...state }));

  return (
    <>
      <div className="navbar">
        <div className="wrapper">
          <div className="search">
            <span>
              <Link style={{ color: "white", textDecoration: "none" }} to="/">
                Proshop
              </Link>
            </span>
          </div>
          <div className="items">
            <div className="item mr-5">
              <Tooltip title="Go to Dashbooard">
                <span style={{ cursor: "pointer" }} className="ml-3">
                  <img src={profile2} alt="" className="avatar mr-3 " />
                  <Link to="/agency/dashboard">
                    <span style={{ color: "white" }}>
                      {`${user && user.name.substring(0, 8)}...`}
                    </span>
                  </Link>
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <Navbar bg="dark">
            <Navbar.Toggle />   
            <Navbar.Collapse className="justify-content-end">
            <Link to="seller/dashboard" key="register" className='link'>Dashboard</Link>
                <div className="dropdown">
                    <NavDropdown title="Settings"  id="collasible-nav-dropdown">
                        <NavDropdown.Item>Action 1</NavDropdown.Item>
                        <NavDropdown.Item>Another 2</NavDropdown.Item>
                        <NavDropdown.Item onClick={HandleClick}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </div>
            </Navbar.Collapse>
        </Navbar>
    </div> */}
    </>
  );
};

export default AgencyNavbar;
