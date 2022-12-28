import React from "react";
import { useSelector } from "react-redux";
import "./adminNavbar.css";
import { Link } from "react-router-dom";
import ps5 from "../../../images/ps5logo.png"
import { Tooltip } from "@mui/material";
import { Image } from "react-bootstrap";
import { RiUser3Fill } from "react-icons/ri";


const AdminNavbar = () => {
  let { user } = useSelector((state) => ({ ...state }));

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
          <div className="items ">
            <div className="item mr-5">
                  <RiUser3Fill style={{fontSize: "30px"}}/>
              <Tooltip title="Manage Dashbooard">
                <span style={{fontSize: "20px", cursor: "pointer" }} className="ml-1">
                  <Link to="/admin/dashboard">
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
    </>
  );
};

export default AdminNavbar;
