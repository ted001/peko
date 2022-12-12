// Zhiyi Jin
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Mainfooter from "../components/foot/Mainfooter";
import landbg from "../images/landbg.jpg";

export default function OrderNow() {
  let location = useLocation();
  const { checkedDishes } = location.state;
  const [user, setUser] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Ref to: https://blog.csdn.net/m0_47415644/article/details/114368183
  // Generate a random OrderID
  function generateOrderNumber(length = 4) {
    const now = new Date();
    let year = now.getFullYear().toString();
    let month = (now.getMonth() + 1).toString();
    let day = now.getDate().toString();
    let hour = now.getHours().toString();
    let minutes = now.getMinutes().toString();
    let seconds = now.getSeconds().toString();
    let num = "";
    for (var i = 0; i < length; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return year + month + day + hour + minutes + seconds + num;
  }

  useEffect(() => {
    async function getCurrentUser() {
      let res = await fetch("/users/fetchUpdatedUser");
      let userInfo = await res.json();
      console.log("userInfo", userInfo);
      let firstName = userInfo.user?.FirstName;
      let lastName = userInfo.user?.LastName;
      let address = userInfo.user?.Address;
      let phone = userInfo.user?.Phoneno;

      setUser(firstName + " " + lastName);
      setPhone(phone);
      setAddress(address);
    }
    getCurrentUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="order-success">
          Order Success.Thank you for your trust.
        </h1>
        <h2 className="order-success-info">
          Your order will be delivered in 15 minutes. Please keep your phone
          connected.
        </h2>
        <h2 className="order-success-info">
          You will pay the bill when you received your food.
        </h2>
        <div className="order-title d-flex flex-row mb-3 justify-content-between">
          <div className="fs-5">
            <strong>Order ID:</strong> {generateOrderNumber()}
          </div>
          <div className="fs-5">
            <strong>Order Date:</strong> {new Date().toLocaleDateString()}
          </div>
        </div>
        <hr />
        <table className="table order-table">
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
                  <td>$ {checkedDish.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-5 mb-5">
          <div className="fs-4 fw-bold">Sent to:</div>
          <div className="fs-5">User: {user}</div>
          <div className="fs-5">Address: {address}</div>
          <div className="fs-5">Phone: {phone}</div>
        </div>
      </div>
      <img width="1295px" height="400px" src={landbg} alt="food delivery" />
      <Mainfooter />
    </div>
  );
}
