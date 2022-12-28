const Wallet = require('../models/Wallet');

exports.CreateWallet=async(req,res)=>{

    const check = await Wallet.find({user:req.body.data.user}).exec()
    console.log("count",check.length)

    // console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",req.body.pin)

    if(check.length>0){
        res.json(check);
    }
    else{
        try{
        console.log("user",req.body)
        const wallet = await new Wallet({user:req.body.data.user,pin:req.body.pin}).save();
        res.json(wallet);
    }
    catch(err){
        console.log("wallet error",err)
    }
    }
}

exports.getWallet = async (req,res) =>{
    try{
        const wallet = await Wallet.findOne({user:req.params.id}).exec();
        res.json(wallet)
    }
    catch(err){
        console.log("wallet get",err);
    }
}

exports.updateAmt = async (req,res) =>{
    console.log("id",req.params.id)
    console.log("body",req.body)
    try{
        const wallet = await Wallet.findOneAndUpdate({user:req.params.id},{amt:req.body.amt},{new:true}).exec();
        res.json(wallet)
    }
    catch(err){
        console.log("amt update",err);
    }
}


exports.orderPayment = async (req,res) =>{
    console.log("id",req.params.id)
    console.log("body",req.body)
    try{
        const wallet = await Wallet.findOneAndUpdate({user:req.params.id},{amt:req.body.amt},{new:true}).exec();
        res.json(wallet)
    }
    catch(err){
        console.log("amt update",err);
    }
}