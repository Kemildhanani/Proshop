import React, { useEffect, useState } from "react";
import SellerSidebar from "../../../Components/sidebar/SellerSidebar/SellerSidebar";
import Avatar from "@mui/material/Avatar";
import { getUserDetails, getProfile } from "../../../functions/users";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SellerProfile = () => {
  var userId = localStorage.getItem("User Id");

  const [userDetails, setUser] = useState([]);

  const [profile, setProfile] = useState([]);
  const [data, setData] = useState({
    user: userId,
  });
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  useEffect(async () => {
    getUserDetails(userId).then((res) => setUser(Object(res.data)));
    getProfile(userId).then((res) => setProfile(Object(res.data)));
  },[]);
  // window.onload()

  //  window.onlo




  return (
    <div className="category-dashboard-home">
      <SellerSidebar />
      <div className="category-dashboard-homeContainer">
        <div className="category-dashboard-listContainer">
          <h3 style={{ color: "white" }}>Manage your profile</h3>

          <hr />
          {/* {JSON.stringify(userDetails)} */}
          <div className="container container-userprofile">
            <div className="row gutters">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="account-settings">
                      <div className="user-profile">
                      <div className="user-avatar">
                          {profile &&
                            profile.map((p) => (
                              <Avatar
                                alt="Remy Sharp"
                                // src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                // src={p.url.length>0 ? p.url :"https://bootdey.com/img/Content/avatar/avatar7.png"}
                                src={
                                  p.url && p.url
                                    ? p.url
                                    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                }
                                sx={{ width: "100%", height: "225px" }}
                              />
                            ))}
                        </div>
                        {/* {userDetails && userDetails.map((u)=>( */}
                        <>
                        <div style={{width: "100%", textAlign: "center"}} >
                          <h5 className="user-name mt-3" >{userDetails.name}</h5>
                        </div>
                        <div style={{width: "100%", textAlign: "center"}} >
                          <h6 className="user-email">{userDetails.email}</h6>
                        </div>
                        </>
                        {/* ))} */}
                      </div>
                      <div className="about"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Personal Details</h6>
                      </div>

                      {/* {userDetails && userDetails.map((u)=>( */}
                      <>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="fullName">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              value={userDetails.name}
                              id="fullName"
                              placeholder="Enter full name"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="eMail">Email</label>
                            <input
                              type="email"
                              disabled
                              value={userDetails.email}
                              className="form-control"
                              id="eMail"
                              placeholder="Enter email ID"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="phone">Phone</label>
                            <input
                              type="text"
                              disabled
                              value={userDetails.mobile}
                              className="form-control"
                              id="phone"
                              placeholder="Update phone number"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            {/* <label for="website">Website URL</label>
                            <input
                              disabled
                              value="www.proshop.com"
                              type="url"
                              className="form-control"
                              id="website"
                              placeholder="Website url"
                            /> */}
                          </div>
                        </div>
                      </>
                      {/* ))} */}
                    </div>
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">
                          <Link to="/seller/profile/update">
                            <button
                              // variant="contained"
                              type="button"
                              id="submit"
                              name="submit"
                              className="btn btn-primary "
                            >
                              Update
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
