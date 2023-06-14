const db=require("./models/index");
const express=require("express");
const photoRouter=require("./routes/photographers.router");
const sequelize=require("sequelize")
require("dotenv").config();



const app=express();
app.use(express.json());


app.use("/api/photographers",photoRouter)

db.sequelize.sync().then(()=>{
    app.listen(4002,()=>{
        console.log("connected to server succesfully..")
    })
})