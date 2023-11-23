// It allows you to write route handlers using async/await syntax without the need for try/catch blocks or manual error handling.
// without this we have to use try catch block
const asynHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const randomize  = require("randomatic")
const User = require("../models/UserModel"); // user model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const otpMap = {};  // map to store otp
// Setup nodemailer for sending emails
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: 'kbvish2018@gmail.com',
        pass: 'uqgvkgxsfjhasejo'
    }
  });

const sendOtp = asynHandler(async (req, res) => {
   
    const { email } = req.body;
    // console.log(email);
    if (!email) {
        res.status(400);
        throw new Error("Email required");
    }
    //checking email exiest or not
    if (await User.findOne({ email })) {
        res.status(400);
        throw new Error("Email is already exiests try with different one");
    }
    // Generate a random OTP
    
    const otp = randomize("0", 6);
    

    //  Store the OTP in memory 
     otpMap[email] = otp;
    //  console.log(otpMap);

    // Send the OTP to the user's email\
    const mailData = {
        from: 'kbvish2018@gmail.com',
        to: email,
        subject: 'Account Verification OTP',
        text: `Your OTP for account verification is: ${otp}`,
    };


   
    try {
        await transporter.sendMail(mailData);
        res.json({message:'OTP sent successfully. Check your email.'});
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({message:'Internal Server Error'});
    }
//  console.log(mailData.messageId);
})
const createUser = asynHandler(async (req, res) => {

    // request formate
    // {
    //     "userName":"kafdglafgshbharti",
    //     "fullName":"Kalash Bharti",
    //     "email":"kalashbharthji2022@gmail.com",
    //     "password":"kalash@26"
    //   }

    console.log(req.body);

    const { userName, fullName, email, password,otp} = req.body;
    if (!userName || !fullName || !email || !password || !otp) {
        res.status(400);
        throw new Error("the Field are mandatory")
    }

    //checking email exiest or not
    if (await User.findOne({ email })) {
        res.status(400);
        throw new Error("email is already exiests");
    }
    
    if(otpMap[email] !== otp)
    {
        console.log(otpMap);
        res.status(400);
        throw new Error("Otp verification fail");
    }

    //checking username is exiest or not
    if (await User.findOne({ userName })) {
        res.status(400);
        throw new Error("username is not available try different opne :)");
    }
    // console.log(req.body);
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create(
        {
            userName, email, fullName, password: hashPassword
        }
    )
    if (user) {
        res.status(201).json({ _id: user.id, email: email });

    }
    else {
        res.status(400);
        throw new Error("Something went wrong");
    }
})

const loginUser = asynHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(404);
        throw new Error("Email or Password is not available");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    userName: user.userName,
                    name: user.fullName,
                    email: user.email,
                    id: user.id
                },
            }, process.env.ACCESS_TOKEN,
            { expiresIn: "30m" }  // the link get expire in 1 minute 
        )
        res.status(200).json({ accessToken });
    }
    else {
        res.status(400);
        throw new Error("Email or Password not match");
    }


})

const currentUser = asynHandler(async (req, res) => {
    res.send(req.user);
})

const getProfile = asynHandler(async (req, res) => {

    const { userName } = req.body;

    if (!userName) {
        res.status(400);
        throw new Error("UserName is Missing");
    }
    const user = await User.findOne({ userName });

    if (!user) {
        res.status(404);
        throw new Error("page is not found");
    }

    const { fullName, viewCount, posts, profilePic, followers } = user;

    const followersCount = followers.length;

    res.json({

        userName, name: fullName, viewCount, posts, profilePic, followersCount
    })
})



module.exports = { createUser, loginUser, currentUser, getProfile,sendOtp };