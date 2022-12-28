const mongoose = require('mongoose');
const Schema= mongoose.Schema

const{ObjectId}=mongoose.Schema;

const orderSchema = new mongoose.Schema({
    products:[
        {
            product:{
                type: ObjectId,
                ref:'Product'
            },
            count:Number,
            color:String,
            // price:Number
        },
        
    ],
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
    orderdBy:{type:ObjectId,ref:"User"},
    invoiceURL: {
        type: String
    },
    orderSchedule:{
        type:String,
            default:"Unschedule",
            enum:[
                "Schedule",
                "Unschedule",
                
            ]    
    }

    
},{timestamps:true});

module.exports=mongoose.model('Order',orderSchema);