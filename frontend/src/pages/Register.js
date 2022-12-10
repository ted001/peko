//Akhila
import React from "react";
import SignUp from "../components/SignUp/SignUp";
// import url from "../images/register.jpg";
import Mainfooter from "../components/foot/Mainfooter";
export default function Register() {
  return (
    <div>
      {/* <div
        style={{
          position: "relative",
          paddingTop: "150px",
          backgroundImage: `url(${url})`,
          backgroundRepeat: "no-repeat",
          // opacity: "0.5",
          backgroundSize: "1400px 1400px",
        }}
      > */}
      <div>
        <section className="text-center">
          <div
            className="card mx-2 mx-md-4 shadow-5-strong"
            style={{
              margintop: "-100px",
              backdropfilter: "blur(30px)",
            }}
          >
            <div className="card-body py-5 px-md-3">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6">
                  <h1 className="fw-bold mb-5">Sign up for tasty food</h1>
                  <SignUp />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* </div> */}
      <Mainfooter />
    </div>
  );
}

Register.propTypes = {};
