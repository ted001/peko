// Complete file by Akhila
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Signout from "../Signout/Signout";
import Currentuser from "../Currentuser/Currentuser";
import { useNavigate, Link } from "react-router-dom";

/**
 * This function is used to build navbar to navigate around the site
 */
export default function Navbar({ render }) {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrentUser() {
      let res = await fetch("/users/fetchUpdatedUser");
      let resuser = await res.json();
      console.log("resuser", resuser);
      let fname = resuser.user?.FirstName;
      console.log(fname);
      setUser(fname);
    }
    getCurrentUser();
  }, [render]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light gradient-custom">
        <div className="leftcontainer">
          <Link className="navbar-brand" to="/meals">
            Peko
          </Link>
        </div>
        <div className="rightContainer">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Currentuser user={user} />
              </li>
              <li className="nav-item">
                <button
                  className="usebutton"
                  onClick={() => {
                    navigate("/userhub");
                  }}
                >
                  Userhub
                </button>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown link
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                > */}
              {/* <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a> */}
              {/* <option>a</option>
                  <option>b</option>
                </div>
              </li> */}

              <div
                style={true ? { display: "block" } : { display: "none" }}
                className={"collapse navbar-collapse"}
              >
                <div className="dropdown-item" href="#">
                  Another action
                </div>
              </div>

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

Navbar.propTypes = {};
