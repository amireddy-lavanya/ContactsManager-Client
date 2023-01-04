import React, { useContext, useEffect, useState } from "react";
import { Context } from "../axios/axioscontext";
import "./signup.css";
import { Link } from "react-router-dom";
import dots from "../../images/Dots-Group.png";
import topCircle from "../../images/Ellipse-31.png";
import bottomCircle from "../../images/Ellipse-32.png";

const Register = () => {
  const { userSignUp } = useContext(Context);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErr, setFormErr] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErr(validate(userData));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErr).length === 0 && isSubmit) {
      userSignUp(userData);
    }
  }, [formErr]);

  const validate = (values) => {
    const err = {};
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;
    if (!values.email) {
      err.email = "*email is required";
    } else if (!emailRegex.test(values.email)) {
      err.email = "*email is invalid";
    }
    if (values.password.length < 6) {
      err.password = "*password must contain atleast 6 characters";
    } else if (values.password.length > 12) {
      err.password = "*password must contain max 12 characters";
    }
    if (values.confirmPassword !== values.password) {
      console.log(values.confirmPassword, values.password);
      err.confirmPassword = "*password does'nt matched!!!";
    }
    return err;
  };

  return (
    <>
      <div className="container-1">
        <img src={topCircle} alt="" className="top-circle" />
        <div className="signUp-container">
          <img src={dots} alt="" className="dots-1" />
          <div className="signUp-header">
            <h4>Logo</h4>
            <p>Create New Account</p>
          </div>
          <form method="POST" className="signUp-form" onSubmit={handleSubmit}>
            <div className="email">
              <input className="email-input" type="text" name="email"
                placeholder="Mail ID"
                onChange={handleChange}
              />
            </div>
            <p className="errors" style={{ color: "red" }}>
              {formErr.email}
            </p>
            <div className="password" style={{ position: "relative" }}>
              <input
                className="password-input"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <p className="errors" style={{ color: "red" }}>
              {formErr.password}
            </p>
            <div className="password" style={{ position: "relative" }}>
              <input
                className="password-input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </div>
            <p className="errors" style={{ color: "red" }}>
              {formErr.confirmPassword}
            </p>
            <button className="button-1">Sign Up</button>
            <p>
              Already have an Account? <Link to="/">SignIn</Link>
            </p>
          </form>
          <img src={dots} alt="" className="dots-2" />
        </div>
        <img src={bottomCircle} alt="" className="bottom-circle" />
      </div>
    </>
  );
};

export default Register;