import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Userform from "../components/Userform/Userform";

export default function Userhub() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getCurrentUser() {
      let res = await fetch("/users/getCurrentUser");
      //   console.log("In getcurrentuser", await res.json().user?.FirstName);
      let resuser = await res.json();
      console.log("resuser", resuser);
      let user = resuser?.user;
      console.log("user in userhub", user);
      setUser(user);
    }
    getCurrentUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Userform user={user} setUser={setUser} />
    </div>
  );
}
