const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const orderDetails = require("../models/orderDetails");


exports.userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    // get price for creating total
    let productFromDb = await Product.findById(cart[i]._id)
      .select("price")
      .exec();
    object.price = productFromDb.price;

    products.push(object);
  }

  // console.log('products', products)

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  if (req.body.total>0){
    cartTotal=req.body.total;
    let newCart = await new Cart({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();
    console.log("new cart ----> ", newCart);
  res.json({ ok: true });
  }
  else{

    let newCart = await new Cart({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();
    console.log("new cart ----> ", newCart);
  res.json({ ok: true });
  }
  // console.log("cartTotal", cartTotal);


  
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  console.log("empty cart");
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};
exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  console.log("COUPON", coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  console.log("VALID COUPON", validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

  console.log("cartTotal", cartTotal, "discount%", validCoupon.discount);

  // calculate the total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2); // 99.99

  Cart.findOneAndUpdate(
    { orderdBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();

  res.json(totalAfterDiscount);
};

exports.createOrder = async (req, res) => {
  // console.log(req.body);
  // return;
  const payment = req.body.payment;
  const wallet = req.body.wallet;

  const { paymentIntent } = req.body.stripeResponse;

  // console.log("1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111.",paymentIntent)


  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

  if(paymentIntent == undefined){
    let newOrder = await new Order({
      products,
      payment,
      wallet,
      orderdBy: user._id,
      // user:user.email
    }).save();  

    let bulkOption = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id }, // IMPORTANT item.product
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
  
    let updated = await Product.bulkWrite(bulkOption, {});
    console.log("PRODUCT QUANTITY-- AND SOLD++", updated);
  
    for(var i=0;i<products.length;i++){
      const findpro = await Product.findOne({_id:products[i].product}).exec();
    
      await new orderDetails({
        seller:findpro.Seller,
        qty:products[i].count,
        color:products[i].color,
        product:products[i].product,
        orderdBy:user._id,
        orderID: newOrder._id,
        buyer:req.user.email,
        payment,
        wallet
      }).save();
    }
    
  
    // console.log("NEW ORDERfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff SAVED", newOrder);
    res.json({ ok: true });
    
  }
  else{

    let newOrder = await new Order({
      products,
      paymentIntent,
      orderdBy: user._id,
      // user:user.email
    }).save();
    let bulkOption = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id }, // IMPORTANT item.product
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
  
    let updated = await Product.bulkWrite(bulkOption, {});
    console.log("PRODUCT QUANTITY-- AND SOLD++", updated);
  
    for(var i=0;i<products.length;i++){
      const findpro = await Product.findOne({_id:products[i].product}).exec();
    
      await new orderDetails({
        seller:findpro.Seller,
        qty:products[i].count,
        color:products[i].color,
        product:products[i].product,
        orderdBy:user._id,
        orderID: newOrder._id,
        buyer:req.user.email,
        paymentIntent
      }).save();
    }
    
  
    // console.log("NEW ORDERfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff SAVED", newOrder);
    res.json({ ok: true });
  }
};

exports.orders = async(req,res) => {
  let user = await User.findOne({email : req.user.email}).exec();

  let userOrders = await Order.find({orderdBy: user._id}).populate("products.product").exec();

    res.json(userOrders);
}

exports.findorders=async(req,res) =>{
  let order = await Order.findById({_id:req.params.id}).exec();
  res.json(order);
}


exports.findordersDetails = async(req,res)=>{
  let or = await orderDetails.find({orderdBy:req.params.id}).exec();

  res.json(or);
}

exports.getorderDetailsusinOrder = async (req,res) =>{
  console.log("orerderrr",req.body);
  const order = await orderDetails.findOne({orderID:req.body.order,product:req.body.productid}).exec();
  res.json(order);
  console.log(order)
}

exports.getorderDetails = async(req,res)=>{
  const order = await orderDetails.findById(req.params.id).exec()
  res.json(order);
  console.log(order)
}