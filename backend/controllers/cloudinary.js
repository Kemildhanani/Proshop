const cloudinary = require("cloudinary").v2;

//config
cloudinary.config({ 
    cloud_name: 'daqzwdajo', 
    api_key: '732688265432215', 
    api_secret: 'W_vppoZWs86XjPCjq95XlZBIKrw' 
  });

//req.files.file.path 
exports.upload= async(req,res)=>{
    
    let result = await cloudinary.uploader.upload(req.body.image,{
        public_id: `${Date.now()}`,
        resource_type: 'auto' //jpg,png
    });
    
    res.json({
        public_id:result.public_id,
        url: result.secure_url,
    });
};

exports.remove= (req,res)=>{
    let image_id = req.body.public_id
    cloudinary.uploader.destroy(image_id,(err,result)=>{
        if(err)return res.json({success: false, err});
        res.send("ok")
    })
}

exports.uploadPoster= async(req,res)=>{
    let result = await cloudinary.uploader.upload(req.body.poster,{
        public_id: `${Date.now()}`,
        resource_type: 'auto' //jpg,png
    });
    
    res.json({
        public_id:result.public_id,
        url: result.secure_url,
    });
};

exports.removePoster= (req,res)=>{
    let poster_id = req.body.public_id
    cloudinary.uploader.destroy(poster_id,(err,result)=>{
        if(err)return res.json({success: false, err});
        res.send("ok")
    })
};

exports.uploadProfile = async(req,res) =>{
    let result = await cloudinary.uploader.upload(req.body.profile,{
        public_id: `${Date.now()}`,
        resource_type: 'auto' //jpg,png
    });
    
    res.json({
        public_id:result.public_id,
        url: result.secure_url,
    });
}

exports.removeProfile= (req,res)=>{
    let poster_id = req.body.public_id
    cloudinary.uploader.destroy(poster_id,(err,result)=>{
        if(err)return res.json({success: false, err});
        res.send("ok")
    })
};