const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email:{
        type:String,
        required:true,
        index:true
    },
    role:{
        type:String,
        default:"subscriber",
    },
    cart:{
        type:Array,
        default:[],
    },
    // address:String,
    address: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    remainingDays: {
        type: Number,
    },
    packageId: {
        type: ObjectId,
        ref: 'package'
    },
    wishlist: [{
        type: ObjectId,
        ref: 'wishlist'
    }],
    packageName: {
        type: String
    },
    totalProducts: {
        type: Number
    },
    remainingProducts: {
        type: Number
    },
    activated: {
        type: Boolean,
        default: true
    },
    bankAccNo: {
        type: Number
    },
    mobile: {
        type: Number
    },
    fullName: {
        type: String
    },
    IFSCCode: {
        type: String
    },
    
    //wishlist:[{type:ObjectId,ref:"Product"}],
},

{timestamps:true}
);

module.exports=mongoose.model("User",userSchema);