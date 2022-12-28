const Profile=require('../models/userProfile');
const User = require("../models/user");


exports.createProfile = async (req, res) => {

    // var user=req.body.profile.user;

    const pr = await Profile.find({user:req.body.profile.user}).count();
    console.log("count",pr)

    if(pr>0){
        try{
            const update = await Profile.findOneAndUpdate({user:req.body.profile.user},req.body.profile,{new:true});
            res.json(update)
        }
        catch(err){
            console.log("update profile pic",err)
        }

    }
    else{
        try{
            console.log("profile",req.body);
            // const {posters} = req.body;
            // req.body.slug = slugify(req.body.url);
            const newProfile = await new Profile(req.body.profile).save();
            res.json(newProfile)
        }catch(err){
            console.log(err);
            res.status(400).json({
                err: err.message,
            })
        }
    }

}


exports.updateUserProfile = async (req,res) =>{
    console.log("user",req.body)
    try{
        const user = await User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        res.json(user)
    }
    catch(err){
        console.log("er",err)
    }
}

exports.getProfile = async (req,res) =>{
    try{
        const pro = await Profile.find({user:req.params.id}).exec()
        res.json(pro);
    }
    catch(err){
        console.log("errr",err)
    }
}