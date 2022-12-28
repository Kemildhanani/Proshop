const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const couponHistorySchema = new mongoose.Schema(
    {
    
      coupon_name: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
      },
      coupon_id:{
          type:ObjectId
      },
      discount: {
        type: Number,
        requred: true,
      },
      seller:{
        type:ObjectId,
      },
      user:{
        type:ObjectId,
      },
      buyer_email:{
          type:String
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("CouponHistory", couponHistorySchema);