//Akhila
//Demonstarting proptypes
import React from "react";
import PropTypes from "prop-types";
import "./Currentuser.css";

export default function Currentuser({ user }) {
  return <p className="userbutton">{user}</p>;
}

Currentuser.propTypes = {
  user: PropTypes.string,
};
