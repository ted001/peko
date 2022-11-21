import React from "react";
import PropTypes from "prop-types";
import Login from "../components/Login/Login";
import url from "../images/landbg.jpg";
import urlcss from "../images/logincss-bg.png";
export default function Home() {
  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4">
                <span className="h1 fw-bold mb-0">Peko</span>
              </div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <Login />
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src={url}
                alt="Login image"
                className="w-50"
                style={{ objectfit: "cover", objectposition: "left" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Home.PropTypes = {};
