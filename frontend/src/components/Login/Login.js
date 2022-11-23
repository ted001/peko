//Akhila
//Did not use proptypes as it was not required
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import url from "../../images/logincss-bg.png";
import urlhome from "../../images/home.png";
import urlrest from "../../images/rest.png";

import "./Login.css";

/**
 * Login component, checks if the username and password is correct
 */
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };

    const res = await fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    console.log("If user existss", response.userexists);
    if (response.userexists && response.success) {
      console.log("success and user exists");
      navigate("/meals");
    } else if (!response.userexists) {
      alert("You seem new, please register");
      navigate("/register");
    } else {
      alert("username or password do not match");
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <form style={{ width: "23rem" }} onSubmit={handlelogin}>
        <h3 className="fw-normal mb-3 pb-3" style={{ letterspacing: "1px" }}>
          Log in
        </h3>

        <div className="form-outline mb-4">
          <input
            type="email"
            id="form2Example18"
            className="form-control form-control-lg"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label className="form-label" htmlFor="form2Example18">
            Email address
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example28"
            className="form-control form-control-lg"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <label className="form-label" htmlFor="form2Example28">
            Password
          </label>
        </div>

        <div className="pt-1 mb-4">
          <button className="btn btn-info btn-lg btn-block" type="submit">
            Login
          </button>
        </div>

        <p>
          Don't have an account?{" "}
          <Link to="/register" className="link-success">
            Register here
          </Link>
        </p>
      </form>
      <div className="imagesbh">
        <img src={urlrest} alt="animation rest" className="rest" />
        <img src={url} alt="animation bike" id="bike" />
        <img src={urlhome} alt="animation home" className="home" />
      </div>
    </div>
  );
}

Login.propTypes = {};
