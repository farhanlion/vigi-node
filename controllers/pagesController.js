const db = require("../models");
const Order = db.Order;
const Product = db.Product;
const OrderItem = db.OrderItem

exports.index = function (params) {
  return async function (req, res) {
        res.render("index")
    } 
}