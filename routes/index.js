import express from "express";
import { databaseManager } from "../db/MyMongoDB.js";

const router = express.Router();

// By Zhiyi Jin
/* GET all dishes. */
router.post("/api/dishes", async (req, res) => {
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
