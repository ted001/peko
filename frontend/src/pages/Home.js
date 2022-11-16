import React from "react";
import foodBg from "../images/foodBg.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center ">
      <div>
        <h1>Peco</h1>
        <p>
          Welcome to Peco!! We know you are very busy with your life. So We want
          to provide you with healthy and various food near you in a short time.
        </p>
      </div>

      <div className="col-12">
        <img
          style={{
            width: "100%",
          }}
          src={foodBg}
          alt="food delivery"
        />
        Picture from{" "}
        <a href="https://imageio.forbes.com/specials-images/imageserve/5fe16bf53ba69575bb1cd088/Food-delivery-/0x0.jpg?format=jpg&crop=8995,6000,x0,y0,safe&width=960">
          forbes.com
        </a>
      </div>
      <div className="col-12 mt-5">
        <Link to="/meals">
          <button type="button" className="btn btn-color btn-primary btn-lg">
            Browse All Meals
          </button>
        </Link>
      </div>
      <footer className="align-item-center">
        <p>&copy; 2022 copy right</p>
      </footer>
    </div>
  );
}
