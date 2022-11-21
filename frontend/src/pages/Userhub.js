import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
export default function Userhub() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [render, setRender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    async function getCurrentUser() {
      let res = await fetch("/users/fetchUpdatedUser");

      let resuser = await res.json();
      console.log("resuser", resuser);
      let firname = resuser.user?.FirstName;
      let lasname = resuser.user?.LastName;
      let umail = resuser.user?.email;
      let passwe = resuser.user?.password;
      let addr = resuser.user?.Address;
      let phn = resuser.user?.Phoneno;
      setFname(firname);
      setLname(lasname);
      setEmail(umail);
      setAddress(addr);
      setPhone(phn);
    }
    getCurrentUser();
    console.log("effect called in Userhub");
  }, [render]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      fname,
      lname,
      email,
      password,
      address,
      phone,
    };
    console.log({ password }, password === "");
    if (!password || password === "") {
      delete data[password];
    }
    const res = await fetch("/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // console.log(res);
    setRender(fname + lname);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    let res = await fetch("/users/getCurrentUser");
    let resuser = await res.json();
    let email = resuser.user?.email;
    console.log("email in delte", email);
    const response = await fetch("/users/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    let resdelete = await response.json();
    if (resdelete.success) {
      alert("Sorry to see you go");
      navigate("/");
    } else {
      alert("Error in deleting");
    }
  };

  return (
    <div>
      <Navbar render={render} />
      <div>
        <section className="container">
          <h3>Please update your information</h3>
          <form onSubmit={handleUpdate}>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="form-outline">
                  <input
                    type="text"
                    id="form3Example1"
                    className="form-control"
                    defaultValue={fname}
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
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
                    defaultValue={lname}
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                  />
                  <label className="form-label" htmlFor="form3Example2">
                    Last name
                  </label>
                </div>
              </div>
            </div>

            <div className="form-outline mb-4">
              <label>{email}</label>
              <br></br>
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
              />
              <label className="form-label" htmlFor="form3Example4">
                New password:
              </label>
            </div>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="form3Example4"
                className="form-control"
                defaultValue={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <label className="form-label" htmlFor="form3Example4">
                Address:
              </label>
            </div>
            <div className="form-outline mb-4">
              <input
                type="number"
                id="form3Example4"
                className="form-control"
                defaultValue={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <label className="form-label" htmlFor="form3Example4">
                Phone no:
              </label>
            </div>
            <div className="buttondiv">
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Update info
              </button>
            </div>
          </form>
          <button
            type="submit"
            onClick={handleDelete}
            className="btn btn-primary btn-block mb-4"
          >
            Delete account
          </button>
        </section>
      </div>
    </div>
  );
}
