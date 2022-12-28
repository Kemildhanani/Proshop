const User = require("../models/user");
const Product = require("../models/product");
const admin =require("../firebase");
const OrderDetails = require("../models/orderDetails");


exports.orders = async (req, res) => {
    let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();
    res.json(allOrders);
}

exports.statusUpdate = async (req, res) => {
    try{
        const orderfind = await OrderDetails.updateMany({orderID:req.params.id},{orderStatus:req.body.status}).exec();
        res.json(orderfind);
    }
    catch(err){
        console.log("err order find",err)
    }
}