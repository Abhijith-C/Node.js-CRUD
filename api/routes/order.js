const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Orders ware fetched",
  });
});

router.get("/:orderId", (req, res, next) => {
  res.status(201).json({
    message: "Orders ware fetched",
  });
});

router.delete("/:orderId", (req, res, next) => {
    res.status(200).json({
      message: "Orders deleted",
    });
  });

router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }
  res.status(201).json({
    message: "Orders was created",
    order: order
  });
});

module.exports = router;