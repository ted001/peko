import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = {
      fname,
      lname,
      email,
      password,
    };
    console.log("in signup", data);
    const res = await fetch("/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // console.log(await res.json(), res);
    let response = await res.json();
    if (response.userexists) {
      alert("User already exists, please log in to continue");
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <input
                type="text"
                id="form3Example1"
                className="form-control"
                onChange={(e) => {
                  setFname(e.target.value);
                }}
                required
              />
              <label className="form-label" htmlFor="form3Example1">
                First name
              </label>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <input
                type="text"
                id="form3Example2"
                className="form-control"
                onChange={(e) => {
                  setLname(e.target.value);
                }}
                required
              />
              <label className="form-label" htmlFor="form3Example2">
                Last name
              </label>
            </div>
          </div>
        </div>

        <div className="form-outline mb-4">
          <input
            type="email"
            id="form3Example3"
            className="form-control"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label className="form-label" htmlFor="form3Example3">
            Email address
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="form3Example4"
            className="form-control"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <label className="form-label" htmlFor="form3Example4">
            Password
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign up
        </button>
      </form>
    </div>
  );
}
