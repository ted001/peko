// Zhiyi Jin

import React from "react";
import PropTypes from "prop-types";

import "./Search.css";

export default function Search(props) {
  console.log("search bar render : ", props);
  const foodTypes = [
    "Vegetarian",
    "Pizza",
    "Burgers",
    "Korean",
    "Japanese",
    "Indian",
    "Mexican",
    "Sandwiches",
    "Italian",
    "Chinese",
  ];

  const foodTastes = ["sweet", "sour", "spicy"];
  const priceRange1 = '{"$lt":10,"$gte":1}';
  const priceRange2 = '{"$lt":100,"$gte":10}';
  const priceRange3 = '{"$lt":1000,"$gte":100}';
  let priceRange = [priceRange1, priceRange2, priceRange3];

  let fullCheckedFoodCategories = [];
  let fullCheckedFoodTaste = [];
  let fullCheckedFoodPriceRange = [];

  for (let index = 0; index < foodTypes.length; index++) {
    fullCheckedFoodCategories.push({ type: foodTypes[index] });
  }

  for (let index = 0; index < foodTastes.length; index++) {
    fullCheckedFoodTaste.push({ taste: foodTastes[index] });
  }

  for (let index = 0; index < priceRange.length; index++) {
    fullCheckedFoodPriceRange.push({ price: JSON.parse(priceRange[index]) });
  }

  let checkedFoodCategories =
    props.checkedFoodCategories.length !== 0
      ? props.checkedFoodCategories
      : fullCheckedFoodCategories;
  let checkedFoodTaste =
    props.checkedFoodTaste.length !== 0
      ? props.checkedFoodTaste
      : fullCheckedFoodTaste;
  let checkedFoodPriceRange =
    props.checkedFoodPriceRange.length !== 0
      ? props.checkedFoodPriceRange
      : fullCheckedFoodPriceRange;

  let onSearchHandler = async () => {
    const data = {
      type: checkedFoodCategories,
      taste: checkedFoodTaste,
      price: checkedFoodPriceRange,
    };
    console.log("onSearchHandler: ", data);

    const status = await fetch("/api/filterMeals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let res = await status.json();

    let dishesTemp = [];
    for (const element of res) {
      dishesTemp.push(element);
    }
    props.updateSearchResult(
      dishesTemp,
      checkedFoodCategories,
      checkedFoodTaste,
      checkedFoodPriceRange
    );

    console.log("dishes: ", dishesTemp);
  };

  let updateCheckedFoodCategories = (event) => {
    if (event.target.checked) {
      if (checkedFoodCategories.length === 10) {
        checkedFoodCategories = [];
      }
      checkedFoodCategories.push({ type: event.target.id });
    } else {
      checkedFoodCategories = checkedFoodCategories.filter(
        (element) => element["type"] !== event.target.id
      );
      if (checkedFoodCategories.length === 0) {
        checkedFoodCategories = fullCheckedFoodCategories;
      }
    }
    console.log(checkedFoodCategories);
    onSearchHandler();
  };

  let updateCheckedFoodTaste = (event) => {
    if (event.target.checked) {
      if (checkedFoodTaste.length === 3) {
        checkedFoodTaste = [];
      }
      checkedFoodTaste.push({ taste: event.target.id });
    } else {
      checkedFoodTaste = checkedFoodTaste.filter(
        (element) => element["taste"] !== event.target.id
      );
      if (checkedFoodTaste.length === 0) {
        checkedFoodTaste = fullCheckedFoodTaste;
      }
    }
    console.log(checkedFoodTaste);
    onSearchHandler();
  };

  let updateCheckedFoodPrice = (event) => {
    if (event.target.checked) {
      if (checkedFoodPriceRange.length === 3) {
        checkedFoodPriceRange = [];
      }
      checkedFoodPriceRange.push({ price: JSON.parse(event.target.value) });
    } else {
      checkedFoodPriceRange = checkedFoodPriceRange.filter(
        (element) => JSON.stringify(element["price"]) !== event.target.value
      );
      if (checkedFoodPriceRange.length === 0) {
        checkedFoodPriceRange = fullCheckedFoodPriceRange;
      }
    }
    console.log(checkedFoodPriceRange);
    onSearchHandler();
  };

  return (
    <div>
      <div>
        <div className="filter-option-label">Categories</div>
        {foodTypes.map((type, index) => {
          return (
            <span key={`type_${index}`}>
              <input
                type="checkbox"
                className="btn-check"
                id={type}
                autoComplete="off"
                onChange={(event) => {
                  updateCheckedFoodCategories(event);
                }}
              />
              <label
                className="btn btn-outline-dark filter-option-btn"
                for={type}>
                {type}
              </label>
            </span>
          );
        })}
      </div>

      <div className="filter-option-label">
        <div>Taste</div>
        {foodTastes.map((taste, index) => {
          return (
            <span key={`taste_${index}`}>
              <input
                type="checkbox"
                className="btn-check"
                id={taste}
                autocomplete="off"
                onChange={(event) => {
                  updateCheckedFoodTaste(event);
                }}
              />
              <label
                className="btn btn-outline-dark filter-option-btn"
                htmlFor={taste}>
                {taste}
              </label>
            </span>
          );
        })}
      </div>

      <div className="filter-option-label">
        <div>Price</div>
        <input
          type="checkbox"
          className="btn-check"
          id="price1"
          value={priceRange1}
          autocomplete="off"
          onChange={(event) => {
            updateCheckedFoodPrice(event);
          }}
        />
        <label
          className="btn btn-outline-dark filter-option-btn"
          htmlFor="price1">
          $
        </label>
        <input
          type="checkbox"
          className="btn-check"
          id="price2"
          value={priceRange2}
          autocomplete="off"
          onChange={(event) => {
            updateCheckedFoodPrice(event);
          }}
        />
        <label
          className="btn btn-outline-dark filter-option-btn"
          htmlFor="price2">
          $$
        </label>
        <input
          type="checkbox"
          className="btn-check"
          id="price3"
          value={priceRange3}
          autocomplete="off"
          onChange={(event) => {
            updateCheckedFoodPrice(event);
          }}
        />
        <label
          className="btn btn-outline-dark filter-option-btn"
          htmlFor="price3">
          $$$
        </label>
      </div>
    </div>
  );
}

Search.propTypes = {
  updateSearchResult: PropTypes.func.isRequired,
  checkedFoodCategories: PropTypes.array.isRequired,
  checkedFoodTaste: PropTypes.array.isRequired,
  checkedFoodPriceRange: PropTypes.array.isRequired,
};
