const mongoose = require("mongoose")

const conn = async()=>{
    try
    {
        const con =await mongoose.connect(process.env.MONGOOSE_STRING);
        console.log("successfully connected ",con.connection.host);
    }
    catch(error){
        console.log("error dbConnection");
        process.exit(1);
    }
}

module.exports = conn;