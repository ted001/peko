// Zhiyi Jin

import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import "./Search.css";

export default function Search(props) {
  let [Food_Type, SetFood_Type] = useState("Select Food Type");
  const foodTypes = [
    "Vegetarian",
    "Pizza",
    "Burgers",
    "Steak",
    "Asian",
    "Korean",
    "Japanese",
    "Indian",
    "Mexican",
    "American",
    "Sandwiches",
    "Italian",
    "Chinese",
  ];

  let [Food_Taste, SetFood_Taste] = useState("Select Food Taste");
  const foodTastes = ["sweet", "sour", "spicy"];

  let budgetInput = useRef(0);

  let onSearchHandler = async () => {
    console.log("food type: ", foodTypes[Food_Type - 1]);
    console.log("food taste: ", foodTastes[Food_Taste - 1]);
    console.log("budget: ", budgetInput.current.value);

    const data = {
      type: foodTypes[Food_Type - 1],
      taste: foodTastes[Food_Taste - 1],
      price: budgetInput.current.value,
    };

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
    props.updateSearchResult(dishesTemp);

    console.log("dishes: ", dishesTemp);
  };

  return (
    <div className="row row-cols-lg-auto g-3 align-items-center mb-4">
      <div className="col-lg-4 col-md-2">
        <label className="form-label" htmlFor="">
          Type
        </label>
        <select
          value={Food_Type}
          onChange={(e) => {
            console.log("SetFood_Type", e.target.value);
            SetFood_Type(e.target.value);
          }}
          className="form-select"
          required
        >
          <option key="all" value="Select Food Type">
            Select Food Type
          </option>
          {foodTypes.map((type, index) => {
            return (
              <option key={index} value={index + 1}>
                {type}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-lg-3 col-md-2">
        <label className="form-label" htmlFor="">
          Taste
        </label>
        <select
          value={Food_Taste}
          onChange={(e) => {
            console.log("SetFood_Taste", e.target.value);
            SetFood_Taste(e.target.value);
          }}
          className="form-select"
          required
        >
          <option key="all" value="Select Food Taste">
            Select Food Taste
          </option>
          {foodTastes.map((taste, index) => {
            return (
              <option key={index} value={index + 1}>
                {taste}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-lg-3 col-md-6">
        <label className="form-label" htmlFor="">
          Budget
        </label>
        <input
          type="text"
          ref={budgetInput}
          className="form-control"
          placeholder="Eg: 10"
        ></input>
        {/* <div className="d-flex ajustify-content-center ">
          <input style={{ width: "60px" }} type="text" className="form-control" placeholder="min"></input>
          <input type="range" id="budgetRange"></input>
          <input style={{ width: "60px" }} type="text" className="form-control" placeholder="max"></input>
        </div> */}
      </div>
      <div className="col-lg-2 col-md-1 ">
        <div className="d-flex justify-content-center ">
          <button
            onClick={onSearchHandler}
            type="button"
            className="btn btn-primary"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

Search.propTypes = {
  updateSearchResult: PropTypes.func,
};
