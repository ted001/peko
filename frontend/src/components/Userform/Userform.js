import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
export default function Userform({ user }) {
  const [fname, setFname] = useState(user.FirstName);
  const [lname, setLname] = useState(user.LastName);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  // console.log("line 9", dmail, "user email", user.email);
  useEffect(() => {
    function getCurrentUser() {
      // setFname(user.FirstName);
      setLname(user.LastName);
      setMail(user.email);
      setPassword(user.password);
    }
    getCurrentUser();
  }, []);
  // const navigate = useNavigate();
  const handleDelete = async (e) => {
    // e.preventDefault();
    // let res = await fetch("/users/getCurrentUser");
    // let resuser = await res.json();
    // let email = resuser.user?.email;
    // console.log("email in delte", email);
    // const response = await fetch("/users/delete", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });
    // let resdelete = await response.json();
    // if (resdelete.success) {
    //   alert("Sorry to see you go");
    //   navigate("/");
    // } else {
    //   alert("Error in deleting");
    // }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      fname,
      lname,
      mail,
      password,
    };
    const res = await fetch("/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(res);
  };
  // console.log({ user }, "sttate var email", dmail);
  return (
    <div>
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
                    defaultValue={user.FirstName}
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
                    defaultValue={user.LastName}
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
              <label>{mail}</label>

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

Userform.propTypes = {
  user: PropTypes.object,
};
