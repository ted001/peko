import React from "react";
import PropTypes from "prop-types";
import "./Currentuser.css";

export default function Currentuser({ user }) {
  return <button className="userbutton">{user}</button>;
}

Currentuser.propTypes = {
  user: PropTypes.string,
};
