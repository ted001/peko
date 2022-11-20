import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Navbar.css";
import Signout from "../Signout/Signout";
import Currentuser from "../Currentuser/Currentuser";
// import Userhub from "../../pages/Userhub.js";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  //   async function getCurrentUser() {
  //     let res = await fetch("/users/getCurrentUser");
  //     console.log("In getcurrentuser", await res.user?.FirstName);
  //     let fuser = await res.json().user?.FirstName;
  //     return fuser;
  //   }

  //   useEffect(async () => {
  //     setUser(await getCurrentUser());
  //     console.log("user in effect", user);
  //   }, []);

  useEffect(() => {
    async function getCurrentUser() {
      let res = await fetch("/users/getCurrentUser");
      //   console.log("In getcurrentuser", await res.json().user?.FirstName);
      let resuser = await res.json();

      setUser(fname);
    }
    getCurrentUser();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light gradient-custom">
        <div className="leftcontainer">
          <a className="navbar-brand" href="#">
            Peko
          </a>
        </div>
        <div className="rightContainer">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Currentuser user={user} />
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="/userhub"> */}
                <button
                  className="usebutton"
                  onClick={() => {
                    navigate("/userhub");
                  }}
                >
                  Userhub
                </button>
                {/* </a> */}
              </li>
              <li className="nav-item">
                <Signout />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  user: PropTypes.string,
};
