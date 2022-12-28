// import UserSidebar from "../../Components/sidebar/UserSidebar/UserSidebar";
import SellerSidebar from "../../../Components/sidebar/SellerSidebar/SellerSidebar";
import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";
// import { uploadprofile } from "../../functions/User";
import { uploadprofile } from "../../../functions/User";
// import { getUserDetails, userUpdateProfile } from "../../functions/users";
import {getUserDetails, userUpdateProfile} from "../../../functions/users"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerProfileUpdate = () => {
  const initialState = {
    profile: [],
  };

  const init = {
    name: "",
    mobile: "",
  };

  const [values, setValues] = useState(initialState);
  const [url, setUrl] = useState("");
  const [public_id, setPublic_id] = useState();
  const [loading, setLoading] = useState(false);
  const [val, setVal] = useState(init);
  const [user1, setUser] = useState();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  const id = window.localStorage.getItem("User Id");

  useEffect(async () => {
    await getUserDetails(id).then((res) => {
      setUser(res.data);
    });
  }, []);

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files; // 3
    let allUploadedFiles = values.profile;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(`${process.env.REACT_APP_API}/uploadprofile`, {
                profile: uri,
              })
              .then((res) => {
                // console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setPublic_id(res.data.public_id);
                console.log("data", res.data.public_id);
                setUrl(res.data.url);
                // setValues({ ...values, profile: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleUpload = async () => {
    console.log("name", val.name);

    var p = {
      public_id,
      url,
      user: localStorage.getItem("User Id"),
    };
    userUpdateProfile(id, val);
    uploadprofile(p);
    navigate("/seller/profile");
  };

  const handlePosterRemove = (public_id) => {
    setLoading(true);
    console.log("remove", public_id);
    axios
      .post(`${process.env.REACT_APP_API}/removeprofile`, { public_id })
      .then((res) => {
        setLoading(false);
        const { profile } = values;
        let filteresPosters = profile.filter((item) => {
          return item.public_id != public_id;
        });
        setValues({ ...values, profile: filteresPosters });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();

    setVal({ ...val, [e.target.name]: e.target.value });
    // console.log((e.target.name,'------',e.target.value))
  };
  return (
    <>
      <div className="category-dashboard-home">
        <SellerSidebar />
        <div className="category-dashboard-homeContainer">
          <div className="category-dashboard-listContainer">
            <h3 style={{ color: "white" }}>Manage your profile</h3>
            <hr />

            <div className="container container-userprofile">
              <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="account-settings">
                        <div className="user-profile">
                          <div className="user-avatar">

                          </div>
                        </div>
                        <div className="about">
                          {values.profile &&
                            values.profile.map((pro) => (
                              <Badge
                                count="X"
                                key={pro.public_id}
                                onClick={() =>
                                  handlePosterRemove(pro.public_id)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <Avatar
                                  src={pro.url}
                                  shape="circle"
                                  className="m-3"
                                  size={200}
                                />
                              </Badge>
                            ))}
                          <input
                            className="form-control"
                            type="file"
                            // multiple
                            // hidden
                            accept="images/*"
                            onChange={fileUploadAndResize}
                          />
                        </div>
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

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="fullName">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              // id="name"
                              name="name"
                              placeholder={
                                user1 && user1.length
                                  ? user1.name
                                  : "Enter Full name"
                              }
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="eMail">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="eMail"
                              value={user.email}
                              placeholder="Enter email ID"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="phone">Phone</label>
                            <input
                              type="number"
                              name="mobile"
                              onChange={handleChange}
                              className="form-control"
                              id="phone"
                              placeholder="Enter phone number"
                            />
                          </div>
                        </div>

   
                      </div>

                      <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="text-right">
                            <button
                              style={{color: "white"}}
                              onClick={handleUpload}
                              type="button"
                              id="submit"
                              name="submit"
                              className="btn btn-dark"
                            >
                              Update
                            </button>
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
    </>
  );
};

export default SellerProfileUpdate;
