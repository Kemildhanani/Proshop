import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../../firebase";
import Search from "../../Forms/Search";
import { Image, Nav } from "react-bootstrap";
import { MdShoppingCart } from "react-icons/md";
import { HiOutlineAdjustments } from "react-icons/hi";
import { RiHeartFill, RiUser3Fill } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip";
import ps5 from "../../../images/ps5logo.png";

const UserNavbar = () => {
  let { user } = useSelector((state) => ({ ...state }));

  const scrollTop = (e) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="navbar">
        <div className="wrapper">
          <div className="search pl-0">
            <span>
              <span style={{ width: "10%" }} className="mb-5">
                <Image
                  className="pb-1 pt-0"
                  style={{ width: "70px", height: "50px" }}
                  src={ps5}
                />
              </span>
              <span style={{ fontSize: "27px" }}>
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
                      style={{ transform: "rotate(90deg)", fontSize: "23px" }}
                    />
                  </Link>
                </Tooltip>
                <Tooltip title="Go To Cart" placement="top">
                  <Link to="/cart" className="link">
                    <MdShoppingCart style={{ fontSize: "20px" }} />
                  </Link>
                </Tooltip>
                <Tooltip title="Go To Wihslist" placement="top">
                  <Link to="wishlist" className="link">
                    <RiHeartFill style={{ fontSize: "20px" }} />
                  </Link>
                </Tooltip>
              </Nav>
              <div className="items">
                <div className="item ml-3 mr-0 pr-0">
                  <RiUser3Fill style={{ fontSize: "20px" }} />
                  <Tooltip title="Profile & settings">
                    <span
                      style={{ fontSize: "15px", cursor: "pointer" }}
                      className="ml-1"
                    >
                      <Link to="/user/history">
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
        </div>
      </div>
    </>
  );
};

export default UserNavbar;
