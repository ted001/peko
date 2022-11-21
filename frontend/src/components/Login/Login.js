import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import url from "../../images/logincss-bg.png";
import "./Login.css";
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

    // console.log("in handlelogin", data);
    const res = await fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    console.log(response);
    if (response.userexists && response.success) {
      console.log("success and user exists");
      navigate("/meals");
    } else if (!response.success && !response.userexists) {
      alert("username or password do not match");
    } else {
      alert("You seem new, please register");
      navigate("/register");
    }
  };
  return (
    <div>
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
          <a href="/register" className="link-info">
            Register here
          </a>
        </p>
      </form>
      <img src={url} alt="animation image" id="bike" />
    </div>
  );
}

// Login.prototypes = {};
