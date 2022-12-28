const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema;

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        maxlength:300,
        text:true
    },
    slug:{
        type:String,
        unique : true,
        lowercase : true,
        index: true,
    },
    Seller:{

        type:ObjectId,
        ref:'User',
    },
    description:{
        type:String,
        required:true,
        maxlength:20000 ,
        text:true
    },
    price:{
        type:Number,
        trim:true,
        required:true,
        maxlength:32,
        
    },
    category:{
        type:ObjectId,
        ref:"Category",
    },
    brand:{
        type:ObjectId,
        ref:"Brand"
    },
    subs:[{
        type:ObjectId,
        ref:"Sub"
    },
],
    quantity:Number,
    sold:{
        type:Number,
        default:0
    },
    images:{
        type:Array
    },
    shipping:{
        type:String,
        enum:['Yes','No'],
    },
    color:{
        type:String,
        enum:["Black","Brown","Silver","White","Blue","Sky Blue","Yellow","Army green","Pink","Orange","Golden","Transparent","Not defined"],
    },
    // brand:{
    //     type:String,
    //     enum:["Apple","Samsung","Microsoft","Lenovo","Asus"],
    // }, 
    
    ratings:[
         {
             star:Number,
             postedBy:{type:ObjectId,ref:"User"},
        },
    ],
    
    approved: {
        type: Boolean,
        default: false
    },
    activated: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    }
},
{timestamps:true}
);

module.exports=mongoose.model('Product',productSchema);