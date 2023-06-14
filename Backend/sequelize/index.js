const express=require("express");
const Sequelize=require("sequelize");
require("dotenv").config()



const inst=new Sequelize("Photography","root",
"Diljit@987",{
    host:"localhost",
    dialect:"mysql"
});



inst.sync().then(()=>{
    app.listen(4002,()=>{
        console.log("server connected...........")
    })
})

