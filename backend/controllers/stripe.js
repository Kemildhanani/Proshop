const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")('sk_test_51KhULzSCJmRhwQzk7wzjABtR6SoTM2jd1bLI7j7mdnsWplOVlB880mMaRV4bdjwvOW4nFkTWKjeZ2NXXxvvdi7U500nbVgJTvx')

exports.createPaymentIntent = async (req, res) => {

  // const {couponApplied} = req.body
  console.log(req.body);
  // return;
  // later apply coupon
  // later calculate price

  // 1 find user
  const user = await User.findOne({email: req.user.email}).exec()
  //2 get user cart total
  const {cartTotal, totalAfterDiscount} = await Cart.findOne({orderdBy: user._id}).exec();
  
  // console.log("CART TOTAL",  cartTotal, "AFTER DISCOUNT", totalAfterDiscount);
  // return;

  let finalAmount = 0

  if(totalAfterDiscount){
    finalAmount = (totalAfterDiscount * 100);
  }else{
    finalAmount = (cartTotal * 100)
  }





  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "INR",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: totalAfterDiscount
  });
  // console.log(`clientSecret: paymentIntent.client_secret`);
  
};


exports.packagePayment = async (req, res) => {
  console.log("price",req.body.price)
  const packageAmount  = req.body.price

  const paymentIntent = await stripe.paymentIntents.create({
      amount: packageAmount  * 100,
      currency: "INR"
  })
  res.send({
      clientSecret: paymentIntent.client_secret
  })
}

exports.WalletPayment = async (req, res) => {
  console.log("price",req.body.price)
  const packageAmount  = req.body.price

  const paymentIntent = await stripe.paymentIntents.create({
      amount: packageAmount  * 100,
      currency: "INR"
  })
  res.send({
      clientSecret: paymentIntent.client_secret
  })
};

exports.PaymentReturn = async (req,res)=>{
  console.log("price",req.body.price)
  const packageAmount  = req.body.price

  const paymentIntent = await stripe.paymentIntents.create({
      amount: packageAmount  * 100,
      currency: "INR"
  })
  res.send({
      clientSecret: paymentIntent.client_secret
  })
}
