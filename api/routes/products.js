const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Product = require("../models/product");

// to get all products
router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// to add product
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    body: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  res.status(201).json({
    message: "Handling POST request to /products",
    createdProduct: product,
  });
});

// get product details by id
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// router.patch("/:productId", (req, res, next) => {
//   res.status(200).json({
//     message: "product updated",
//   });
// });

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
