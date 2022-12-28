const User = require("../models/user");
const Product = require("../models/product");
const admin =require("../firebase");
const PackageIncome = require("../models/packageIncome");
const OrderDetails = require("../models/orderDetails");

exports.createSeller = async (req, res) => {

    const { data } = req.body;
    const pack =req.body.pack[0];

    console.log("user detail",data);
    console.log("package",pack);


    const newSeller = await new User({
        email: data.email,
        role: "seller",
        name: data.name,
        address: data.address,
        bankAccNo: data.bank,
        IFSCCode: data.ifsc,
        mobile: data.mobile,
        packageId: pack._id,
        remainingDays: pack.duration,
        remainingProducts: pack.products,
        totalProducts: 0
    }).save()

    if (newSeller) await new PackageIncome({
        sellerId: newSeller._id,
        packageName: pack.name,
        duration: pack.duration,
        products: pack.products,
        amountPaid: pack.price
    }).save()
    if (newSeller) res.json(newSeller)
    
}

exports.updateSellerPackage = async (req, res) => {
    const id=req.params.id;
    const pack = req.body.pack[0]
    const count = await Product.find({ seller: id }).count()
    const remainingProducts = pack.products - count

    User.findOneAndUpdate({ _id: id }, {
        packageId: pack._id,
        remainingDays: pack.duration,
        remainingProducts: remainingProducts
    }).exec(async (err, result) => {
        if (err) return console.log(err)
        res.json(result)
        await new PackageIncome({
            seller: id,
            packageName: pack.name,
            duration: pack.duration,
            products: pack.products,
            amountPaid: pack.price
        }).save()
        await Product.updateMany({ seller: id }, { activated: true })
    })
}



exports.packagePayment = async (req, res) => {
    const { packages, token } = req.body

    stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        return stripe.charges.create({
            amount: packages.price * 100,
            currency: 'INR',
            customer: customer.id,
            receipt_email: customer.email,
            description: packages.packageType
        })

    }).then(result => {
        if (result) {
            res.json(result)
        }
    }).catch(error => console.log(error))
}

exports.sellerProduct = async (req,res) =>{
    console.log("data",req.body)
    try{
        const user = await User.findOneAndUpdate({_id:req.params.id},{remainingProducts:req.body.count},{new:true}).exec();
        res.json(user)
    }
    catch(err){
        console.log("user id detail",err);
    }
}


exports.findorder = async(req,res) =>{
    console.log("id",req.params.id)
    try{
        const orderfind = await OrderDetails.find({seller:req.params.id}).exec();
        res.json(orderfind);
    }
    catch(err){
        console.log("err order find",err)
    }
}

exports.statusUpdate = async (req, res) => {
    // console.log("222222222222222222222222222222222222222222222222222")
    try{
        const orderfind = await OrderDetails.updateMany({orderID:req.params.id},{orderStatus:req.body.status}).exec();
        res.json(orderfind);
    }
    catch(err){
        console.log("err order find",err)
    }
}

exports.scheduleUpdate = async (req, res) => {
    // console.log("11111111111111111111111111111111111111111111111111111111111111111111111111111",req.body)
    try{
        const orderfind = await OrderDetails.updateMany({orderID:req.params.id},{orderSchedule:req.body.schedule}).exec();
        res.json(orderfind);
    }
    catch(err){
        console.log("err order find",err)
    }
}