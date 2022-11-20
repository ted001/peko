import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Userform from "../Userform/Userform";
import { useNavigate } from "react-router-dom";
import "./Userinfo.css";
export default function Userinfo() {
  const [user, setUser] = useState({});

  return (
    <div>
      <Navbar />
      <Userform />
    </div>
  );
}
