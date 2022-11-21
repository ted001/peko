// Zhiyi Jin
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import landbg from "../images/landbg.jpg";

export default function OrderNow() {
  return (
    <div>
      <Navbar />
      <img
        style={{
          width: "100%",
        }}
        src={landbg}
        alt="food delivery"
      />
      <h1>Thank you for your trust.</h1>
      <h2>
        Your oder will be delivered in 15 minutes. Please keep your phone
        connected.
      </h2>
    </div>
  );
}
