import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";
import { signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { getUser } from "../../functions/users";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  let dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");

  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = navigate.location;
    if (intended) {
      return;
    } else {
      if (user && user.token) {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const roleBasedRedirect = (res, email) => {
    //
    window.localStorage.setItem("User Id", res.data._id);
    let intended = navigate.location;

    getUser(email).then(async (s) => {
      if (s.data[0].activated === true) {
        if (intended) {
          navigate(intended.from);
        } else {
          if (res.data.role === "admin") {
            navigate("/admin/dashboard");
          } else if (res.data.role === "subscriber") {
            navigate("/");
          } else if (res.data.role === "seller") {
            navigate("/seller/dashboard");
          } else if(res.data.role === "agency"){
            navigate("/agency/dashboard")
          }
        }
      } else {
        try {
          await signOut(auth);
          dispatch({
            type: "LOGOUT",
            payload: null,
          });
          // alert("Logged Out");

          navigate("/login");
          alert("you are deactivated by admin");
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");

    getUser(email).then(async (res) => {
      if (res.data[0].activated === true) {
        try {
          const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();

          createOrUpdateUser(idTokenResult.token).then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          });
          // navigate("/");
        } catch (err) {
          seterror(err.message);
        }
      } else {
        alert("You are Deactivated by Admin");
      }
    });
  };

  const handleclick = async (e) => {
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
      
    e.preventDefault();
    try {
      await googleSignIn(); 
    } catch (err) {
      seterror(err.message);
    }
  };

  const googleSignIn = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        console.log("email", user.email);
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });

            roleBasedRedirect(res, user.email);
          })
          .catch((err) => console.log(err));
      })

      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };


  return (
    <div className="x">
      <div className="container p-5 mt-0 mb-0">
        <div className="row  re-3">
          <div className="col-md-6 offset-md-3">
            <h2 className="mb-3">Log In</h2>
            {error && <Alert varient="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="Email"
                  placeholder="Email Address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <button type="submit" className="button-31">
                  Log In
                </button>
              </div>
            </Form>
            <hr />

            <div className="div-gsignup">
              <button className="button-31" onClick={handleclick}>
                <FcGoogle className="icons-1" /> &nbsp;
                <span>Sign With Google</span>
              </button>
            </div>
            <div className="p-4 box mt-3 text-center">
              <Link to="/forgot/password" className="float-right login-register">
                Forgot Password?
              </Link>
            </div>
            <div className="p-4 box mt-3 text-center">
              Don't have an account? <Link className="login-register" to="/Register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
