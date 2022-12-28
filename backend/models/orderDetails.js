const mongoose = require('mongoose');
const Schema= mongoose.Schema

const{ObjectId}=mongoose.Schema;

const orderDetailsSchema = new mongoose.Schema({
    seller:{
        type:ObjectId,
    },
    qty:{
        type:Number
    },
    color:{
        type:String
    },
    product:{
        type:ObjectId
    },
    orderID:{
        type: ObjectId
    },
    paymentIntent:{},
    wallet:{
        type:ObjectId
    },
    payment:{
        type:Number
    },
    orderStatus:{
        type:String,
        default:"Not Processed",
        enum:[
            "Not Processed",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Completed"
            ]       
        },
        orderSchedule:{
            type:String,
                default:"Unschedule",
                enum:[
                    "Schedule",
                    "Unschedule",
                    
                ]    
        },
    orderdBy:{type:ObjectId,ref:"User"},
    buyer:{type:String,ref:"User"},
    invoiceURL: {
        type: String
    },

},{timestamps:true});

module.exports=mongoose.model('OrderDetails',orderDetailsSchema);