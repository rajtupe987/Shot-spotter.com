const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();
let userRoute = express.Router();

require("dotenv").config();
const { userModel } = require("../models/usermodel");
;


//signup part//

userRoute.post("/user/signup", async (req, res) => {
  const { name, email, role, password } = req.body;
  let userData = await userModel.find({ email });
  if (userData.length > 0) {
    res.status(400);
    res.send("user already exists");
  } else {
    bcrypt.hash(password, +process.env.saltRounds, async function (err, hash) {
      if (err) {
        console.log(err);
        res.status(400);
        res.send("something went wrong");
      } else {
        let userRegisterData = userModel({
          name,
          email,
          role,
          password: hash,
        });
        await userRegisterData.save();
        res.send("user registered");
      }
    });
  }
});


// login part//


userRoute.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  let userData = await userModel.find({ email });
  console.log(userData);
  if (userData.length > 0) {
    bcrypt.compare(password, userData[0].password, function (err, result) {
      if (result) {
        //   normal token
        var token = jwt.sign(
          { name: userData[0].name, userID: userData[0]._id },
          process.env.secret
        );

        res.send({
          msg: "login successful",
          token: token,
          username: userData[0].name,
          userID: userData[0]._id,
          role: userData[0].role,
          email: userData[0].email,
        });
      } else {
        res.status(400);
        res.send({ msg: "wrong credentials" });
      }
    });
  } else {
    res.status(404);
    res.send({ msg: "wrong credentials" });
  }
});



//logout part//
userRoute.post("/user/logout", async (req, res) => {
  const token = req.headers.authorization;
  const blackListData = JSON.parse(
    fs.readFileSync("blacklist.token.json", "utf-8")
  );
  blackListData.push(token);
  fs.writeFileSync("blacklist.token.json", JSON.stringify(blackListData));
  res.send("logout successful");
});
//reset part//
//oauth part//
//email verification//



module.exports = { userRoute };