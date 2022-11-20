import React from "react";
import "./Currentuser.css";
export default function Currentuser({ user }) {
  return <button className="userbutton">{user}</button>;
}
