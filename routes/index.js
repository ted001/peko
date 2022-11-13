var express = require("express");
var router = express.Router();
const databaseManager = require("../db/MyMongoDB");

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

module.exports = router;
