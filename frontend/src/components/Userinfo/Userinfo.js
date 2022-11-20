import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Userform from "../Userform/Userform";

import "./Userinfo.css";
export default async function Userinfo() {
  const [user, setUser] = useState({});
  let res = await fetch("/users/getCurrentUser");
  let resuser = await res.json();
  setUser(resuser?.user);
  console.log("users in userinfo", resuser);
  return (
    <div>
      <Navbar />
      <Userform />
    </div>
  );
}
