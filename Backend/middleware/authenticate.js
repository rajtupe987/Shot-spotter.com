
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/usermodel");
const fs = require("fs");
require("dotenv").config();


function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  if (token) {
    const blackListData = JSON.parse(
      fs.readFileSync("blacklist.token.json", "utf-8")
    );
    if (blackListData.includes(token)) {
      res.send("login again user logout");
    } else {
      jwt.verify(token, process.env.secret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }

        const { userID } = decoded;
        console.log(decoded)
        try {
          const user = await userModel.findById(userID);

          if (!user) {
            return res.status(401).json({ message: "User not found" });
          }

          req.body.customerName = decoded.name;
          req.body.client = decoded.userID;
          req.user = user;

          next();
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Internal server error" });
        }
      });
    }
  }

}



module.exports = { authenticate };

