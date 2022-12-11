//Akhila
import React from "react";
import SignUp from "../components/SignUp/SignUp";
import url from "../images/backdrop.jpg";
import Mainfooter from "../components/foot/Mainfooter";
export default function Register() {
  return (
    <div
      style={{
        position: "relative",
        paddingTop: "100px",
        backgroundImage: `url(${url})`,
        backgroundSize: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          paddingLeft: "300px",
        }}
      >
        <div>
          <section className="text-center">
            <div
              className="card shadow-5-strong"
              style={{
                margintop: "-100px",
                backdropfilter: "blur(30px)",
                maxWidth: "700px",
              }}
            >
              <div className="card-body py-0 px-md-0">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-6">
                    <h1 className="fw-bold mb-5">Sign up</h1>
                    <SignUp />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* </div> */}
      <Mainfooter />
    </div>
  );
}

Register.propTypes = {};
