const express = require("express");

require("dotenv").config();

const port = process.env.port||8000;
const { connection } = require("./config/db");
const { userRoute } = require("./routes/userroutes");
const { authenticate } = require("./middleware/authenticate");
const { authRoute } = require("./routes/auth");

const photographerRouter=require("./routes/photogrpher.route");
const bookingRouter=require("./routes/bookingroute")
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to apiace");
});

//app.use("/auth", authRoute);
app.use("/studio", photographerRouter);

app.use("/auth", authRoute);


app.use("/bookings", bookingRouter);

app.use(userRoute);


app.listen(port, async () => {
  try {
    await connection;
    console.log("db connected");
  } catch (error) {
    console.log(error);
    console.log("db not connected something went wrong");
  }
  console.log("listning at port", port);
});