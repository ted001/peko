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
    <main className="list-group w-auto mt-5">
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

            <div className="dish-item d-flex align-items-center">
              <div>
                <label className="dish-type mb-1 me-2">{dish.type}</label>
                <span className="dish-name mb-1">{dish.dish_name}</span>
                <p className="dish-desc mb-1">{dish.desciption}</p>
              </div>
            </div>
            <div className="dish-price d-flex align-self-center">
              <strong className="text-center">${dish.price}</strong>
            </div>
            <div className="d-flex flex-wrap ms-auto pe-2 align-self-center">
              <input
                checked={dish.checked}
                className="checkbox form-check-input flex-shrink-0"
                onChange={handleChecked(dish)}
                type="checkbox"
                value=""
                style={{ fontSize: " 1.375em" }}
              />
            </div>
          </label>
        );
      })}
    </main>
  );
}

List.propTypes = {
  dishes: PropTypes.array,
  updateCheckedItems: PropTypes.func,
};
