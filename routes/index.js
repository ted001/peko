import express from "express";
import { databaseManager } from "../db/MyMongoDB.js";

const router = express.Router();

// By Zhiyi Jin
/* Get all dishes */
router.get("/api/getAllMeals", async (req, res) => {
  let data;
  try {
    data = await databaseManager.read("dishes", {});
  } catch (err) {
    console.log("err", err);
  }
  res.json(data);
});

/* Filter dishes by options */
router.post("/api/filterMeals", async (req, res) => {
  console.log(req.body.type);
  console.log(req.body.taste);
  console.log(req.body.price);
  let data;
  try {
    data = await databaseManager.read("dishes", {
      price: { $lt: parseInt(req.body.price) },
      type: req.body.type,
      taste: req.body.taste,
    });
  } catch (err) {
    console.log("err", err);
  }
  res.json(data);
});

export default router;
