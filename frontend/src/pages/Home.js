//Akhila
import React from "react";
import Login from "../components/Login/Login";
import Mainfooter from "../components/foot/Mainfooter";
export default function Home() {
  return (
    <div>
      <section className="vh-100">
        <span className="h1 fw-bold mb-0">
          <h1 style={{ paddingTop: "20px", alignSelf: "center " }}>Peko</h1>
        </span>
        <div>A cloud kitchen for all your cravings</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4"></div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <Login />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Mainfooter />
    </div>
  );
}

Home.propTypes = {};
