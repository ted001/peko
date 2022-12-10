// Zhiyi Jin
import React from "react";
import PropTypes from "prop-types";
import "./List.css";

export default function List(props) {
  const { dishes } = props;

  let handleChecked = (dish) => {
    console.log("handleChecked");
    return (event) => {
      dish.checked = event.target.checked;
      props.updateCheckedItems(dish, event.target.checked);
    };
  };

  console.log("list render", dishes.length);
  return (
    <div className="list-group w-auto">
      {dishes.map((dish) => {
        return (
          <label key={dish.key} className="list-group-item d-flex gap-3">
            <div d-flex align-items-center>
              <img
                src={dish.image}
                alt="twbs"
                width="100"
                height="100"
                className="float-start rounded-circle "
              />
            </div>

            <div className="dish-item d-flex w-100 align-items-center">
              <div>
                <label className="dish-type mb-1 me-2">{dish.type}</label>
                <span className="dish-name mb-1">{dish.dish_name}</span>
                <p className="dish-desc mb-1">{dish.desciption}</p>
              </div>
            </div>
            <div className="dish-item d-flex flex-wrap align-self-center">
              <strong className="dish-price mb-1">${dish.price}</strong>
            </div>
            <div className="d-flex ms-auto p-2 align-self-center">
              <input
                checked={dish.checked}
                className="form-check-input flex-shrink-0"
                onChange={handleChecked(dish)}
                type="checkbox"
                value=""
                style={{ fontSize: " 1.375em" }}
              />
            </div>
          </label>
        );
      })}
    </div>
  );
}

List.propTypes = {
  dishes: PropTypes.array,
  updateCheckedItems: PropTypes.func,
};
