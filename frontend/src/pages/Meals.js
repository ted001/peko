// Zhiyi Jin
import React, { useState } from "react";
import Search from "../components/Search/Search";
import List from "../components/List/List";
import Footer from "../components/Footer/Footer";

export default function Meals() {
  let [dishes, setDishes] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [checkedItems, setCheckedItems] = useState(0);

  let updateSearchResult = (dishes) => {
    setDishes(dishes);
    setTotalPrice(0);
    setCheckedItems(0);
  };

  // Refined add algorithm for decimal
  // Ref to https://blog.csdn.net/WuLex/article/details/104628132
  function accAdd(arg1, arg2) {
    var r1, r2, m, c;
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
      var cm = Math.pow(10, c);
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
    var r1, r2, m, n;
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
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  }

  let updateCheckedItems = (dish, checked) => {
    if (checked) {
      setTotalPrice(accAdd(totalPrice, dish.price));
      setCheckedItems(accAdd(checkedItems, 1));
    } else {
      setTotalPrice(accSub(totalPrice, dish.price));
      setCheckedItems(accSub(checkedItems, 1));
    }
  };

  return (
    <div>
      <Search updateSearchResult={updateSearchResult} />
      <List dishes={dishes} updateCheckedItems={updateCheckedItems} />
      <Footer checkedItems={checkedItems} totalPrice={totalPrice} />
    </div>
  );
}
