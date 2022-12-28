const Coupon = require("../models/coupon");
const CouponHistory = require("../models/CouponHistory");

// create, remove, list

exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    // return;
    const { name, expiry, discount,seller,usage } = req.body.coupon;
    // console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",req.body)
    res.json(await new Coupon({ name, expiry, discount,seller,usage }).save());
  } catch (err) {
    // console.log(err);
    // console.log("")
    // res.json(err)
    res.json(213)
  }
};

exports.remove = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch (err) {
    console.log(err);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.log(err);
  }
};

exports.findCoupon = async (req,res) => {
  console.log("coupon name",req.params.name)
  try{
    const cou= await Coupon.find({name:req.params.name}).exec();
      console.log("coupon",cou);
      res.json(cou)
  }

  catch (err){
    console.log("get coupon",err);
  }
}

exports.getCouponSeller = async (req,res) =>{
  console.log("seller",req.params.id)
  try{
    const cou= await Coupon.find({seller:req.params.id});
    res.json(cou)
  }
  catch(err){
      console.log("seller get coupon",err)
  }
}

exports.findCouponHistory = async(req,res)=>{

  
  try{
    const coupon = await CouponHistory.find({seller:req.params.id}).exec();
    res.json(coupon);
  }catch{
      console.log("err history",err)
  }

}

exports.couponHistroyDelete = async (req,res)=>{
  const coupon = await CouponHistory.findByIdAndRemove(req.params.id).exec();
  res.json(coupon)
}

exports.findCouponAndUpdate= async (req,res) =>{

  // console.log("ssssssssssssssss",req.body.data);

  const data = req.body.data;

  const usage= data.usage-1;
  if(usage>0){
    try{
      const cou=await Coupon.findOneAndUpdate({_id:data._id},{usage:usage},{new:true});
      res.json(cou);
    }
    catch(err){
      console.log("coupon update",err)
    }
  }
  else{
    const cou = await Coupon.findByIdAndRemove(data._id);
    res.json(cou);
  }

}
