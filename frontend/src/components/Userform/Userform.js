import React from "react";
import { useNavigate } from "react-router-dom";
export default function Userform() {
  const navigate = useNavigate();
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
      <div>
        <section className="container">
          <h3>Please update your information</h3>
          <form>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="form-outline">
                  <input
                    type="text"
                    id="form3Example1"
                    className="form-control"
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
                required
              />
              <label className="form-label" htmlFor="form3Example4">
                Password
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
