import React from "react";
import "./Signout.css";
import { useNavigate } from "react-router-dom";
export default function Signout() {
  const navigate = useNavigate();
  const handleSignout = async (e) => {
    e.preventDefault();

    let resopnse = await fetch("/users/getCurrentUser");
    console.log("Before signout", await resopnse.json());
    let res = await fetch("/users/logout", { method: "POST" });
    console.log(await res.json());
    // if (res.logoutsuccess) {
    navigate("/");
    // }
  };

  return (
    <div>
      <button className="signoutbutton" type="submit" onClick={handleSignout}>
        Sign out
      </button>
    </div>
  );
}
