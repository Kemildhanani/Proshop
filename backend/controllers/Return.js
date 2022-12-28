const Return = require("../models/Return");
const PaymentHistory = require("../models/returnPaymentHistory");

exports.ReqReturn=async (req,res)=>{

    console.log("Data",req.body.data);

    const check = await Return.find({
                order_id:req.body.data.order_id,
                orderDetail_id:req.body.data.orderDetail_id,
                buyer_email:req.body.data.buyer_email

            }).count().exec()

    
    
            if(check==0){
                try{
                    const request = await new Return(req.body.data).save();
                    res.json(request)
            
                }
                catch(err){
                    console.log("return0",err)
                }
            }
            else{
                // console.log("213")
                res.json(213)
            }

    
}

exports.findesellerReturn = async(req,res)=>{
    const data = await Return.find({seller:req.params.id}).exec();
    res.json(data)
}

exports.Approvedupdate= async (req,res)=>{
    const data = await Return.findByIdAndUpdate({_id:req.params.id},{approve:true},{new:true});
    res.json(data); 
}

exports.Rejectdupdate= async (req,res)=>{
    const data = await Return.findByIdAndUpdate({_id:req.params.id},{approve:false},{new:true});
    res.json(data); 
}

exports.createpaymentHistory = async (req,res) =>{
    console.log(req.body);
    const data = await new PaymentHistory(req.body.data).save()
    res.json(data)
}
exports.findpaymentHistory = async (req,res) =>{
    console.log(req.body);
    const data = await PaymentHistory.find({seller:req.params.id}).exec()
    res.json(data)
}
exports.returnpayment = async(req,res)=>{
    const data = await Return.findOneAndUpdate({_id:req.params.id},{returnPayment:true}).exec();
    res.json(data)
}
exports.PaymentHistroy = async(req,res)=>{
    const data = await PaymentHistory.find({seller:req.params.id}).exec();
    res.json(data)
}