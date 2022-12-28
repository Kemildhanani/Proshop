const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");



//users
exports.listusers = async (req, res) => {
  let users = await User.find({})
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(users);
};

 exports.deactivateUser = async (req, res) => {

  const { id } = req.params

  try {
      User.findOneAndUpdate({ _id: id }, { activated: false }).exec((err, result) => {
          if (err) return console.log(err)
          res.json(result)
      })
  } catch (err) {
      console.log(err)
      res.json({
          err: 'Invalid User'
      })
  }
}

exports.activateUser= async (req,res)=>{
  const {id}=req.params

  try {
    User.findOneAndUpdate({ _id: id }, { activated: true }).exec((err, result) => {
        if (err) return console.log(err)
        res.json(result)
    })
} catch (err) {
    console.log(err)
    res.json({
        err: 'Invalid User'
    })
}
  
}

exports.getuser= async (req,res)=>{
    try{
        const user = await User.findOne({_id:req.params.id}).exec();
        res.json(user)
    }
    catch(err){
        console.log("user id detail",err);
    }
}

exports.getsellerDashboard= async (req,res)=>{
    try{
        const user = await User.find({role:"seller"}).count().exec();
        res.json(user)
    }
    catch(err){
        console.log("user id detail",err);
    }
}

exports.getuserDashboard= async (req,res)=>{
    try{
        const user = await User.find({role:"subscriber"}).count().exec();
        res.json(user)
    }
    catch(err){
        console.log("user id detail",err);
    }
}



