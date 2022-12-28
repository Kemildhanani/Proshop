const Poster = require("../models/poster");
// const slugify = require("slugify");


exports.createPoster = async (req, res) => {
    try{
        console.log("posters",req.body);
        // const {posters} = req.body;
        // req.body.slug = slugify(req.body.url);
        const newPoster = await new Poster({public_id:req.body.public_id,url:req.body.url}).save();
        res.json(newPoster)
    }catch(err){
        console.log(err);
        res.status(400).json({
            err: err.message,
        })
    }
}

exports.getPosters= async (req,res) =>{
    try{
        const newPoster = await Poster.find({}).exec();
        res.json(newPoster)
    }
    catch(err){
        console.log("Posters",err);
    }
}

exports.removePoster = async (req, res,) => {
    try{
        const removePoster = await Poster.findOneAndRemove().exec();
        res.json(deleted);
    }catch(err) {
        console.log(err);
        return res.status(400).send("Poster is deleted")
    }
}