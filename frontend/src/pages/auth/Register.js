import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Alert, Form } from "react-bootstrap";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actionCodeSettings = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };
    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForRegistration", email);
        toast.success("Email is sent to Email");
        setEmail("");
      })

      .catch((error) => {
        // const errocode=error.code;
        toast.error(error.message);
        seterror(error.message);
      });
  };

  return (
    <>
      <div className="back" style={{height :"1000px"}}>
        <div className="container p-5 mt-0 pt-0 mb-0">
          <div className="row  re-1">
            <div className="col-md-6 offset-md-3">
              <h2 className="mb-3">Register</h2>
              {error && <Alert varient="danger">{error}</Alert>}
              <ToastContainer />
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="Email"
                    placeholder="Email Address"
                    autoFocus
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <button type="submit" className="button-31">
                    Register
                  </button>
                </div>
              </Form>
              <hr />
              <div className="p-4 box mt-3 text-center">
                already have an account? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
