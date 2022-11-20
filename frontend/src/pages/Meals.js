// Zhiyi Jin
import React, { useState, useEffect } from "react";
import Search from "../components/Search/Search";
import List from "../components/List/List";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";
import Navbar from "../components/Navbar/Navbar";
export default function Meals() {
  console.log("Meals page");

  let [loading, setLoading] = useState(true);
  let [dishes, setDishes] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [checkedItems, setCheckedItems] = useState(0);

  let updateSearchResult = (dishes) => {
    setDishes(dishes);
    setTotalPrice(0);
    setCheckedItems(0);
  };

  async function getAllMeals() {
    console.log("getAllMeals");
    setLoading(true);
    try {
      const status = await fetch("/api/getAllMeals");
      let dishes = await status.json();
      setLoading(false);
      setDishes(dishes);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
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
      <main>
        <Loading />
      </main>
    );
  }

  if (dishes.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No Meals Available Now</h2>
          <button className="btn btn-primary" onClick={() => getAllMeals()}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <div>
      <Navbar />
      <Search updateSearchResult={updateSearchResult} />
      {dishes.length !== 0 ? (
        <List dishes={dishes} updateCheckedItems={updateCheckedItems} />
      ) : null}
      {/* <List dishes={dishes} /> */}
      <Footer checkedItems={checkedItems} totalPrice={totalPrice} />
    </div>
  );
}
