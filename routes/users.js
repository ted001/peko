//Akhila
import express, { response } from "express";
import { databaseManager } from "../db/MyMongoDB.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  let data;
  //   console.log("in post", data);
  try {
    data = req.body;
    console.log(data);
    let checkuser = await databaseManager.finduser("users", data.email);
    if (checkuser) {
      res.status(200).send({ userexists: true });
    }
    let dbstate = await databaseManager.insertuser("users", data);
    if (dbstate) {
      res.status(200).send({ success: true, userexists: false });
    } else {
      res.status(404).send({ success: false });
    }
  } catch (err) {
    console.log("err", err);
  }
});

router.post("/login", async (req, res) => {
  let data;

  try {
    data = req.body;
    console.log("in post", data);
    let checkuser = await databaseManager.finduser("users", data.email);
    if (checkuser) {
      let dbstate = await databaseManager.authuser("users", data);
      if (dbstate) {
        res.status(200).send({ success: true, userexists: true });
      } else {
        res.status(404).send({ success: false });
      }
    } else {
      res.status(200).send({ userexists: false });
    }
  } catch (err) {
    console.log("err", err);
  }
});

export default router;
