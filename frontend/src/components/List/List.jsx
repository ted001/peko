import React from "react";

export default function List(props) {
  let handleChecked = (dish) => {
    return (event) => {
      props.updateCheckedItems(dish, event.target.checked);
    };
  };

  return (
    <div className="list-group w-auto">
      {props.dishes.map((dish) => {
        return (
          <label key={dish.key} className="list-group-item d-flex gap-3">
            <img src={dish.image} alt="twbs" width="100" height="100" className="float-start rounded-circle" />
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <label className="mb-1 me-2">{dish.type}</label>
                <span className="mb-1">{dish.dish_name}</span>
                <h6 className="mb-1">${dish.price}</h6>
                <p className="mb-1">{dish.desciption}</p>
              </div>
            </div>
            <input className="form-check-input flex-shrink-0" onChange={handleChecked(dish)} type="checkbox" value="" style={{ fontSize: " 1.375em" }} />
          </label>
        );
      })}
    </div>
  );
}
