const mongoose=require('mongoose');


const brandSchema= new mongoose.Schema({
        name:{
            type:String,
            trim:true,
            required:'Name is required',
            minlength:[2,'Too short'],
            maxlength:[32,"Too long"],
        },
        slug:{
            //show product for cateory namep
            type:String,
            unique:true,
            lowercase:true,
            index:true,
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model('Brands', brandSchema);