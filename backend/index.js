const express = require("express");
const dbConnection = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler")
const dotenv = require("dotenv").config();  // use to fetch data from .env file
const cors = require("cors");
const app = express();

//db connection
dbConnection();

//cors policy
app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        name:"kalash"
    });
})

app.use("/user",require("./routes/userRoute"));
app.use("/post",require("./routes/postRoute"));
app.get("/",(req,res)=>{
    res.send("working")
})
app.listen(5000);


//error handler middleware it should be in last
app.use(errorHandler);