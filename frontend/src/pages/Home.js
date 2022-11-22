//Akhila
import React from "react";
import Login from "../components/Login/Login";

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
          </div>
        </div>
      </section>
    </div>
  );
}
