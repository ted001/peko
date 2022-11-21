import React from "react";
import SignUp from "../components/SignUp/SignUp";
import url from "../images/register.jpg";
export default function Register() {
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundRepeat: "no-repeat",
        width: "1100px",
        height: "900px",
      }}
    >
      <div style={{ paddingLeft: "60px" }}>
        <section className="text-center">
          {/* <div
          className="p-5 bg-image"
          style={{
            backgroundimage: url(
              "https://mdbootstrap.com/img/new/textures/full/171.jpg"
            ),
            height: "300px",
          }}
        ></div> */}

          <div
            className="card mx-4 mx-md-5 shadow-5-strong"
            style={{
              margintop: "-100px",
              backdropfilter: "blur(30px)",
            }}
          >
            <div className="card-body py-5 px-md-5">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold mb-5">Sign up now</h2>
                  <SignUp />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
