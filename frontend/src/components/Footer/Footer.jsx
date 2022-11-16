// Zhiyi Jin
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import PropTypes from "prop-types";

export default function Footer(props) {
  let navigate = useNavigate();

  let onOrderNowHandler = () => {
    navigate("/orderNow");
  };

  return (
    <div className="order-footer">
      <button
        className="btn btn-primary orderNow"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#dialog">
        Order Now
      </button>
      <div
        className="modal fade"
        id="dialog"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Peco
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Do you decide to order these items?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={onOrderNowHandler}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="checkedInfo">
        <h6>{props.checkedItems} items selected</h6>
        <h6>Total Price: ${props.totalPrice}</h6>
      </div>
    </div>
  );
}

Footer.propTypes = {
  checkedItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};
