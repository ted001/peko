// Zhiyi Jin
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import PropTypes from "prop-types";

export default function Footer(props) {
  let navigate = useNavigate();
  const { checkedDishes, checkedItems, totalPrice } = props;

  let onOrderNowHandler = () => {
    navigate("/orderNow", { state: { checkedDishes } });
  };

  return (
    <div className="order-footer">
      <button
        className={
          checkedDishes.length === 0
            ? "btn btn-primary disabled orderNow"
            : "btn btn-primary orderNow"
        }
        type="button"
        onClick={() => {}}
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
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-1" id="exampleModalLabel">
                Peco
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className="fs-4">Do you decide to order these dishes?</p>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Food Name</th>
                    <th scope="col">QTY</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {checkedDishes.map((checkedDish, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{checkedDish.dish_name}</td>
                        <td>1</td>
                        <td>${checkedDish.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
        <p className="lh-1 fs-6">{checkedItems} items selected</p>
        <p className="lh-1 fs-6">Total Price: ${totalPrice}</p>
      </div>
    </div>
  );
}

Footer.propTypes = {
  checkedDishes: PropTypes.array.isRequired,
  checkedItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};
