import React from 'react';
import {Link} from "react-router-dom" 
import {useSelector } from 'react-redux';
import { Tooltip } from "@mui/material";
import { RiUser3Fill } from 'react-icons/ri';
import { Image } from 'react-bootstrap';
import ps5 from "../../../images/ps5logo.png"


const SellerNavbar = () => {

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
        <div className="items">
                <div className="item mr-5">
                  <RiUser3Fill style={{ fontSize: "30px" }} />
                  <Tooltip title="Manage Dashoard">
                    <span style={{ fontSize: "15px", cursor: "pointer" }} className="ml-1">
                      <Link to="/seller/dashboard">
                        <span style={{ color: "white" }}>
                          {user && user.name}
                        </span>
                      </Link>
                    </span>
                  </Tooltip>
                </div>
              </div>
      </div>
    </div>
    </>
  )
}

export default SellerNavbar