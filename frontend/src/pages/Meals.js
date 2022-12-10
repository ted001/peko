// Zhiyi Jin
import React, { useState, useEffect } from "react";
import Search from "../components/Search/Search";
import List from "../components/List/List";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";
import Navbar from "../components/Navbar/Navbar";
import Pagination from "../components/Pagination/Pagination";

export default function Meals() {
  console.log("Meals page");

  let [loading, setLoading] = useState(true);
  let [dishes, setDishes] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [checkedItems, setCheckedItems] = useState(0);
  let [page, setPage] = useState(1);
  const PAGE_SIZE = 20;
  let [pageNumbers, setPageNumbers] = useState([]);

  let [checkedFoodCategories, setCheckedFoodCategories] = useState([]);
  let [checkedFoodTaste, setCheckedFoodTaste] = useState([]);
  let [checkedFoodPriceRange, setCheckedFoodPriceRange] = useState([]);

  let updateSearchResult = (
    dishes,
    foodCategories,
    foodTaste,
    foodPriceRange
  ) => {
    setCheckedFoodCategories(foodCategories);
    setCheckedFoodTaste(foodTaste);
    setCheckedFoodPriceRange(foodPriceRange);
    setPageNumbers(updatePageNumbers(dishes.length));
    setDishes(dishes);
    console.log("setPageNumbers: ", pageNumbers);
    setPage(1);
    setTotalPrice(0);
    setCheckedItems(0);
  };

  function updatePageNumbers(totalDishes) {
    let pageNumbers = [];
    for (let i = 0; i < Math.ceil(totalDishes / PAGE_SIZE); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  useEffect(() => {
    async function getAllMeals() {
      console.log("getAllMeals");
      setLoading(true);
      try {
        const status = await fetch("/api/getAllMeals");
        let dishes = await status.json();
        setLoading(false);
        setPageNumbers(updatePageNumbers(dishes.length));
        setDishes(dishes);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getAllMeals();
  }, []);

  // Refined add algorithm for decimal
  // Ref to https://blog.csdn.net/WuLex/article/details/104628132
  function accAdd(arg1, arg2) {
    let r1, r2, m, c;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      let cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", "")) * cm;
      } else {
        arg1 = Number(arg1.toString().replace(".", "")) * cm;
        arg2 = Number(arg2.toString().replace(".", ""));
      }
    } else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
  }

  // Refined sub algorithm for decimal
  // Ref to https://blog.csdn.net/WuLex/article/details/104628132
  function accSub(arg1, arg2) {
    let r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  }

  let updateCheckedItems = (dish, checked) => {
    if (checked) {
      setTotalPrice(Number(accAdd(totalPrice, dish.price)));
      setCheckedItems(Number(accAdd(checkedItems, 1)));
    } else {
      setTotalPrice(Number(accSub(totalPrice, dish.price)));
      setCheckedItems(Number(accSub(checkedItems, 1)));
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col-lg-3 col-md-2">
            <Search
              checkedFoodCategories={checkedFoodCategories}
              checkedFoodTaste={checkedFoodTaste}
              checkedFoodPriceRange={checkedFoodPriceRange}
              updateSearchResult={updateSearchResult}
            />
          </div>
          <div className="col-lg-9 col-md-10">
            <main>
              <Loading />
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="row">
        <div className="col-lg-3 col-md-2">
          <Search
            checkedFoodCategories={checkedFoodCategories}
            checkedFoodTaste={checkedFoodTaste}
            checkedFoodPriceRange={checkedFoodPriceRange}
            updateSearchResult={updateSearchResult}
          />
        </div>
        <div className="col-lg-9 col-md-10">
          {dishes.length !== 0 ? (
            <List
              dishes={dishes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
              updateCheckedItems={updateCheckedItems}
            />
          ) : (
            <div>
              <h2>Sorry! No result found!</h2>
              <h3>
                We're sorry what you were looking for. Please try another way.
              </h3>
            </div>
          )}
          <Pagination
            page={page}
            setPage={setPage}
            totalDishes={dishes.length}
            pageNumbers={pageNumbers}
          />
        </div>
      </div>

      <Footer checkedItems={checkedItems} totalPrice={totalPrice} />
    </div>
  );
}
