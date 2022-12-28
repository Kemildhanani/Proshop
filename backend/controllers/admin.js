const Order = require("../models/order");
const User = require("../models/user");
const slugify = require("slugify");


exports.orders = async (req, res) => {
    let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();
    
    res.json(allOrders);
}

exports.ordersLatest = async (req, res) => {
    let orderslatest = await Order.find({})
    .sort("-createdAt").limit(5)
    .exec();
    console.log("------------------------------------------>",orderslatest);
    res.json(orderslatest);
}

exports.ordersIncome = async (req, res) => {
    let allOrdersIncome = await Order.find({}).exec();
    const len = allOrdersIncome.length
    var amt=0
    for(var i = 0;i<len;i++){
        if(allOrdersIncome[i].paymentIntent == undefined){
            amt=allOrdersIncome[i].payment+amt
        }else{
            amt=allOrdersIncome[i].paymentIntent.amount/100+amt
        }
    }
    // console.log(allOrdersIncome);
    res.json(amt);
}

exports.orderStatus = async (req, res) => {
    const {orderId, orderStatus} = req.body;
    let updated = await Order.findByIdAndUpdate(
        orderId,
        {orderStatus},
        {new : true}
    ).exec();

    res.json(updated);
}

exports.orderschedule = async (req, res) => {

    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",req.body)

    const {orderId, orderSchedule} = req.body;
    let updated = await Order.findByIdAndUpdate(
        orderId,
        {orderSchedule},
        {new : true}
    ).exec();

    res.json(updated);
}

exports.activateUser = async (req, res) => {

    const { id } = req.params
    try {
        User.findOneAndUpdate({ _id: id }, { activated: true }).exec((err, result) => {
            if (err) return console.log(err)
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid User'
        })
    }
}

exports.deactivateUser = async (req, res) => {

    const { id } = req.params

    try {
        User.findOneAndUpdate({ _id: id }, { activated: false }).exec((err, result) => {
            if (err) return console.log(err)
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.json({
            err: 'Invalid User'
        })
    }
}


//users
exports.listusers = async (req, res) => {
  let users = await User.find({})
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(users);
};

exports.finduser=async(req,res)=>{

    console.log("email",req.params.email);
    let users = await User.find({email:req.params.email}).exec();
    res.json(users);
}
