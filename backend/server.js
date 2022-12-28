const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyParser=require("body-parser");
const cors=require('cors');
const {readdirSync}=require("fs");

//import routes
const authRoutes=require('../backend/routes/auth')
const req = require('express/lib/request')


//app
const app=express()

//db
mongoose.connect("mongodb://localhost:27017/pro-shop",{
           useNewUrlParser:true,
        //    useCreateIndex:true,?\
        //    useFindAndModify:false,
           useUnifiedTopology:true,
})
.then(()=>console.log("DB connected"))
.catch(err=>console.log("DB CONNECTION ERR",err))

///middlewares

app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors());

//routes middlewears
app.use('/api',authRoutes);
readdirSync('./routes').map((r)=>
    app.use("/api",require('./routes/'+r))
    );

//route
app.get("/api",(req,res)=>{
    res.json({
        data:"hey you hit node api",   
    })
})

//Port
app.listen(8000,function(){
    console.log("server started")
})