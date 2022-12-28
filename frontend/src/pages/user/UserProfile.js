import React, { useEffect, useState } from "react";
import UserSidebar from "../../Components/sidebar/UserSidebar/UserSidebar";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { createWallet, getWallet } from "../../functions/Wallet";
import { getUserDetails, getProfile } from "../../functions/users";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {Alert} from "react-bootstrap"

const UserProfile = () => {
  var userId = localStorage.getItem("User Id");
  const [walletAmt, setWalletAmt] = useState();
  const [userDetails, setUser] = useState([]);
  const [status, setStatus] = useState();
  const [profile, setProfile] = useState([]);
  const [comp, setComp] = useState(false);
  const [alert, setAlert] = useState(null);
  // const [pin,setPin]=useState(null)
  const [data, setData] = useState({
    user: userId,
    pin:pin
  });
  var pin=0
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  useEffect(async () => {
    // dataa();
    await getWallet(userId).then((res) => {
      // console.log(res.data.amt)
      const data1 = res.data;
      // console.log("len")
      if (data1 !== null) {
        setWalletAmt(res.data.amt);
        setStatus(res.data.status);
      }
    });
    getUserDetails(userId).then((res) => setUser(Object(res.data)));
    getProfile(userId).then((res) => setProfile(Object(res.data)));
  }, []);


  const handleSubmit = () => {
    navigate("/user/profile/wallet/payment");
  };

  function dataa() { }

  const handleChange = (e) => {
    // alert(e.target.value);
    localStorage.setItem("walletpayment", e.target.value);
    console.log(e.target.value);
  };

  const Activation = () => {
    
    function handleChange(e){
      const re = /^[0-9\b]+$/;
      if (e === '' || re.test(e)) {
        pin = e;
      }else{
        setAlert("Enter only numbers")
        setTimeout(() => {
          setAlert(null)
      }, 3000)
      }
    }
    
    function HandleSubmit() {
      if(pin.length <  4 ){
        setAlert('Enter 4 digit code')
        setTimeout(() => {
          setAlert(null)
      }, 3000)
      }else{

        console.log("pin",pin.length)
        try {
          createWallet(data, pin ,user.token);
        } catch (err) {
          console.log("walletAmt err", err);
        }
        window.location.reload();
        
      }
    }

    return (
      <>
  <div>

      <label>Enter 4 digit Pin For Wallet:</label>
        <input
          type="password"
          // min="4"
          maxLength="4"
          style={{ marginRight: "10", color: "white" }}
          className="form-control"
          onChange={(e)=>{
            handleChange(e.target.value)
          }
        }
        />

        <Button className="mt-3" onClick={HandleSubmit} variant="contained" sx={{marginLeft:"2"}}>Submit </Button>
        {alert !== null ? 
        <Alert className="mt-2" variant="warning">
          {alert}
          </Alert> 
          : ''}
        
        </div>
      </>
    )
  }

  return (
    <div className="category-dashboard-home">
      <UserSidebar />
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
                        <div style={{width: "100%", textAlign: "center"}}>
                          <h5 className="user-name">{userDetails.name}</h5>
                        </div>
                        <div style={{width: "100%", textAlign: "center"}}>
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
                              required
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
                      </>

                    </div>

                    <Card sx={{ bgcolor: "#536162", marginBottom: "20px" }}>
                      <CardContent>
                        <>
                          <h3 style={{ color: "black" }}>
                            Wallet
                          </h3>
                        </>
                      </CardContent>
                      <CardActions className="ml-5">
                        {status == "activated" ? (
                          <strong>Amount : {walletAmt}</strong>
                        ) : (
                          <>

                            {comp === false ? <Button
                              variant="contained"
                              color="success"
                              onClick={() => {
                                setComp(true)
                              }}
                            >
                              Activate Wallet
                            </Button>
                              : <Activation />
                            }
                          </>
                        )}
                      </CardActions>
                      <CardActions className="ml-5">
                        {status == "activated" ? (
                          <strong>Add Amount :</strong>
                        ) : (
                          ""
                        )}
                        {status == "activated" ? (
                          <div className="">
                            <input
                              type="number"
                              min="20"
                              style={{ marginRight: "10", color: "white" }}
                              className="form-control"
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        {status == "activated" ? (
                          <Button
                            variant="contained"
                            color="success"
                            sx={{ marginLeft: 2 }}
                            onClick={handleSubmit}
                          >
                            Procced
                          </Button>
                        ) : (
                          ""
                        )}
                      </CardActions>
                    </Card>
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">
                          <Link to="/user/profile/update">
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

export default UserProfile;
